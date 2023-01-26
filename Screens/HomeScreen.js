import axios, { Axios } from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl, StyleSheet, View, Modal, Pressable, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import warnOnce from 'react-native/Libraries/Utilities/warnOnce';
import { axiosInstanceAPI, baseUrlApi } from '../API/urlbase';
import { AuthContext } from '../context/Authcontext';




const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({navigation}) => {

  const {access_token, logout} = useContext(AuthContext)

    // const [data, setData] = React.useState({
      
    // });
  const [data , setData] = useState([])
  const [filtrerData, setFiltrerData] = useState([])
  const [moteurPlanning, setMoteurPlanning] = useState(false)
  const [modalvisible, setmodalVisible] = useState(false)
  const [modalitem, setModalitem] = useState(false)
  const [selected, setSelected] = useState();
  const [isloading, setIsloading] = useState(false);
  

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getPlanning()
  }, []);

  useEffect(() =>{
    getPlanning()
    // setRefresh_token(null)
  }, [])

  const selectHandler = item => {
    setSelected(item);
  }

  const togleMoteurPlanning = ( ) =>{
    setMoteurPlanning(!moteurPlanning)
    
    
  }

  const Stringtext =() =>{
    if (moteurPlanning){
      return(
        <Text style={{fontSize:18, fontWeight: 'bold', color:'#000' }}>/ Planning</Text>
      )
    }
    else{
      return(
        <Text style={{fontSize:18,  fontWeight: 'bold', color:'#000' }}>/ Moteur</Text>
      )
    }
  }
  const searcheFilterFunction = (text) =>{
    if(text){
        const newData = data.filter(item => {
            // console.log(item.equipement)
            // console.log(text)
              const moteur = item.moteur.item_moteur;
              const planningItem = item.item_planning;

              const itemData = (moteurPlanning ? planningItem : moteur) 
              const textData = toString(text);
              return itemData.indexOf(text) > -1;
        })
        setFiltrerData(newData)
    }
    else{
        setFiltrerData(data)
    }
  }

  const getPlanning = async () => {
    setIsloading(true)
    const configGetMotor = {
      method: 'get',
      url: `${baseUrlApi}/listPlanning/`, // Lien des planninig non executé
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      // const response = await axios(configGetMotor);
      const response = await axios(configGetMotor);
      const data = await response.data
      // console.log("45654656  ",data)
      setData(data);
      setFiltrerData(data);

         
      // console.log(json)
      // console.log(response.status)
    } catch (error){
      console.log(error)
      if(!error.response){
        alert("Aucune reponse du serveur");
      }
      else if (error.response?.status === 400){
        alert("Certains informations ne sont pas renseignées")
      }
      else if (error.response?.status === 401){
        alert("Vous n'est pas authorisé")
        logout()
      }
      else if (error.response?.status === 404){
        alert("Aucun planning de disponible")
      }
      // alert("An error has occurred");
      console.log(response?.status)
      // setIsloading(false)
    }

    setIsloading(false)
  }

  const loading=()=>{
    return(
      <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'}/>
      </View>
    )
  }
