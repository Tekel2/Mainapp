import axios from 'axios';
import React, { Component, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';
// import CheckBox from 'expo-checkbox';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { baseUrlApi } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';

const  Form_new_atelier =({navigation, route}) => {

  const {userToken, userInfo} = useContext(AuthContext)
  const {isLoading, setIsloading } = useState(true)
  const [nomAtelier, setNomAtelier] = useState('')
  const [itemAtelier, setItemAtelier] = useState('')
 
  
const handleateliername = (val) => {
  if( val.trim().length >= 3 ) {
      setNomAtelier(val)
  }
  
}


const handleatelierItem = (val) => {
  if( val.trim().length >= 3 ) {
    setItemAtelier(val)
  }
  
}




const data = () => {
  return {
    create_by: userInfo.id,
    item_atelier : itemAtelier,
    nom_atelier : nomAtelier,
  }
}


const loading =()=>{
  return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
  )
}



const postData = async (data, route, ) =>{
    try {
      // setIsloading(true)
      const response = await axios.post(`${baseUrlApi}/${route}/`, 
          data,
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `token ${userToken}`
            }
          },
        );
      
        navigation.navigate('Atelier')

    } catch (error) {
      if(!error.response){
        alert("Aucune reponse du serveur");
      }
      else if (error.response?.status === 400){
        alert("Certains informations ne sont pas renseignées")
      }
      else if (error.response?.status === 401){
        alert("Vous n'est pas authorisé")
      }
      else if (error.response?.status === 404){
        alert("Aucune corespondance a votre demande")
      }
      // alert("An error has occurred");
      console.log(error.status)
      // setIsloading(false)

    }


    
}

const renderContent=()=>{
  return(
    <View>
      <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Item de l'Atelier</Text>
            <TextInput
                  placeholder="nom"
                  placeholderTextColor="#777"
                  autoCapitalize="sentences"
                  // multiline={true}
                  style={[styles.textinput,styles.textinputmulti]}
                  onChangeText={(val) => handleatelierItem(val)}
              />              
          </View>

          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Nom de l'Atelier</Text>
            <TextInput
                  placeholder="nom"
                  placeholderTextColor="#777"
                  autoCapitalize="sentences"
                  // multiline={true}
                  style={[styles.textinput,styles.textinputmulti]}
                  onChangeText={(val) => handleateliername(val)}
              />              
          </View>
          
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/annuler.png")}/>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}              
              onPress={() => {postData(data(), 'atelier')}}
              >
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/enregistrer.png")}/>
            </TouchableOpacity>
           
          </View>
    </View>
  )
}



    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
        <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{ flexDirection: 'column'}}>
            <View style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/logo-entete.png")}/>
            </View>
        
        
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>CREATION ATELIER</Text>
          </View>
        </View>

        <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5,}}>
          <View style={{flex:9, justifyContent:'center', alignItems:'center'}}>
              { isLoading ? loading(): renderContent() }
          </View>
        </ScrollView>
           

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
      paddingBottom: 10,
      justifyContent: 'center',
      alignContent:'center',
    },
    etatprovenance:{
        fontSize: 20, 
        color: '#111', 
        fontWeight: 'bold',
        borderBottomWidth: 1.5,
        borderRadius: 6,
        borderColor:'#ED7524',
        width: 88,
        textAlign: 'center',
        padding: 6,
        // backgroundColor: '#ED7524',
        color: '#fff'

    },
    
    txtnomchamp:{
      flex:2,  
      color: '#000', 
      fontSize: 16,
      fontWeight: '500',
      flexWrap: 'wrap',
      padding: 2
    },
    txtdatachamp:{
      flex:1.5,
      marginLeft:15,
      color: '#000', 
      fontSize: 18,
      flexWrap:'wrap',
      padding: 2,
      fontWeight: '900',
    },
    titrechamp:{
      fontSize: 20,
      color: '#000'
      // marginLeft:5,
    },
    textinput: {
      borderColor: '#ddd',
      marginLeft: 5,
      fontSize: 18,
      color: '#1B2F70',
      padding: 5,
      borderColor: '#1B2F70',
      borderWidth: 1, borderRadius:4,
      backgroundColor:'#eee', 
    },
    textinputmulti:{
      marginBottom: 30, 
      textAlignVertical: 'top', 
      fontSize: 16, 
      backgroundColor:'#eee', 
      fontSize: 18,
      padding:5,
      }
  
  });

export default Form_new_atelier;