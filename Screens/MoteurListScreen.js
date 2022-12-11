//This is an example code for NavigationDrawer//
import React, { useEffect, useState } from 'react';
//import react in our code.
import { RefreshControl, StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView,ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import {getProfileFromWithSearchedText} from '../API/PDBA'
import Feather from "react-native-vector-icons/Feather";
import MoteurInstalledItem from '../Components/MoteurInstalledItem';
// import { connect } from 'react-redux';
// import { event } from 'react-native-reanimated';


  const triggerAlerte = () => {
    // Check for perfect 10 digit length
    
      alert('c\'est bon');
      return;

    
  };

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const dataMoteurInstalled = [
    {
        "id": 6,
        "createdOn": "2022-10-27",
        "updatedOn": "2022-10-27",
        "temperature": 37.0,
        "observation_general": "RAS",
        "observation_avant": "RAS",
        "observation_apres": "RAS",
        "atelier": "SECHEUR",
        "equipement": "ONDULEUR",
        "couplage": "ETOILE",
        "motif_remplacement": "RAS",
        "continuite_u1_U2": 0.0,
        "continuite_v1_v2": 0.0,
        "continuite_w1_w2": 0.0,
        "isolement_bobine_w2_u2": 0.0,
        "isolement_bobine_w2_v2": 0.0,
        "isolement_bobine_u2_v2": 0.0,
        "isolement_bobine_masse_u1_m": 0.0,
        "isolement_bobine_masse_v1_m": 0.0,
        "isolement_bobine_masse_w1_m": 0.0,
        "serage": true,
        "equilibrage": true,
        "photo_1": null,
        "photo_2": null,
        "photo_3": null,
        "photo_4": null,
        "photo_5": null,
        "photo_6": null,
        "photo_7": null,
        "photo_8": null,
        "photo_9": null,
        "photo_10": null,
        "moteur": 3,
        "old_moteur": null,
        "technicien": 2,
        "superviceur": 3,
        "item_moteur": "12009386",
    },
    {
        "id": 7,
        "createdOn": "2022-10-27",
        "updatedOn": "2022-10-27",
        "temperature": 37.0,
        "observation_general": "RAS",
        "observation_avant": "RAS",
        "observation_apres": "RAS",
        "atelier": "SECHEUR",
        "equipement": "SAS",
        "couplage": "ETOILE",
        "motif_remplacement": "RAS",
        "continuite_u1_U2": 0.0,
        "continuite_v1_v2": 0.0,
        "continuite_w1_w2": 0.0,
        "isolement_bobine_w2_u2": 0.0,
        "isolement_bobine_w2_v2": 0.0,
        "isolement_bobine_u2_v2": 0.0,
        "isolement_bobine_masse_u1_m": 0.0,
        "isolement_bobine_masse_v1_m": 0.0,
        "isolement_bobine_masse_w1_m": 0.0,
        "serage": true,
        "equilibrage": true,
        "photo_1": null,
        "photo_2": null,
        "photo_3": null,
        "photo_4": null,
        "photo_5": null,
        "photo_6": null,
        "photo_7": null,
        "photo_8": null,
        "photo_9": null,
        "photo_10": null,
        "moteur": 4,
        "old_moteur": null,
        "technicien": 2,
        "superviceur": 3,
        "item_moteur": "12009387",
    },
    {
        "id": 8,
        "createdOn": "2022-10-27",
        "updatedOn": "2022-10-27",
        "temperature": 37.0,
        "observation_general": "RAS",
        "observation_avant": "RAS",
        "observation_apres": "RAS",
        "atelier": "SECHEUR",
        "equipement": "SUPPRESSUE",
        "couplage": "ETOILE",
        "motif_remplacement": "RAS",
        "continuite_u1_U2": 0.0,
        "continuite_v1_v2": 0.0,
        "continuite_w1_w2": 0.0,
        "isolement_bobine_w2_u2": 0.0,
        "isolement_bobine_w2_v2": 0.0,
        "isolement_bobine_u2_v2": 0.0,
        "isolement_bobine_masse_u1_m": 0.0,
        "isolement_bobine_masse_v1_m": 0.0,
        "isolement_bobine_masse_w1_m": 0.0,
        "serage": true,
        "equilibrage": true,
        "photo_1": null,
        "photo_2": null,
        "photo_3": null,
        "photo_4": null,
        "photo_5": null,
        "photo_6": null,
        "photo_7": null,
        "photo_8": null,
        "photo_9": null,
        "photo_10": null,
        "moteur": 5,
        "old_moteur": null,
        "technicien": 2,
        "superviceur": 3,
        "item_moteur": "12009390",

    }
]

const MoteurListScreen = ({navigation}) => {


  searchedProfile= ""
  searchedProfile_old= ""
  searchedLocality= ""
  searchedLocality_old= ""
  newRequet = false
  isValidProfie = true

  const [data , setData] = useState([])
  const [filtrerData, setFiltrerData] = useState([])
      
    
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    fetchData("http://192.168.227.30:8000/api/moteur_installed")
  }, []);

  useEffect(() =>{
    fetchData("http://192.168.227.30:8000/api/moteur_installed")
  }, [])

  

  const fetchData = async (url) => {
    try{
      const response = await fetch(url)
      if (response.status == 200){
        const json = await response.json()
        setData(json);
        setFiltrerData(json);
        console.log(json)
      }
      else if (response.status == 401){
        setData([]);
        setFiltrerData([]);

      }
      
      // console.log(json)
      console.log(response.status)
    } catch (error){
      console.log(error)
    }
  }

  const searcheFilterFunction = (text) =>{
    if(text){
        const newData = data.filter(item => {
            // console.log(item.equipement)
            // console.log(text)
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

  function isEmpty(obj) {
    for(var i in obj) { return false; }
    return true;
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
          <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/menu.png")}/>

          </TouchableOpacity>
            <View style={{flex:1}}>
              <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
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

            { !isEmpty(filtrerData) ?
              
                filtrerData.map((item, index) =>{
                    return(
                        <View style={{marginBottom:6, flexDirection:'column',  justifyContent: 'flex-start', flex:1}}>
                        <TouchableOpacity 
                            style={{flexDirection:'row', height:70, }}
                            onPress={() => navigation.navigate('MenuMoteur',{moteurItem:item})}
                            >
                              <View style={{flex:1,borderTopLeftRadius: 5, borderBottomLeftRadius:5,borderWidth:1, borderColor:'#316094', justifyContent: 'center', alignContent: 'center'}}>
                                  <Image style={{alignSelf:'center',}} source={require("../Screens/sources/assets/images/icon-moteur.png")}/>
                              </View>
                              <View style={{flex: 5, backgroundColor:'#316094', paddingLeft: 10,borderTopRightRadius: 5, borderBottomRightRadius:5 }}>
                                <Text style={{fontSize: 20, color:'#E4E4E4', fontWeight:'900'}}>{item.item_moteur}</Text>
                                <Text style={{fontSize: 16, color:'#E4E4E4', fontWeight:'900'}}>{item.atelier}</Text>
                                <Text style={{fontSize: 16, color:'#E4E4E4', fontWeight:'900'}}>{item.equipement} </Text>
                              </View>
                          </TouchableOpacity>
                    </View>
                  )
                }) 
               :
                <View style={{flex:5,justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'#000'}}>- Vous n'est pas connecté -</Text>

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
    }
  });


export default MoteurListScreen;







