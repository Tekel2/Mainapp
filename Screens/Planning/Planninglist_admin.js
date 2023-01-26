import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl, StyleSheet, View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { axiosInstanceAPI, baseUrlApi } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Planninglist_admin = ({navigation}) => {


  // const [data, setData] = React.useState({
    
  // });
  const {access_token,userInfo,logout} = useContext(AuthContext)

  const [data , setData] = useState([])
  const [filtrerData, setFiltrerData] = useState([])
  const [moteuPlanning, setMoteurPlanning] = useState(false)

  const [selected, setSelected] = useState();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getPlanning()
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

  useEffect(() =>{
    getPlanning()
    // console.log(AsyncStorage.getItem('access_token'))
  }, [])



  const getPlanning = async () => {

    const configGetMotor = {
      method: 'get',
      url: `${baseUrlApi}/planning/False/`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      const response = await axios(configGetMotor);
      if (response.status == 200){
        const data = await response.data
        // console.log(data)
        setData(data);
        setFiltrerData(data);
      }
      else if (response.status == 401){
        setData([]);
        setFiltrerData([]);
        setMessageErr('- Aucun moteur installé ou en attente de d\'installation -')
        alert("Votre session est expirer")
        logout()


      }
      else if (response.status == 404){
        setData([]);
        setFiltrerData([]);
        setMessageErr('- Aucun moteur installé ou en attente de d\'installation -')

      }
      
      // console.log(json)
      // console.log(response.status)
    } catch (error){
      console.log(error)
    }
  }

  const searcheFilterFunction = (text) =>{
    if(text){
        const newData = data.filter(item => {
            console.log(item.equipement)
            console.log(text)
              const itemData = item.item_moteur ;
              const textData = toString(text);
              return itemData.indexOf(text) > -1;
        })
        setFiltrerData(newData)
    }
    else{
        setFiltrerData(data)
    }
  }

 
    return (
        <SafeAreaView style={styles.MainContainer} >
          <StatusBar backgroundColor='#316094' barStyle='light-content'/>
          <View style={{flexDirection: 'row', marginTop:5}}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{marginLeft:10, marginTop:5}}
            >
            <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/menu.png")}/>

            </TouchableOpacity>
              <View style={{flex:1}}>
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/logo-entete.png")}/>
              </View>
          </View>
        <View style={{ flexDirection:'row',}}>
          <View style={{flex:1, alignContent:'flex-end'}}>
            <Text style={{paddingLeft: 20,textAlign:'left',fontSize:28,flexWrap:'wrap', fontWeight:'900', color:'#316094'}}>
            Planning d'Intervention</Text>
          </View>
          {
            userInfo.fonction < 3 ?
            <View style={{}}>
            <TouchableOpacity
              onPress={() =>navigation.navigate('Planning_find', {option:'planning'})}
            >
              <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/btn_new.png")}/>
            </TouchableOpacity>
          </View>
          : null}
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
                            keyboardType='decimal-pad'
                            placeholder="rechercher item moteur"
                            placeholderTextColor = "#A4A5A4"
                            onChangeText={(val) => searcheFilterFunction(val)}
                        /> 
                    </View>
                    <View style={{flex:3, justifyContent:'center', alignContent:'center' }}>
                      <TouchableOpacity
                        onPress={() => {togleMoteurPlanning()}}
                      >
                       
                          {moteuPlanning ? Stringtext() : Stringtext()}
                      </TouchableOpacity>
                      
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
                {
                  filtrerData.map((item, index) =>{
                    return(
                    <View 
                      style={{marginBottom:6, 
                              flexDirection:'row',  
                              justifyContent: 'flex-start', 
                              flex:1}}>

                          <View> 
                          </View>
                        <TouchableOpacity 
                            style={{flexDirection:'row', flex:3, height:80, }}
                          //   onPress={() => navigation.navigate('moteur_detail')}
                            >
                            
                              <View style={{flex: 5, backgroundColor:'#316094',borderTopLeftRadius:5,borderBottomLeftRadius:5, paddingLeft: 10, }}>
                                <Text style={{fontSize: 13, color:'#E4E4E4', fontWeight:'500'}}>ItemPlanning: {item.item_planning} </Text>
                                <Text style={{fontSize: 13, color:'#E4E4E4', fontWeight:'500'}}>Début: {item.date_int}   |   Fin: {item.date_end_int}</Text>
                                {/* <Text style={{fontSize: 12, color:'#E4E4E4', fontWeight:'500'}}>Fin: 12/12/2022</Text> */}
                                <Text style={{fontSize: 13, color:'#E4E4E4', fontWeight:'500'}}>Item moteur: {item.moteur.item_moteur} </Text>
                                <Text style={{fontSize: 13, color:'#E4E4E4', fontWeight:'500'}}>Atelier: {item.atelier.nom_atelier} </Text>
                                <Text style={{fontSize: 13, color:'#E4E4E4', fontWeight:'500'}}>Equipment: {item.equipement.nom_equipenent} </Text>
                              </View>

                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={{flexDirection:'row', flex:1, height:80, }}
                          //   onPress={() => navigation.navigate('moteur_detail')}
                            onPress={() => navigation.navigate('Planning_new',{moteurItem:item, methode:'put' })}

                            >
                          <View style={{flex: 5,
                                      paddingLeft: 10,
                                      borderTopRightRadius: 5,
                                      borderBottomRightRadius:5,
                                      justifyContent:'center',
                                      borderWidth:1 ,
                                      borderColor:'#316094',}}>
                              <Text style={{fontSize: 18, color:'#E4E4E4', fontWeight:'900',color:'#0A233E'}}>Modifier</Text>
                          </View>

                          </TouchableOpacity>
                    </View>
                  )
                  })
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
      paddingRight: 10
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
   
   
  });

export default Planninglist_admin;