import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput, PermissionsAndroid, Alert } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { baseUrlApi } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';




const Form_HorserviceScreen = ({route, navigation}) =>{
  

  const {userInfo,access_token, logout} = useContext(AuthContext)

  const {moteurItem} = route.params

  const [image_1_View, setImage_1_View] = useState('')
  const [image_2_View, setImage_2_View] = useState('')
  const [image_3_View, setImage_3_View] = useState('')
  const [image_4_View, setImage_4_View] = useState('')
  const [dataSuperviseur, setDataSuperviseur] = useState([])
  const [dataTechnicien, setDataTechnicien] = useState([])
  const [dataInstallation, setDataInstallation] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const [data, setData] = React.useState({
    obsevervation_gene: '',
    motifhorservice:'',
    continuite_U1_U2: 0.0,
    continuite_V1_V2: 0.0,
    continuite_W1_W2: 0.0,
    isolementbobine_W2_U2: 0.0,
    isolementbobine_W2_V2: 0.0,
    isolementbobine_U1_V2: 0.0,
    isolementbobinemasse_U1_M: 0.0,
    isolementbobinemasse_V1_M: 0.0,
    isolementbobinemasse_W1_M: 0.0,
    proposition: '',
    temperature: 0.0,
    photo_1:{},
    photo_2:{},
    photo_3:{},
    photo_4:{},
    idTech: 0,
    idsuperv:0,

});

useEffect(() =>{
  console.log(moteurItem.moteur.item_moteur)
  console.log(access_token)
  getSuperviseur('superviceur_list')
  getTechnicien('technicien_list')
  // getInfoInstallation('moteur_installed', moteurItem.id)

},[])

useEffect(() =>{
  getStoredata(moteurItem.moteur.item_moteur)

},[])



  const getImage_1_View = async  () =>{
    const options = {
      storageOption : {
        path: 'images',
        mediaType: 'photo',
      },
      mediaType: 'photo',
      includeBase64: true
    };

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        launchCamera(options, response =>{
      
          console.log('Response = ', response)
          if (response.didCancel){
            console.log('User conceeled Image Picker')
          }
          else if (response.error){
            console.log('ImagePicker Error', response.error)
          }
          else if (response.customButton){
            console.log('User tape custom button', response.customButton)
          }
          else {
          //  const source = {uri : 'data:image/jpeg;base64,' + response.base64}
          const source = { uri: response.assets[0].uri };
          setImage_1_View(source)
    
    
          let localUri = response.assets[0].uri;
          // setPhotoShow(localUri);
          let filename = localUri.split('/').pop();
    
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
    
          // let formData = new FormData();
          //   formData.append('photo', { uri: localUri, name: filename, type });
          setData({
            ...data,
            photo_1: { uri: localUri, name: filename, type }
            
          })
          
          //   console.log(formData)
          // console.log("URI ", response.assets[0].uri)
          // console.log("Filename ", response.assets[0].uri.split('/').pop())
          // console.log("match ", /\.(\w+)$/.exec(response.assets[0].uri.split('/').pop()))
          // console.log("Type ", /\.(\w+)$/.exec(response.assets[0].uri.split('/').pop()) ? `image/${/\.(\w+)$/.exec(response.assets[0].uri.split('/').pop())[1]}` : `image`)
          
    
          }
        })
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    } 


  };
  const getImage_2_View = async () =>{
    const options = {
      storageOption : {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true
    };

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
        launchCamera(options, response =>{
      
          // console.log('Response = ', response)
          if (response.didCancel){
            console.log('User conceeled Image Picker')
          }
          else if (response.error){
            console.log('ImagePicker Error', response.error)
          }
          else if (response.customButton){
            console.log('User tape custom button', response.customButton)
          }
          else {
          //  const source = {uri : 'data:image/jpeg;base64,' + response.base64}
          const source = { uri: response.assets[0].uri };
          setImage_2_View(source)

          let localUri = response.assets[0].uri;
          // setPhotoShow(localUri);
          let filename = localUri.split('/').pop();

          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          // let formData = new FormData();
          //   formData.append('photo', { uri: localUri, name: filename, type });
          setData({
            ...data,
            photo_2: { uri: localUri, name: filename, type }
            
          })
          
          //   console.log(formData)
          // console.log("URI ", response.assets[0].uri)
          // console.log("Filename ", response.assets[0].uri.split('/').pop())
          // console.log("match ", /\.(\w+)$/.exec(response.assets[0].uri.split('/').pop()))
          // console.log("Type ", /\.(\w+)$/.exec(response.assets[0].uri.split('/').pop()) ? `image/${/\.(\w+)$/.exec(response.assets[0].uri.split('/').pop())[1]}` : `image`)
          }
        })
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }


  };
  const getImage_3_View = async () =>{
    const options = {
      storageOption : {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true
    };

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
        launchCamera(options, response =>{
      
          // console.log('Response = ', response)
          if (response.didCancel){
            console.log('User conceeled Image Picker')
          }
          else if (response.error){
            console.log('ImagePicker Error', response.error)
          }
          else if (response.customButton){
            console.log('User tape custom button', response.customButton)
          }
          else {
          //  const source = {uri : 'data:image/jpeg;base64,' + response.base64}
          const source = { uri: response.assets[0].uri };
          setImage_3_View(source)

          let localUri = response.assets[0].uri;
          // setPhotoShow(localUri);
          let filename = localUri.split('/').pop();

          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          // let formData = new FormData();
          //   formData.append('photo', { uri: localUri, name: filename, type });
          setData({
            ...data,
            photo_3: { uri: localUri, name: filename, type }
            
          })
          
          //   console.log(formData)
          // console.log("URI ", response.assets[0].uri)
          // console.log("Filename ", response.assets[0].uri.split('/').pop())
          // console.log("match ", /\.(\w+)$/.exec(response.assets[0].uri.split('/').pop()))
          // console.log("Type ", /\.(\w+)$/.exec(response.assets[0].uri.split('/').pop()) ? `image/${/\.(\w+)$/.exec(response.assets[0].uri.split('/').pop())[1]}` : `image`)
          }
        })
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }


  };
  const getImage_4_View = async() =>{
    const options = {
      storageOption : {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true
    };

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
        launchCamera(options, response =>{
      
          // console.log('Response = ', response)
          if (response.didCancel){
            console.log('User conceeled Image Picker')
          }
          else if (response.error){
            console.log('ImagePicker Error', response.error)
          }
          else if (response.customButton){
            console.log('User tape custom button', response.customButton)
          }
          else {
          //  const source = {uri : 'data:image/jpeg;base64,' + response.base64}
          const source = { uri: response.assets[0].uri };
          setImage_4_View(source)

          let localUri = response.assets[0].uri;
          // setPhotoShow(localUri);
          let filename = localUri.split('/').pop();

          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          // let formData = new FormData();
          //   formData.append('photo', { uri: localUri, name: filename, type });
          setData({
            ...data,
            photo_4: { uri: localUri, name: filename, type:type }
            
          })
          
        
          }
        })
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }

  };
  const handle_Motifhorservice = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            motifhorservice: val,
        });
    } else {
        setData({
            ...data,
            motifhorservice: val,
        });
    }
  }
  const handle_Continuite_U1_U2 = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            continuite_U1_U2: val,
        });
    } else {
        setData({
            ...data,
            continuite_U1_U2: val,
        });
    }
  }
  const handle_Continuite_V1_V2 = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            continuite_V1_V2: val,
        });
    } else {
        setData({
            ...data,
            continuite_V1_V2: val,
        });
    }
  }
  const handle_Continuite_W1_W2 = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            continuite_W1_W2: val,
        });
    } else {
        setData({
            ...data,
            continuite_W1_W2: val,
        });
    }
  }
  const handle_Isolementbobine_W2_U2 = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            isolementbobine_W2_U2: val,
        });
    } else {
        setData({
            ...data,
            isolementbobine_W2_U2: val,
        });
    }
  }
  const handle_Isolementbobine_W2_V2 = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            isolementbobine_W2_V2: val,
        });
    } else {
        setData({
            ...data,
            isolementbobine_W2_V2: val,
        });
    }
  }
  const handle_Isolementbobine_U1_V2 = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            isolementbobine_U1_V2: val,
        });
    } else {
        setData({
            ...data,
            isolementbobine_U1_V2: val,
        });
    }
  }
  const handle_Isolementbobinemasse_U1_M = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            isolementbobinemasse_U1_M: val,
        });
    } else {
        setData({
            ...data,
            isolementbobinemasse_U1_M: val,
        });
    }
  }
  const handle_Isolementbobinemasse_V1_M = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            isolementbobinemasse_V1_M: val,
        });
    } else {
        setData({
            ...data,
            isolementbobinemasse_V1_M: val,
        });
    }
  }
  const handle_Isolementbobinemasse_W1_M = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            isolementbobinemasse_W1_M: val,
        });
    } else {
        setData({
            ...data,
            isolementbobinemasse_W1_M: val,
        });
    }
  }
  const handle_Proposition = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            proposition: val,
        });
    } else {
        setData({
            ...data,
            proposition: val,
        });
    }
  }
  const handle_Temperature = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            temperature: val,
        });
    } else {
        setData({
            ...data,
            temperature: val,
        });
    }
  }
  const handle_superviseur = (val) => {
    
    setData({
        ...data,
        idsuperv: val,
    });

  }
  const handle_Technicien = (val) => {

  setData({
      ...data,
      idTech: val,
  });

  }
  const handle_Observation_gen = (val)=>{
    setData({
      ...data,
      obsevervation_gene: val,
  });
  }


  // liste de tous les supervisseurs de la plateforme
  const getSuperviseur = async ( route, ) =>{

    try {
      setIsLoading(true)

      const response = await axios.get(`${baseUrlApi}/${route}/`, 
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `JWT ${access_token}`
            }
          },
        );
        // navigation.navigate('Equipement')
        const data = await response.data
        setDataSuperviseur(data)
        setIsLoading(false)
        // console.log("superviseur : ", data)

    } catch (error) {
      if(!error.response){
        alert("Aucune reponse du serveur");
      }
      else if (error.response?.status === 400){
        alert("Certains informations ne sont pas renseignées")
      }
      else if (error.response?.status === 401){
        alert("Votre session est expirer")
        logout()
      }
      else if (error.response?.status === 404){
        alert("Aucune corespondance a votre demande")
      }
      // alert("An error has occurred");
      console.log(error)
      setIsLoading(false)

    }    
  }
  // liste de tous les techniciens de la plateforme
  const getTechnicien = async ( route, ) =>{

    try {
      setIsLoading(true)
      const response = await axios.get(`${baseUrlApi}/${route}/`, 
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `JWT ${access_token}`
            }
          },
        );
        // navigation.navigate('Equipement')
        const data = await response.data
        setDataTechnicien(data)
        // console.log('technicien  : ', data)
        setIsLoading(false)

    } catch (error) {
      if(!error.response){
        alert("Aucune reponse du serveur");
      }
      else if (error.response?.status === 500){
        alert("Certains informations ne sont pas renseignées")
      }
      else if (error.response?.status === 401){
        alert("Votre session est expirer")
        logout()
      }
      else if (error.response?.status === 404){
        alert("Aucune corespondance a votre demande")
      }
      // alert("An error has occurred");
      console.log(error)
      setIsLoading(false)

    }    
  }

  const  removeItemValue= async(key) =>{
    try {
        await AsyncStorage.removeItem('HS'+key);
        return true;
    }
    catch(exception) {
        return false;
    }
  }


  const fetchData_HS = async () => {

    setIsLoading(true)

    const datatofetch=new FormData();

    datatofetch.append('moteur',moteurItem.moteur.id)
    datatofetch.append('create_by',userInfo.id)
    datatofetch.append('temperature',parseFloat(data.temperature.replace(/,/g, '')))
    datatofetch.append('motifhorservice',data.motifhorservice)
    datatofetch.append('observation_general',data.obsevervation_gene)
    datatofetch.append('recommendation',data.proposition)
    datatofetch.append('continuite_u1_U2',parseFloat(data.continuite_U1_U2.replace(/,/g, '')))
    datatofetch.append('continuite_v1_v2', parseFloat(data.continuite_V1_V2.replace(/,/g, '')))
    datatofetch.append('continuite_w1_w2', parseFloat(data.continuite_W1_W2.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_w2_u2', parseFloat(data.isolementbobine_W2_U2.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_w2_v2', parseFloat(data.isolementbobine_W2_V2.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_u2_v2',parseFloat(data.isolementbobine_U1_V2.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_masse_u1_m',parseFloat(data.isolementbobinemasse_U1_M.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_masse_v1_m',parseFloat(data.isolementbobinemasse_V1_M.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_masse_w1_m',parseFloat(data.isolementbobinemasse_W1_M.replace(/,/g, '')))
    datatofetch.append('photo_1',data.photo_1)
    datatofetch.append('photo_2',data.photo_2)
    datatofetch.append('photo_3',data.photo_3)
    datatofetch.append('photo_4',data.photo_4)
    datatofetch.append('technicien',data.idTech)
    datatofetch.append('superviceur',data.idsuperv)

    // console.log(datatofetch._parts)

    try {
      // const response = await axios.post(`${baseUrlApi}/hors_service/`,datatofetch, 
      const response = await axios.post(`${baseUrlApi}/hors_service/`,datatofetch, 

        {
          headers: {
            // "Accept":" */*",
            // "Content-Type": "application/json",
            'content-type': 'multipart/form-data',
            'Authorization': `JWT ${access_token}`
          }
        },
        );
      // removeItemValue(moteurItem.moteur.item_moteur)
      navigation.navigate('moteur_Home')

  } catch (error) {
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
      alert("Aucune corespondance a votre demande")
    }
    // alert("An error has occurred");
    // console.log(error.status)
    setIsLoading(false)
    console.log(error)
  }    


     
    // try {
    //   setIsLoading(true)
    //   const response = await axios.post(`${baseUrlApi}/hors_service/`,datatofetch, 
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //           'Authorization': `JWT ${access_token}`
    //         }
    //       },
    //       );

    //   removeItemValue(moteurItem.moteur.item_moteur)
    //   navigation.navigate('moteur_Home')
    //   setIsLoading(false)
      
    // } catch (error) {
    //   alert("An error has occurred");
    //   setIsLoading(false);
    //   console.log(error)
    // }
      
  }


  const localSave =(key)=>{
    try{
      var dataIntervention = {
        ID : moteurItem.moteur.item_moteur,
        temperature : data.temperature,
        proposition : data.proposition,
        observation_general : data.obsevervation_gene,
        motifhorservice: data.motifhorservice,
        description_panne: data.descriptionpanne,
        observation_conectique : data.obsevervation_conectique,
        continuite_u1_U2 : data.continuite_U1_U2,
        continuite_v1_v2 : data.continuite_V1_V2,
        continuite_w1_w2 : data.continuite_W1_W2,
        isolement_bobine_w2_u2 : data.isolementbobine_W2_U2,
        isolement_bobine_w2_v2 : data.isolementbobine_W2_V2,
        isolement_bobine_u2_v2 : data.isolementbobine_U1_V2,
        isolement_bobine_masse_u1_m : data.isolementbobinemasse_U1_M,
        isolement_bobine_masse_v1_m : data.isolementbobinemasse_V1_M,
        isolement_bobine_masse_w1_m : data.isolementbobinemasse_W1_M,
        photo_1 : {'photo':data.photo_1, 'image':image_1_View},
        photo_2 : {'photo':data.photo_2, 'image':image_2_View},
        photo_3 : {'photo':data.photo_3, 'image':image_3_View},
        photo_4 : {'photo':data.photo_4, 'image':image_4_View},
        // technicien : data.idTech,
        // superviceur : data.idsuperv
      }


      AsyncStorage.setItem('HS'+key, JSON.stringify(dataIntervention))
      .then(()=>{
        Alert.alert('Intervention sauvergardée localement')
        navigation.goBack();
      })
    } catch(error){
      console.log("..........",error)
    }
  }

  const getStoredata =async(key)=>{
    // setIsLoading(true)
    try{
      const inter = JSON.parse(await AsyncStorage.getItem('HS'+key));
      // console.log('inter.continuite_V1_V2', inter.continuite_v1_v2)
      if (inter){

        // console.log("-----")
        setData({
          ...data,
          motifhorservice: inter.motifhorservice,
          obsevervation_gene: inter.observation_general,
          continuite_U1_U2: inter.continuite_u1_U2,
          continuite_V1_V2: inter.continuite_v1_v2,
          continuite_W1_W2: inter.continuite_w1_w2,
          isolementbobine_W2_U2: inter.isolement_bobine_w2_u2,
          isolementbobine_W2_V2: inter.isolement_bobine_w2_v2,
          isolementbobine_U1_V2: inter.isolement_bobine_u2_v2,
          isolementbobinemasse_U1_M: inter.isolement_bobine_masse_u1_m,
          isolementbobinemasse_V1_M: inter.isolement_bobine_masse_v1_m,
          isolementbobinemasse_W1_M: inter.isolement_bobine_masse_w1_m,
          proposition: inter.proposition,
          temperature: inter.temperature,
          photo_1:inter.photo_1.photo,
          photo_2:inter.photo_2.photo,
          photo_3:inter.photo_3.photo,
          photo_4:inter.photo_4.photo,
        })
        setImage_1_View(inter.photo_1.image)
        setImage_2_View(inter.photo_2.image)
        setImage_3_View(inter.photo_3.image)
        setImage_4_View(inter.photo_4.image)
      }
      setIsLoading(false)
    }
    catch (error){
      console.log(error)
    }
   
  }

  

  const loading =()=>{
    return(
      <SafeAreaView style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={'large'}/>
      </SafeAreaView>
    )
  }

  const renderForm = ()=>{
    return(
      <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
        <View style={{flex:1, marginTop:10}}>
          <Text style={styles.titrechamp}>Motif mise hors service</Text>
          <TextInput
                placeholder=".. ."
                placeholderTextColor="#777"
                autoCapitalize="sentences"
                numberOfLines={4}
                multiline={true}
                value={data.motifhorservice}
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_Motifhorservice(val)}

            />              
        </View>
        
        <View style={{flex:1}}>
                      
          <Text style={styles.titrechamp}>Continuité des enroulements en Ω</Text>
          <View style={{flex:1, flexDirection: 'row'}}>
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}> U1 - U2</Text>
                      <TextInput
                        placeholder="Ohm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        style={[styles.textinput, {}]}
                        value={data.continuite_U1_U2}
                        onChangeText={(val) => handle_Continuite_U1_U2(val)}
                      />  
                  </View>  
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}>V1 - V2</Text>
                      <TextInput
                        placeholder="Ohm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        value={data.continuite_V1_V2}
                        style={[styles.textinput, {}]}
                        onChangeText={(val) => handle_Continuite_V1_V2(val)}
                      />  
                  </View>  
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}>W1 - W2</Text>
                      <TextInput
                        placeholder="Ohm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        value={data.continuite_W1_W2}
                        style={[styles.textinput, {}]}
                        onChangeText={(val) => handle_Continuite_W1_W2(val)}
                      />  
                  </View>    
          </View>
                    
        </View>

        <View style={{flex:1, marginTop: 20}}>
          <Text style={styles.titrechamp}>Isolement entre bobine en MΩ</Text>
          <View style={{flex:1, flexDirection: 'row'}}>
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}> W2 - U2</Text>
                      <TextInput
                        placeholder="MegaOhm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        value={data.isolementbobine_W2_U2}
                        style={[styles.textinput, {}]}
                        onChangeText={(val) => handle_Isolementbobine_W2_U2(val)}
                      />  
                  </View>  
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}>W2 - V2</Text>
                      <TextInput
                        placeholder="MegaOhm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        value={data.isolementbobine_W2_V2}
                        style={[styles.textinput, {}]}
                        onChangeText={(val) => handle_Isolementbobine_W2_V2(val)}
                      />  
                  </View>  
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}>U2 - V2</Text>
                      <TextInput
                        placeholder="MegaOhm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        value={data.isolementbobine_U1_V2}
                        style={[styles.textinput, {}]}
                        onChangeText={(val) => handle_Isolementbobine_U1_V2(val)}
                      />  
                  </View>    
          </View>
                    
        </View>

        <View style={{flex:1, marginTop: 20}}>
          <Text style={styles.titrechamp}>Isolement entre les bobines et la masse en MΩ</Text>
          <View style={{flex:1, flexDirection: 'row'}}>
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}> U1 - M</Text>
                      <TextInput
                        placeholder="MegaOhm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        style={[styles.textinput, {}]}
                        value={data.isolementbobinemasse_U1_M}
                        onChangeText={(val) => handle_Isolementbobinemasse_U1_M(val)}
                      />  
                  </View>  
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}>V1 - M</Text>
                      <TextInput
                        placeholder="MegaOhm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        style={[styles.textinput, {}]}
                        value={data.isolementbobinemasse_V1_M}
                        onChangeText={(val) => handle_Isolementbobinemasse_V1_M(val)}
                      />  
                  </View>  
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}>W1 - M</Text>
                      <TextInput
                        placeholder="MegaOhm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        style={[styles.textinput, {}]}
                        value={data.isolementbobinemasse_W1_M}
                        onChangeText={(val) => handle_Isolementbobinemasse_W1_M(val)}
                      />  
                  </View>    
          </View>
                    
        </View>

        <View style={{flex:1, marginTop:10}}>
          <Text style={styles.titrechamp}>Proposition</Text>
          <TextInput
                placeholder="Notez ici vos propositions"
                placeholderTextColor="#777"
                autoCapitalize="sentences"
                numberOfLines={7}
                multiline={true}
                value={data.proposition}
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_Proposition(val)}

            />              
        </View>
        <View style={{flex:1}}>
          <Text style={styles.titrechamp}>Température</Text>
            <TextInput
              placeholder="°C"
              placeholderTextColor="#777"
              autoCapitalize="sentences"
              keyboardType='decimal-pad'
              style={[styles.textinput, {}]}
              value={data.temperature}
              onChangeText={(val) => handle_Temperature(val)}
            />  
        </View>

        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:10}}>
          <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}>
              {
                image_1_View?
                <View >
                    <Image style={{width:150, height:150, margin:10, borderRadius:8}} source={image_1_View}/>
                </View>                
                :
                null
              }
              
              <View style={{justifyContent: 'center', alignItems: 'center',margin: 10,flexDirection:'row'}}>
                <TouchableOpacity
                  onPress={()=> getImage_1_View()}
                >
                  <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon_camera.png")}/>
                </TouchableOpacity>
                <Text style={[styles.titrechamp, {marginLeft:20}]} >Image 1</Text>
              </View>
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}>
              {
                image_2_View?
                <View >
                    <Image style={{width:150, height:150, margin:10, borderRadius:8}} source={image_2_View}/>
                </View>                
                :
                null
              }
              
              <View style={{justifyContent: 'center', alignItems: 'center',margin: 10,flexDirection:'row'}}>
                <TouchableOpacity
                  onPress={()=> getImage_2_View()}
                >
                  <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon_camera.png")}/>
                </TouchableOpacity>
                <Text style={[styles.titrechamp, {marginLeft:20}]} >Image 2</Text>
              </View>
          </View>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:10}}>
          <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}>
              {
                image_3_View?
                <View >
                    <Image style={{width:150, height:150, margin:10, borderRadius:8}} source={image_3_View}/>
                </View>                
                :
                null
              }
              
              <View style={{justifyContent: 'center', alignItems: 'center',margin: 10,flexDirection:'row'}}>
                <TouchableOpacity
                  onPress={()=> getImage_3_View()}
                >
                  <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon_camera.png")}/>
                </TouchableOpacity>
                <Text style={[styles.titrechamp, {marginLeft:20}]} >Image 3</Text>
              </View>
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}>
              {
                image_4_View?
                <View >
                    <Image style={{width:150, height:150, margin:10, borderRadius:8}} source={image_4_View}/>
                </View>                
                :
                null
              }
              
              <View style={{justifyContent: 'center', alignItems: 'center',margin: 10,flexDirection:'row'}}>
                <TouchableOpacity
                  onPress={()=> getImage_4_View()}
                >
                  <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon_camera.png")}/>
                </TouchableOpacity>
                <Text style={[styles.titrechamp, {marginLeft:20}]} >Image 4</Text>
              </View>
          </View>
        </View>

        <View style={{flex:1, marginTop:10}}>
          <Text style={styles.titrechamp}>Observation generale</Text>
          <TextInput
                placeholder=".. ."
                placeholderTextColor="#777"
                autoCapitalize="sentences"
                numberOfLines={4}
                multiline={true}
                value={data.obsevervation_gene}
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_Observation_gen(val)}

            />              
        </View>

        <View style={{flex:1, marginTop:20}}>
            <Text style={styles.titrechamp}>Technicien</Text>

            <SelectDropdown
                data={dataTechnicien}
                rowTextStyle={{textAlign:'left'}}
                selectedRowTextStyle={{color:'#ED7524', fontWeight: '900', }}
                buttonStyle={{borderWidth:1,borderRadius:4, justifyContent:'center', flex: 1, width:'100%'}}
                // buttonTextStyle={{textAlign:'center', color:'#111'}}

                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    handle_Technicien(selectedItem.id)
                }}

                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem.username
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    // return { dataAtalier == item.atelier.id ?  item.nom_equipenent : null}
                    return item.username
                }}
            />    
        </View>

        <View style={{flex:1, marginTop:20}}>
          <Text style={styles.titrechamp}>superviseur</Text>

          <SelectDropdown
              data={dataSuperviseur}
              rowTextStyle={{textAlign:'left'}}
              selectedRowTextStyle={{color:'#ED7524', fontWeight: '900', }}
              buttonStyle={{borderWidth:1,borderRadius:4, justifyContent:'center', flex: 1, width:'100%'}}
              // buttonTextStyle={{textAlign:'center', color:'#111'}}

              onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  handle_superviseur(selectedItem.id)
              }}

              buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.username
              }}
              rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  // return { dataAtalier == item.atelier.id ?  item.nom_equipenent : null}
                  return item.username
              }}
          />    
        </View>

        <View style={{flexDirection: 'row', marginTop:25}}>
          <TouchableOpacity style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
              <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/annuler.png")}/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
            onPress={() => { fetchData_HS()}}
          >
              <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/enregistrer.png")}/>
          </TouchableOpacity>
          
        </View>
        <View>
            <TouchableOpacity 
                style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
                onPress={() => {localSave(moteurItem.moteur.item_moteur)}}
              >
                  <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/btn_local_save.png")}/>
              </TouchableOpacity>
          </View>
        
      </ScrollView>
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
      
        <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center',}}>
          <Text style={{fontSize: 20, color: '#316094', fontWeight: 'bold'}}>MOTEUR : </Text>
          <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold', marginLeft:15}}>{moteurItem.moteur.item_moteur}</Text>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop:10 , 
                      }}>
          <Text style={{fontSize: 16, color: '#111', fontWeight: 'bold'}}>
           Dans l'atelier {moteurItem.atelier !== undefined ?moteurItem.atelier.nom_atelier : null}</Text>
          <Text style={{fontSize: 16, color: '#111', fontWeight: 'bold'}}>
           Sur l'équiment {moteurItem.equipement !== undefined ? moteurItem.equipement.nom_equipenent : null}</Text>
        </View>
      
        <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
          <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>MISE HORS SERVICE</Text>
        </View>
      </View>

      {isLoading ? loading(): renderForm()}
          

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
    cat:{
        justifyContent: 'center', 
        alignSelf: 'center',
        width:300,
        backgroundColor: 'rgba(49, 96, 148, 0.37)',
        borderRadius:4,
        marginTop: 5

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

export default Form_HorserviceScreen;