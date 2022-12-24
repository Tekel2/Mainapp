import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Pressable, Modal, ScrollView, RefreshControl } from 'react-native';
import { baseUrlApi } from '../../API/urlbase';
import useRefreshToken from '../../API/useRefreshToken';
import { AuthContext } from '../../context/Authcontext';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const AtelierList = ({navigation}) => {

  const {userInfo,access_token} = useContext(AuthContext)

  const [data , setData] = useState([])
  const [filtrerData, setFiltrerData] = useState([])
  const [moteuPlanning, setMoteurPlanning] = useState(false)
  const [modalvisible, setmodalVisible] = useState(false)
  const [modalitem, setModalitem] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);


  const [selected, setSelected] = useState();

  const selectHandler = item => {
    setSelected(item);
  }

  const toggleModal = (valitem) => {
      setmodalVisible(!modalvisible)
      setModalitem(valitem)
      // console.log('btn courbe press '+ modalvisible)
    }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getDataAtelier()
  }, []);

  useEffect(() => {
    getDataAtelier()
    console.log(userInfo.fonction)
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

  const getDataAtelier = async () => {

    const configGetMotor = {
      method: 'get',
      url: `${baseUrlApi}/atelier/`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      const response = await axios(configGetMotor);
      if (response.status == 200){
        const data = await response.data
        setData(data);
        setFiltrerData(data);
      }
      else if (response.status == 401){
        setData([]);
        setFiltrerData([]);
        setMessageErr('-  -')


      }
      else if (response.status == 404){
        setFiltrerData([]);
        setData([]);
        setMessageErr('- Aucun Atelier de disponible -')

      }
      
      // console.log(json)
      // console.log(response.status)
    } catch (error){
      console.log(error)
      if (error.response?.status === 401){
        alert("Vous n'est pas authorisé")
        useRefreshToken()
      }
    }
  }





  const searcheFilterFunction = (text) =>{
    if(text){
        const newData = data.filter(item => {
            console.log(item.equipement)
            console.log(text)
              const itemData = item.nom_atelier ;
              const textData = toString(text);
              return itemData.indexOf(text) > -1;
        })
        setFiltrerData(newData)
    }
    else{
        setFiltrerData(data)
    }
  }

  function viewModal(val){
    return(
      <View style={styles.MainContainerModal}>
        <Modal
          // animationType="slide"
          transparent={true}
          visible={modalvisible}
        >
          <View  style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.titremodal}>Atelier
            </Text>
            <Text style={styles.testcontentmodal}>
                {val.id}
            </Text>
            
            <Pressable
                style={{backgroundColor: '#fff'}}
                onPress={()=>{setmodalVisible(false)}}
            >
                <Text style={styles.txtbtnmodal}>Fermer</Text>
            </Pressable>
          </View>
        </Modal>
      </View>

    )
  }

 
    return (
        <SafeAreaView style={styles.MainContainer} >
          <StatusBar backgroundColor='#316094' barStyle='light-content'/>
          <View style={{marginLeft: 10,flexDirection: 'row', marginTop:5}}>
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
            Liste des   Ateliers</Text>
          </View>
          { userInfo.fonction <  3 ?  // teste du niveau hierachique de l'utilisateur 3 etant le niveau le plus bas
            <View style={{}}>
            <TouchableOpacity
              onPress={() =>navigation.navigate('Form_atelier')}
            >
              <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/btn_new.png")}/>
            </TouchableOpacity>
          </View> 
          :null
          }
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
                            placeholder="rechercher atelier"
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
                            style={{flexDirection:'row', flex:3, height:70, }}
                          //   onPress={() => navigation.navigate('moteur_detail')}
                            onPress ={()=> {
                                setModalitem(item)
                                setmodalVisible(true)
                              }}
                            >
                            
                              <View style={{flex: 5, backgroundColor:'#316094',borderTopLeftRadius:5,borderBottomLeftRadius:5, paddingLeft: 10, }}>
                                <Text style={{fontSize: 20, color:'#E4E4E4', fontWeight:'800'}}>Atelier: {item.nom_atelier} </Text>
                                <Text style={{fontSize: 15, color:'#E4E4E4', fontWeight:'500'}}>ItemAtelier: {item.item_atelier} </Text>
                                <Text style={{fontSize: 15, color:'#E4E4E4', fontWeight:'500'}}>{item.createdOn}</Text>

                                {viewModal(modalitem)}
                                {/* <viewModal val={modalitem}/> */}
                               </View>

                              
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={{flexDirection:'row', flex:1, height:70, }}
                          //   onPress={() => navigation.navigate('moteur_detail')}
                            // onPress={() => navigation.navigate('Planning_new',{moteurItem:item})}

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

export default AtelierList;