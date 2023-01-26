import axios from 'axios';
import React, { Component, useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';
import { baseUrlApi } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';

const  Form_new_eqt =({navigation, route}) =>{


  const {userInfo,access_token, logout} = useContext(AuthContext)

  const [nomeqt, setNomeqt] = useState('')
  const [nbreMoteur, setNbreMoteur] = useState(1)
  const [itemeqt, setItemeqt] = useState('')
  const [atelierID, setatelierID] = useState(0)
 
  const item = route.params.atelierItem;

  const handleEqtname = (val) => {
    if( val.trim().length >= 4 ) {
        setNomeqt(val)
    }
    
  }

  const handleEqtitem = (val) => {
    if( val.trim().length >= 4 ) {
        setItemeqt(val)
    }
    
  }

  const handleNombreMoteur = (val) => {
    if( val>=1 ) {
        setNbreMoteur(val)
    }
    else{
      alert("Un équipement doit avois au moins un moteur")
    }
    
  }

  // const data = () => {
  //   return {
  //     create_by : userInfo.id,
  //     atelier : item.id,
  //     item_equipenent : itemeqt,
  //     nom_equipenent : nomeqt,
  //   }
  // }

  const postData = async (route, ) =>{
    // console.log(data)
    const datatofetch=new FormData();
    datatofetch.append('create_by',userInfo.id)
    datatofetch.append('atelier',item.id)
    datatofetch.append('item_equipenent',itemeqt)
    datatofetch.append('nom_equipenent',nomeqt)
    datatofetch.append('nombre_moteur',nbreMoteur)
    try {
      // setIsloading(true)
      const response = await axios.post(`${baseUrlApi}/${route}/`, 
          datatofetch,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': `JWT ${access_token}`
            }
          },
        );
      
        navigation.navigate('Equipement')

    } catch (error) {
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
        alert("Aucune corespondance a votre demande")
      }
      // alert("An error has occurred");
      console.log(error)
      // setIsloading(false)

    }    
  }

// const saveDatatoServer = (data) => {
//   console.log(data)
// }

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
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>Nouvel Equipent</Text>
          </View>
        </View>

        <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
          <View style={{flex:1, flexDirection: 'row', marginVertical:10}}>
            <Text style={styles.titrechamp}>Dans l'atelier </Text>
            <Text style={[styles.titrechamp,{fontWeight:'bold', fontSize:22}]}> { item.nom_atelier}</Text>
                
          </View>

          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Nom équipement</Text>
            <TextInput
                  placeholder="nom"
                  placeholderTextColor="#777"
                  autoCapitalize="sentences"
                  // multiline={true}
                  style={[styles.textinput,styles.textinputmulti]}
                  onChangeText={(val) => handleEqtname(val)}
              />              
          </View>
          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Item équipement</Text>
            <TextInput
                  placeholder="nom"
                  placeholderTextColor="#777"
                  autoCapitalize="sentences"
                  // multiline={true}
                  style={[styles.textinput,styles.textinputmulti]}
                  onChangeText={(val) => handleEqtitem(val)}
              />              
          </View>
          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Nombre de moteur</Text>
            <TextInput
                  placeholder="nom"
                  placeholderTextColor="#777"
                  autoCapitalize="sentences"
                  // multiline={true}
                  // value={nbreMoteur}

                  keyboardType={'decimal-pad'}
                  style={[styles.textinput,styles.textinputmulti]}
                  onChangeText={(val) => handleNombreMoteur(val)}
              />              
          </View>
          
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/annuler.png")}/>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}              
              onPress={() => {postData('equipement' )}}
              >
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/enregistrer.png")}/>
            </TouchableOpacity>
           
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

export default Form_new_eqt;