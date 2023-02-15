import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Pressable, Modal, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { baseUrlApi } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const HistoriquePreventive = ({navigation}) => {

  const {userInfo,access_token, logout} = useContext(AuthContext)

  const [data , setData] = useState([])
  const [filtrerData, setFiltrerData] = useState([])
  const [moteuPlanning, setMoteurPlanning] = useState(false)
  const [modalvisible, setmodalVisible] = useState(false)
  const [modalitem, setModalitem] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);


  const [isloading, setIsloading] = useState();

 

  const toggleModal = (valitem) => {
      setmodalVisible(!modalvisible)
      setModalitem(valitem)
      // console.log('btn courbe press '+ modalvisible)
    }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getDataPreventive()
  }, []);

  useEffect(() => {
    getDataPreventive()
  }, []);

  const togleMoteurPlanning = ( ) =>{
    setMoteurPlanning(!moteuPlanning)
  }
  const Stringtext =() =>{
    if (moteuPlanning){
      return(
        <Text style={{fontSize:18, color:'#000' }}>/Planning</Text>
      )
    }
    else{
      return(
        <Text style={{fontSize:18, color:'#000' }}>/moteur</Text>
      )
    }
  }

  const getDataPreventive = async () => {

    const configGetMotor = {
      method: 'get',
      url: `${baseUrlApi}/preventive/`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      const response = await axios(configGetMotor);
      const data = await response.data
      setData(data);
      setFiltrerData(data);
      console.log(data.createdOn)
      console.log(data.updatedOn)
      console.log(access_token)
    
    } catch (error){
      console.log(error)
      if(!error.response){
        alert("Aucune reponse du serveur");
      }
      else if (error.response?.status === 400){
        alert("Certains informations ne sont pas renseignées")
      }
      else if (error.response?.status === 401){
        alert("Votre session a expirée")
        logout()
      }
      else if (error.response?.status === 404){
        alert("Aucune information disponible")
      }
      // alert("An error has occurred");
      console.log(error.status)
      // setIsloading(false)
    }
  }

  function isEmpty(obj) {
    for(var i in obj) { return false; }
    return true;
  }

  const loading=()=>{
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'}/>
      </View>
    )
  }



  const searcheFilterFunction = (text) =>{
    if(text){
        const newData = data.filter(item => {
            
              const itemData = item.moteur.item_moteur ;
              const textData = toString(text);
              return itemData.indexOf(text) > -1;
        })
        setFiltrerData(newData)
    }
    else{
        setFiltrerData(data)
    }
  }

  const FormatDate = (data) => {
    console.log(data)
    let dateTimeString =
        new Date(data).getDate() +
        '/' +
        (new Date(data).getMonth() + 1) +
        '/' +         
        new Date(data).getFullYear()
    
    return dateTimeString; // It will look something like this 3-5-2021 16:23
}; 


  const renderContent=()=>{
    return(
      filtrerData.map((item, index) =>{
        key={index}

        return(
        <View 
          style={{marginBottom:6, 
                  flexDirection:'row',  
                  justifyContent: 'flex-start', 
                  flex:1}}>

              <View> 
              </View>
            <TouchableOpacity 
                style={{flexDirection:'row', flex:3, height:70, }}
              //   onPress={() => navigation.navigate('His_reparation_dtl')}
                onPress ={()=> {
                    setModalitem(item)
                    // setmodalVisible(true)
                    navigation.navigate('His_preventive_dtl',{dataItem:item})
                  }}
                >
                
                  <View style={{flex: 5, backgroundColor:'#316094',borderRadius:5, paddingLeft: 10, }}>
                    <Text style={{fontSize: 20, color:'#E4E4E4', fontWeight:'800'}}>Moteur : {item.moteur.item_moteur} </Text>
                    <Text style={{fontSize: 15, color:'#E4E4E4', fontWeight:'500'}}>Item : {item.item_preventive} </Text>
                    <Text style={{fontSize: 15, color:'#E4E4E4', fontWeight:'500'}}>Date Intervention : {FormatDate(item.createdOn)}</Text>
                   </View>

                  
              </TouchableOpacity>
              
        </View>

      )
      })
    )
  }

 
    return (
        <SafeAreaView style={styles.MainContainer} >
          <StatusBar backgroundColor='#316094' barStyle='light-content'/>
          <View style={{marginLeft: 10,flexDirection: 'row', marginTop:5}}>
            
              <View style={{flex:1}}>
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/logo-entete.png")}/>
              </View>
          </View>
        <View style={{ flexDirection:'row',}}>
          <View style={{flex:1, alignContent:'flex-end'}}>
            <Text style={{paddingLeft: 18,textAlign:'center',fontSize:28,flexWrap:'wrap', fontWeight:'900', color:'#316094'}}>
            Historique des Interventions Préventive </Text>
          </View>
        </View>

        <View style={styles.view_liste}>
            <View style={styles.inputzone }>
                <View style={{flexDirection: 'row',}}>
                    <View style={{flex:9, }}>
                        <TextInput
                            style={styles.rechercheinput}
                            // onChangeText={(val) => besointextInputChange(val)}
                            clearButtonMode="while-editing"
                            // maxLength= {22}
                            keyboardType=''
                            autoCapitalize="characters"
                            placeholder="rechercher le moteur"
                            placeholderTextColor = "#A4A5A4"
                            onChangeText={(val) => searcheFilterFunction(val)}
                        /> 
                    </View>
                </View>            
            </View>
            <ScrollView
              refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}
            >
                { !isEmpty(filtrerData) ?
                  renderContent() :
                  <View style={{flex:5,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'#aaa', fontWeight:'900', fontSize:18}}>Aucune Intervention préventive faite</Text>
                    <Text style={{color:'#000', marginTop:40, flexWrap:'wrap', fontWeight:'400', fontSize:15}}>Tirer vers le bas pour Actualiser !</Text>

                  </View>                  
                }
              
            </ScrollView>         
          
         </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    paddingTop: 10,
    paddingLeft: 10, 
    paddingRight: 10,
  },
  
  view_liste: {
    flex: 6,
    marginTop: 15,
    // backgroundColor: '#1B2F70',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom:0,
    top: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },


  main_container: {
    backgroundColor: '#1B2F70',
    marginBottom: 5,
    height: 120,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row'
    // flex: 1,
  },
  main_container_: {
    height: 100,
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: '#1B2F70',
    padding: 5,
    backgroundColor: '#efefef',
    borderBottomLeftRadius: 15,
    borderBottomWidth: 1.5,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    // flexDirection: 'row'

  },
  view_header_container: {
      flexDirection: 'row',
      flex: 0.71,
  },
  text_profilefonction:{
      flex: 1,
      flexWrap: 'wrap',
      fontWeight: 'bold',
      fontSize: 18
  },
  text_Note: {
      fontWeight: 'bold',
      fontSize: 22,
      color: '#666666'
  },
  text_profile_name:{
    fontSize:15,
    fontStyle: 'italic',
    color: '#666666'

  },
  view_Localisation_container: {
    flexDirection: 'row',
    flex: 0.5,
    padding: 0,
    margin: 0,
  },
  text_localisation: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555555',
    fontStyle: 'italic'
  },
  text_avis:{
    textAlign: 'right',
    fontWeight: '100',
    color: '#4a4a4a'
  },
  view_body: {
      flexDirection: 'row',
      flex: 2
  },
  image: {
    width: 65,
    height: 65,
    margin: 5,
    backgroundColor: 'gray',
    borderRadius: 4
  },
  view_contain_body: {
    flex: 1
  },
  text_body: {
    flexWrap: 'wrap'
  },
  favorite_image: {
    width: 28,
    height: 28,
    marginRight: 5
  },
  inputzone:{
    // flex:2,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    // borderBottomWidth:1,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    // borderBottomWidth: 1.5,
    // borderBottomColor: '#316094'
  },
  rechercheinput:{
      borderWidth:1.2,
      borderColor: '#316094',
      borderRadius: 4,
      height: 10,
      marginRight: 15,
      height: 40,
      paddingLeft: 20,
      fontWeight:'500',
      fontSize: 18,
      textAlign:'center',
      marginHorizontal: 10,
      
  },
  
  MainContainerModal:{
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    margin:20,
    width:400,
  },
  titremodal:{
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'left',
    backgroundColor: '#fff',
    color: '#316094',
    paddingTop: 10,
    paddingLeft: 20, 
    borderTopRightRadius: 4,
    borderTopLeftRadius:4,
    height: 100,
  },
  testcontentmodal:{
    height:100, 
    backgroundColor: '#fff',
    // borderRadius: 4,
    color: '#000',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 18,
    paddingTop:10,
    paddingLeft: 8,
    paddingRight: 8
  },
  txtbtnmodal:{
      height: 30,
      color:'#316094',
      fontSize:20,
      fontWeight: '900' ,
      textAlign: 'right',
      marginBottom: 20,
      paddingRight:20,
      marginRight:10,
      borderBottomLeftRadius:4,
      borderBottomLeftRadius:4,
      marginBottom: 5
    }
   
   
  });

export default HistoriquePreventive;