function viewModal(val){
  return(
    
    <View >
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalvisible}
        
        // style={styles.MainContainerModal}
      >
        <View  style={{ flex: 1, justifyContent: 'center',
                         backgroundColor: 'rgba(49, 96, 148, 0.15)',  }}>

          <View  style={{ flex: 1, justifyContent: 'center', 
                            marginHorizontal:10,
                          borderRadius:8
                          }}>

            <Text style={styles.titremodal}>Détails intervention
            </Text>
            <View style={{backgroundColor: '#fff',height:500, }}>
              <View style={{alignItems:'center'}}>
              <Text style={{color: '#316094', fontSize:18, 
                          textAlign:'center',marginBottom:5,
                          flexWrap:'wrap',
                          fontWeight:'500'
                          }}>
              Périoe d'intervention</Text>
                <View style= {{flexDirection:'row',alignItems:'flex-start'}}>
                  <Text style={styles.testcontentmodal}>Début: {val.date_int}</Text>
                  <Text style={styles.testcontentmodal}>Fin: {val.date_end_int}</Text>
                  {/* <Text style={styles.testcontentmodal}>content</Text> */}
                </View>
              </View>

              <View style= {{marginTop:15, flexDirection:'row'}}>
                <Text style={[styles.testcontentmodal,{width:'34%'}]}>Programmé le:</Text>
                <Text style={styles.testcontentmodal}>{val.createdOn}</Text>
              </View>

              <View style= {{ flexDirection:'row'}}>
                <Text style={[styles.testcontentmodal,{width:'34%'}]}>Moteur:</Text>
                <Text style={styles.testcontentmodal}>{val.moteur.item_moteur}</Text>
              </View>
              <View style= {{marginTop:15, flexDirection:'row'}}>
                <Text style={[styles.testcontentmodal,{width:'34%'}]}>Atelier:</Text>
                <Text style={styles.testcontentmodal}>{val.atelier.nom_atelier}</Text>
              </View>
              <View style= {{marginTop:15, flexDirection:'row'}}>
                <Text style={[styles.testcontentmodal,{width:'34%'}]}>Equipment:</Text>
                <Text style={styles.testcontentmodal}>{val.equipement.nom_equipenent}</Text>
              </View>
              <View style= {{marginTop:15, flexDirection:'row'}}>
                <Text style={[styles.testcontentmodal,{width:'34%'}]}>Tâche pévue:</Text>
                <Text style={{with: 300,
                             color: '#000',
                            fontSize: 18,
                            paddingLeft: 10,
                            paddingRight: 8,
                            width:'65%'
                          
                            }}>
                            {val.tache}
                            </Text>
              </View>
            </View>            
            <Pressable
                style={{backgroundColor: '#fff', borderBottomRightRadius:8, borderBottomLeftRadius:8}}
                onPress={()=>{setmodalVisible(false)}}
            >
                <Text style={styles.txtbtnmodal}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )

  } 

  function isEmpty(obj) {
    for(var i in obj) { return false; }
    return true;
  }

  const renderHome=()=>{
    return(
        filtrerData.map((item, index) =>{ 
          key={index}
          return(
            <View 
              style={{marginBottom:6, 
                      flexDirection:'row',  
                      justifyContent: 'flex-start', 
                      flex:1}}>
                <TouchableOpacity 
                    style={{flexDirection:'row', flex:3, height:80, }}
                    onPress={() => navigation.navigate('Form_Pre',{dataItem:item})}
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
                    onPress={() => {
                        setModalitem(item)
                        setmodalVisible(true)
                    }}
                    // onPress={() => navigation.navigate('Planning_new',{moteurItem:item})}

                    >
                  <View style={{flex: 5,
                              paddingLeft: 10,
                              borderTopRightRadius: 5,
                              borderBottomRightRadius:5,
                              justifyContent:'center',
                              borderWidth:1 ,
                              borderColor:'#316094',}}>
                      <Text style={{fontSize: 18, color:'#E4E4E4', fontWeight:'900',color:'#0A233E'}}>Détails</Text>
                  </View>
                  { modalvisible ? viewModal(modalitem): null}

                  </TouchableOpacity>
            </View>
        )
        })
      
    )
  }

    return (
        <SafeAreaView style={styles.MainContainer} >
          <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        {/* <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
            <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
        </View> */}
        <View style={{flexDirection: 'row', marginTop:5}}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{marginLeft:10, marginTop:5}}
          >
          <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/menu.png")}/>

          </TouchableOpacity>
            <View style={{flex:1}}>
              <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
            </View>
        </View>

        <View style={{ flexDirection:'row',}}>
          <View style={{flex:1, alignContent:'flex-end'}}>
            <Text style={{paddingLeft: 20,textAlign:'left',
                        fontSize:20,flexWrap:'wrap', 
                        fontWeight:'900', color:'#316094',
                        marginVertical:10,
                        }}>
            Liste programmée d'Intervention</Text>
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
                            // keyboardType='ascii-capable'
                            placeholder=  {moteurPlanning ? "rechercher item planning" : "rechercher item moteur"} //
                            placeholderTextColor = "#A4A5A4"
                            onChangeText={(val) => searcheFilterFunction(val)}
                        /> 
                    </View>
                    <View style={{flex:3, justifyContent:'center', alignContent:'center' }}>
                      <TouchableOpacity
                        onPress={() => {togleMoteurPlanning()}}
                      >
                       
                          {moteurPlanning ? Stringtext() : Stringtext()}
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
                { !isEmpty(filtrerData) ?
                
                  renderHome()              
                  
                :
                  <View style={{flex:5,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'#aaa', fontWeight:'900', fontSize:18}}>Aucune intervention programmée</Text>
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
      paddingRight: 10
    },
    view_liste: {
      flex: 6,
      // marginTop: 15,
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
    color:'#000'
    
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
  color: '#000',
  fontSize: 18,
  paddingLeft: 10,
  paddingRight: 8,

},
txtbtnmodal:{
    // height: 30,
    color:'#316094',
    fontSize:20,
    fontWeight: '900' ,
    textAlign: 'right',
    marginBottom: 20,
    paddingRight:20,
    marginRight:10,
    borderBottomLeftRadius:4,
    borderBottomLeftRadius:4,
    marginVertical: 10
  }
 
   
   
  });

export default HomeScreen;