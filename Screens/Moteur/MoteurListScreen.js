//This is an example code for NavigationDrawer//
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
//import react in our code.
import { Pressable, Modal, RefreshControl, StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView,ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { axiosInstanceAPI, baseUrlApi } from '../../API/urlbase';
import useRefreshToken from '../../API/useRefreshToken';
import { AuthContext } from '../../context/Authcontext';
import CaracteristiqueScreen from './CaracteristiqueScreen';
import Moteur_CaracteristiqueScreen from './Moteur_CaracteristiqueScreen';


  const triggerAlerte = () => {
    // Check for perfect 10 digit length
    
      alert('c\'est bon');
      return;
  };

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }



const MoteurListScreen = ({navigation}) => {


  searchedProfile= ""
  searchedProfile_old= ""
  searchedLocality= ""
  searchedLocality_old= ""
  newRequet = false
  isValidProfie = true

  const {userInfo,access_token} = useContext(AuthContext)


  const [moteurInstalled , setMoteurInstalled] = useState([])
  const [moteurNonInstalled , setMoteurNonInstalled] = useState([])
  const [messageErr , setMessageErr] = useState('')
  const [filtrermoteurInstalled, setFiltrermoteurInstalled] = useState([])

  const [modalvisible, setmodalVisible] = useState(false)
  const [modalitem, setModalitem] = useState(false)
      
    
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    fetchmoteurInstalled()
  }, []);

  useEffect(() =>{
    fetchmoteurInstalled()
    wait(2000).then(()=>fetchmoteurNonInstalled())
    
    // console.log(access_token)
  }, [])

  
  const fetchmoteurInstalled = async () => {

    const configGetMotor = {
      method: 'get',
      url: `${baseUrlApi}/moteur_installed/`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      const response = await axios(configGetMotor);
      // let response = await axiosInstanceAPI.get('/moteur/');
      const data = await response.data
      setMoteurInstalled(data);
      setFiltrermoteurInstalled(data);
      // console.log(data)

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
        useRefreshToken()
        // fetchmoteurInstalled()
      }
      else if (error.response?.status === 404){
        alert("Aucune corespondance a votre demande")
      }
      // alert("An error has occurred");
      // setIsloading(false)
    }
  }
  
  const fetchmoteurNonInstalled = async () => {
    
    const configGetMotor = {
      method: 'get',
      url: `${baseUrlApi}/moteur/`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      const response = await axios(configGetMotor);
      // let response = await axiosInstanceAPI.get('/moteur/');
      const data = await response.data
      setMoteurNonInstalled(data);
      // console.log("Moteur  ",data)

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
        useRefreshToken()
        // fetchmoteurInstalled()
      }
      else if (error.response?.status === 404){
        alert("Aucune corespondance a votre demande")
      }
      // alert("An error has occurred");
      // setIsloading(false)
    }
  }

  const searcheFilterFunction = (text) =>{
    if(text){
        const newmoteurInstalled = moteurInstalled.filter(item => {
            // console.log(item.equipement)
            // console.log(text)
             const itemmoteurInstalled = item.item_moteur ;
             const textmoteurInstalled = toString(text);
             return itemmoteurInstalled.indexOf(text) > -1;
        })
        setFiltrermoteurInstalled(newmoteurInstalled)
    }
    else{
        setFiltrermoteurInstalled(moteurInstalled)
    }
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
         
              <ScrollView >
                <View style={{ flex: 1, justifyContent: 'center',
                           backgroundColor: 'rgba(49, 96, 148, 0.15)',  }}>
  
                <View style={styles.MainContainerModal}>
  
                
                <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
         <View style={{flexDirection:'column'}}>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> {val.marque}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> marque</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> {val.type_moteur}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> type de moteur</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> {val.numeroserie}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> Numéro de Série</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> V {val.tension_triangle} | A {val.courant_triangle}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> couplage triange</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> V {val.tension_etoile} | A {val.courant_etoile}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> couplage étoile</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{val.puissance} KW</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> puissance</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{val.tour_min} Tr/min</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> fréquence de rotation</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> {val.frequence} Hz</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}>fréquence</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{val.cosfi}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> facteur de puissance</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{val.temperature_ambiante_user}°C</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> température ambiante max</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{val.rendement} %</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}>rendement</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{val.phase}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}>{ val.phase > 1 ? "Phases" : "Phase"}</Text>
            </View>
            
         </View>
         <View style={{justifyContent: 'center', alignContent: 'center',marginTop: 10,}}>
           
                <TouchableOpacity
                    onPress={() =>{setmodalVisible(false),navigation.navigate('moteur_install',{moteurItem:val})}}
                >
                    <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/btn_install.png")}/>
                </TouchableOpacity>
                
            </View>
                   
        </ScrollView>
                
                  <Pressable
                      style={{backgroundColor: '#fff',
                             borderBottomRightRadius:8, 
                             borderBottomLeftRadius:8}}
                      onPress={()=>{setmodalVisible(false)}}
                  >
                      <Text style={styles.txtbtnmodal}>Fermer</Text>
                  </Pressable>
                  </View>
                </View>
              </ScrollView>
          
        </Modal>
      </View>
    )
  
  } 


  function isEmpty(obj) {
    for(var i in obj) { return false; }
    return true;
  }

  const moteurinstaller =() =>{
    return(
      filtrermoteurInstalled.map((item, index) =>{ key={index}
        return(      

            <View style={{marginBottom:6, flexDirection:'column',  justifyContent: 'flex-start', flex:1}}>
             
                <TouchableOpacity 
                    style={{flexDirection:'row', height:70, }}
                    onPress={() => navigation.navigate('MenuMoteur',{moteurItem:item, statusmoteur:"NONinstaller"})}
                    >
                      <View style={{flex:1,borderTopLeftRadius: 5, borderBottomLeftRadius:5,borderWidth:1, borderColor:'#316094', justifyContent: 'center', alignContent: 'center'}}>
                          <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon-moteur.png")}/>
                      </View>
                      <View style={{flex: 5, backgroundColor:'#316094', paddingLeft: 10,borderTopRightRadius: 5, borderBottomRightRadius:5 }}>
                        <Text style={{fontSize: 20, color:'#E4E4E4', fontWeight:'900'}}>Moteur : {item.moteur.item_moteur}</Text>
                        <Text style={{fontSize: 16, color:'#E4E4E4', fontWeight:'900'}}>Atelier : {item.atelier.item_atelier}</Text>
                        <Text style={{fontSize: 16, color:'#E4E4E4', fontWeight:'900'}}>Eqt : {item.equipement.item_equipenent} </Text>
                      </View>
                </TouchableOpacity>

                
               
            </View>
        
      )
    }) 
    )
  }


  const moteurNONinstaller =() =>{
    return(
      
      moteurNonInstalled.map((item, index) =>{  key={index}
        return(
            
            <View style={{marginBottom:6, flexDirection:'column',  justifyContent: 'flex-start', flex:1}}>
              {
                !item.install ?

                

                <TouchableOpacity 
                  style={{flexDirection:'row', height:70, }}
                  onPress={() => {
                            setModalitem(item)
                            setmodalVisible(true)
                        }}
                  >
                    <View style={{flex:1,borderTopLeftRadius: 5, borderBottomLeftRadius:5,borderWidth:1, borderColor:'#316094', justifyContent: 'center', alignContent: 'center'}}>
                        <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon-moteur.png")}/>
                    </View>
                    <View style={{flex: 5, backgroundColor:'#ccc', borderColor:'#316094', borderWidth:1.5, paddingLeft: 10,borderTopRightRadius: 5, borderBottomRightRadius:5 }}>
                      <Text style={{fontSize: 20, color:'#000', fontWeight:'900'}}>Moteur : {item.item_moteur}</Text>
                      {/* <Text style={{fontSize: 16, color:'#000', fontWeight:'900'}}>Date création : {item.item_moteur}</Text> */}
                    </View>
                </TouchableOpacity>

                : null

                }
                {viewModal(modalitem)}
            </View>
            
          )
    }) 
    )
  }

 
    return (
      <SafeAreaView 
        style={styles.MainContainer}
      >
      {/* <StatusBar backgroundColor='#316094' barStyle='light-content'/> */}
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

        <View style={{ flexDirection:'row', marginHorizontal:10}}>
          <View style={{flex:1, alignContent:'flex-end'}}>
            <Text style={{paddingLeft: 10,textAlign:'left',fontSize:25,flexWrap:'wrap', fontWeight:'900', color:'#316094'}}>
            Moteur Installé</Text>
          </View>
          <View style={{}}>
           { 
            userInfo.fonction < 3?
            <TouchableOpacity
              onPress={() =>navigation.navigate('moteur_new_moteur')}
            >
              <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/btn_new.png")}/>
            </TouchableOpacity>
            : null}
          </View>
        </View>

        <View style={styles.inputzone }>
            <View style={{flexDirection: 'row',}}>
                <View style={{flex:1, }}>
                    <TextInput
                        style={styles.rechercheinput}
                        clearButtonMode="while-editing"
                        maxLength= {22}
                        placeholder="item moteur" 
                        keyboardType='decimal-pad'
                        placeholderTextColor = "#A4A5A4"
                        onChangeText={(val) => searcheFilterFunction(val)}
                    /> 
                </View>  
            </View>            
        </View>
      

         <ScrollView 
            style={{ flex:9, marginLeft:10,marginRight:10,marginBottom: 5, paddingBottom:5}}
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}
            >
              
              { !isEmpty(moteurNonInstalled) ?
                
                moteurNONinstaller()              
                
               :
                <View style={{flex:5,justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'#aaa', fontWeight:'900', fontSize:18, marginVertical:10}}>Aucun Moteur en Attente d'Installation</Text>

                </View>
              }


              { !isEmpty(filtrermoteurInstalled) ?
                
                moteurinstaller()
               :
                <View style={{flex:5,justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'#aaa', fontWeight:'900', fontSize:18, marginVertical:10}}>Aucun Moteur installé</Text>
                  <Text style={{color:'#000', fontSize:15,  marginVertical:20}}>TIRER VERS LE BAS POUR ACTUALISER LA LISTE !</Text>

                </View>
              }
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: '#E4E4E4',
      paddingTop: 10,
      
    },
   
    View_formcontaine: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        height: 120,
        marginLeft: 10,
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 16
    },
    inputzone:{
      // flex:2,
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 5,
      borderBottomWidth:1,
      paddingBottom:10,
      marginTop: 10,
      marginBottom: 10,
      // borderBottomWidth: 1.5,
      // borderBottomColor: '#316094'
  },
    frominput:{
        flex: 4,
        width: 300, 
        height: 50,
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
      
  },
    text_input: {
      height: 40, 
      width: 270,
      borderColor: 'gray',
      // borderWidth: 1.5, 
      borderColor: "#1B2F70", 
      fontSize: 18,
      borderRadius: 16,
      padding: 5,
      paddingLeft: 15,
      
    },
    iconform: {
      // borderTopWidth: 1.5,
      // borderRightWidth: 1.5,
      // borderBottomWidth: 1.5,
      paddingTop: 5,
      
    },
    bouton_search: {
        flex: 0.81,
        height:90,
        width:50,
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 0,
        justifyContent: 'center',
        // alignSelf: 'flex-end',
        borderRadius: 16,
        backgroundColor: '#1B2F70',
      
    },
    view_resultat:{
        flex: 4,
        marginTop: 20,
        marginBottom: 10,
       
        //marginLeft: 40,
    },
    text_resultat: {
        fontSize: 22,
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        textAlign: 'center'

    },
    view_liste: {
        flex: 6,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
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
    MainContainerModal:{
      flex: 1,
      justifyContent: "center",
      // alignItems: "center",
      marginTop: '5%',
      // margin:20,
      // width:400,
      backgroundColor: '#fff',
      paddingTop: 10,
      paddingLeft: 10, 
      paddingRight: 10,
      justifyContent: 'center',
      alignContent:'center',
      marginHorizontal: 25,
      borderRadius:8
      // width:'80%'

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
    },
    MainContainer: {
      flex: 1,
      backgroundColor: '#E4E4E4',
      paddingTop: 10,
      paddingLeft: 10, 
      paddingRight: 10,
      justifyContent: 'center',
      alignContent:'center'
    },
    etatprovenance:{
        fontSize: 20, 
        color: '#111', 
        fontWeight: 'bold',
        borderWidth: 1.2,
        borderRadius: 6,
        borderColor:'#ED7524',
        width: 88,
        textAlign: 'center',
        padding: 6,
        backgroundColor: '#ED7524',
        color: '#fff'

    },
    cat:{
        justifyContent: 'center', 
        alignSelf: 'center',
        width:300,
        backgroundColor: 'rgba(49, 96, 148, 0.37)',
        borderRadius:4,
        marginTop: 5

    },
    txtcat:{
        fontSize: 25, 
        color:'#111', 
        textAlign:'center',
        fontWeight: '900',
        
    },
    txtcat_designa:{fontWeight:'500', color:'rgba(49, 96, 148, 1)'}
  });


export default MoteurListScreen;








