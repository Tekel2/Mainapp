import React, { Component, useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput, Alert, PermissionsAndroid } from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CaracteristiqueScreen from './Moteur/CaracteristiqueScreen';
import { AuthContext } from '../context/Authcontext';
import axios from 'axios';
import { baseUrlApi } from '../API/urlbase';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import {setPreventives,setPreventiveID, setPlanningItem} from '../Reduxe/action'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Form_Inter_Prev_Screen = ({navigation,route}) => {

  const {dataItem} = route.params
  const {userInfo, access_token, logout} = useContext(AuthContext)

  const dispatch = useDispatch();
  const {preventives,planningItem}=useSelector(state =>state.preventiveReducer)


  const [checkBoxSerage, setCheckBoxSerage] = useState(false)
  const [checkBoxEquil, setCheckBoxEquil] = useState(false)
  const [image_1_View, setImage_1_View] = useState('')
  const [image_2_View, setImage_2_View] = useState('')
  const [image_3_View, setImage_3_View] = useState('')
  const [image_4_View, setImage_4_View] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [dataSuperviseur, setDataSuperviseur] = useState([])
  const [dataTechnicien, setDataTechnicien] = useState([])

  const [modalvisible, setmodalVisible] = useState(false)
  const [modalitem, setModalitem] = useState(false)
  // const [isloading, setIsloading] = useState(false)

  const [data, setData] = React.useState({
    obsevervation_gene_av: '',
    obsevervation_gene_ap: '',
    obsevervation_conectique: '',
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
    idTech:0,
    idsuperv:0,
    photo_1:{},
    photo_2:{},
    photo_3:{},
    photo_4:{},

});

const handleInput =(input, val)=>{
  if (val.trim().length >= 3){
    setData({
      ...data,
      [input]:val
    })
  }
  else if(typeof(parseFloat(data[input].replace(/,/g, ''))) === "float" ){
    setData({
      ...data,
      [input]:val
    })
  }
}

  

  useEffect(() =>{
    getSuperviseur('superviceur_list')
    getTechnicien('technicien_list')
    // getLocalPreventive()
    getStoredata(dataItem.item_planning)
    // removeItemValue('Preventive')
    // console.log(dataItem.item_planning)

  },[])


  const loading =()=>{
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'}/>
      </View>
    )
  }

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
        alert("Vous n'est pas authorisé")
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

  const getTechnicien = async ( route, ) =>{

    try {
      setIsLoading(true)
      const response = await axios.get(`${baseUrlApi}/${route}/`, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
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
        alert("Vous n'est pas authorisé")
      }
      else if (error.response?.status === 404){
        alert("Aucune corespondance a votre demande")
      }
      // alert("An error has occurred");
      console.log(error,'************************')
      setIsLoading(false)

    }    
  }

  // const datatofetch = () => {
  //   return {
  //     create_by: userInfo.id,
  //     moteur : dataItem.moteur.id,
  //     planning : dataItem.id,
  //     temperature : parseFloat(data.temperature.replace(/,/g, '')),
  //     observation_avant : data.obsevervation_gene_av,
  //     observation_apres : data.obsevervation_gene_ap,
  //     proposition : data.proposition,
  //     observation_conectique : data.obsevervation_conectique,
  //     continuite_u1_U2 : parseFloat(data.continuite_U1_U2.replace(/,/g, '')),// parseFloat('1,022.55'.replace(/,/g, ''))
  //     continuite_v1_v2 : parseFloat(data.continuite_V1_V2.replace(/,/g, '')),
  //     continuite_w1_w2 : parseFloat(data.continuite_W1_W2.replace(/,/g, '')),
  //     isolement_bobine_w2_u2 : parseFloat(data.isolementbobine_W2_U2.replace(/,/g, '')),
  //     isolement_bobine_w2_v2 : parseFloat(data.isolementbobine_W2_V2.replace(/,/g, '')),
  //     isolement_bobine_u2_v2 : parseFloat(data.isolementbobine_U1_V2.replace(/,/g, '')),
  //     isolement_bobine_masse_u1_m : parseFloat(data.isolementbobinemasse_U1_M.replace(/,/g, '')),
  //     isolement_bobine_masse_v1_m : parseFloat(data.isolementbobinemasse_V1_M.replace(/,/g, '')),
  //     isolement_bobine_masse_w1_m : parseFloat(data.isolementbobinemasse_W1_M.replace(/,/g, '')),
  //     serage : checkBoxSerage,
  //     equilibrage : checkBoxEquil,
  //     photo_1 : data.photo_1,
  //     photo_2 : data.photo_2,
  //     photo_3 : data.photo_3,
  //     photo_4 : data.photo_4,
  //     technicien : data.idTech,
  //     superviceur : data.idsuperv
  //   }
  // }

  const postData = async (route ) =>{

    try{
      const datatofetch=new FormData();

      datatofetch.append('create_by', userInfo.id)
      datatofetch.append('moteur' , dataItem.moteur.id)
      datatofetch.append('planning', dataItem.id)
      datatofetch.append('temperature', parseFloat(data.temperature.replace(/,/g, '')))
      datatofetch.append('observation_avant', data.obsevervation_gene_av)
      datatofetch.append('observation_apres', data.obsevervation_gene_ap)
      datatofetch.append('proposition',  data.proposition,)
      datatofetch.append('observation_conectique', data.obsevervation_conectique,)
      datatofetch.append('continuite_u1_U2', parseFloat(data.continuite_U1_U2.replace(/,/g, '')))
      datatofetch.append('continuite_v1_v2', parseFloat(data.continuite_V1_V2.replace(/,/g, '')))
      datatofetch.append('continuite_w1_w2', parseFloat(data.continuite_W1_W2.replace(/,/g, '')))
      datatofetch.append('isolement_bobine_w2_u2', parseFloat(data.isolementbobine_W2_U2.replace(/,/g, '')))
      datatofetch.append('isolement_bobine_w2_v2', parseFloat(data.isolementbobine_W2_V2.replace(/,/g, '')))
      datatofetch.append('isolement_bobine_u2_v2', parseFloat(data.isolementbobine_U1_V2.replace(/,/g, '')))
      datatofetch.append('isolement_bobine_masse_u1_m', parseFloat(data.isolementbobinemasse_U1_M.replace(/,/g, '')))
      datatofetch.append('isolement_bobine_masse_v1_m', parseFloat(data.isolementbobinemasse_V1_M.replace(/,/g, '')))
      datatofetch.append('isolement_bobine_masse_w1_m', parseFloat(data.isolementbobinemasse_W1_M.replace(/,/g, '')))
      datatofetch.append('serage', checkBoxSerage)
      datatofetch.append('equilibrage', checkBoxEquil)
      datatofetch.append('photo_1', data.photo_1)
      datatofetch.append('photo_2', data.photo_2)
      datatofetch.append('photo_3', data.photo_3)
      datatofetch.append('photo_4', data.photo_4)
      datatofetch.append('technicien', data.idTech)
      datatofetch.append('superviceur', data.idsuperv)


      try {
        setIsLoading(true)
        const response = await axios.post(`${baseUrlApi}/${route}/`,datatofetch,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `JWT ${access_token}`
              }
            },
          );
        
        setIsLoading(false)
        removeItemValue(dataItem.item_planning)
        navigation.navigate('Home')

      } catch (error) {
        if(!error.response){
        setIsLoading(false)
        alert("Aucune reponse du serveur");
        }
        else if (error.response?.status === 400){
        setIsLoading(false)
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
    catch (error) {
      console.log(error.TypeError)
      if(error.TypeError === undefined){
        setIsLoading(false)
        alert("Certaines informations ne sont pas renseignées.");
        }
    }
  }

  const  removeItemValue= async(key) =>{
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
  }

  const localSave = async (key)=>{
    try{
      var dataPreventive = {
        ID : dataItem.item_planning,
        temperature : data.temperature,
        observation_avant : data.obsevervation_gene_av,
        observation_apres : data.obsevervation_gene_ap,
        proposition : data.proposition,
        observation_conectique : data.obsevervation_conectique,
        continuite_u1_U2 : data.continuite_U1_U2,// '1,022.55'
        continuite_v1_v2 : data.continuite_V1_V2,
        continuite_w1_w2 : data.continuite_W1_W2,
        isolement_bobine_w2_u2 : data.isolementbobine_W2_U2,
        isolement_bobine_w2_v2 : data.isolementbobine_W2_V2,
        isolement_bobine_u2_v2 : data.isolementbobine_U1_V2,
        isolement_bobine_masse_u1_m : data.isolementbobinemasse_U1_M,
        isolement_bobine_masse_v1_m : data.isolementbobinemasse_V1_M,
        isolement_bobine_masse_w1_m : data.isolementbobinemasse_W1_M,
        serage : checkBoxSerage,
        equilibrage : checkBoxEquil,
        photo_1 : {'photo':data.photo_1, 'image':image_1_View},
        photo_2 : {'photo':data.photo_2, 'image':image_2_View},
        photo_3 : {'photo':data.photo_3, 'image':image_3_View},
        photo_4 : {'photo':data.photo_4, 'image':image_4_View},
        
        technicien : data.idTech,
        superviceur : data.idsuperv
      }

      AsyncStorage.setItem(key, JSON.stringify(dataPreventive))
      .then(()=>{
        Alert.alert('Intervention sauvergarder localement')
        navigation.goBack();
      })
    } catch(error){
      console.log(error)
    }
  }

  const getStoredata =async(key)=>{
    setIsLoading(true)
    try{
      const Preventive = JSON.parse(await AsyncStorage.getItem(key));
      
      if (Preventive){
        setData({
          ...data,
          obsevervation_gene_av: Preventive.observation_avant,
          obsevervation_gene_ap: Preventive.observation_apres,
          obsevervation_conectique: Preventive.observation_conectique,
          continuite_U1_U2: Preventive.continuite_u1_U2,
          continuite_V1_V2: Preventive.continuite_V1_V2,
          continuite_W1_W2: Preventive.continuite_w1_w2,
          isolementbobine_W2_U2: Preventive.isolement_bobine_w2_u2,
          isolementbobine_W2_V2: Preventive.isolement_bobine_w2_v2,
          isolementbobine_U1_V2: Preventive.isolement_bobine_u2_v2,
          isolementbobinemasse_U1_M: Preventive.isolement_bobine_masse_u1_m,
          isolementbobinemasse_V1_M: Preventive.isolement_bobine_masse_v1_m,
          isolementbobinemasse_W1_M: Preventive.isolement_bobine_masse_w1_m,
          proposition: Preventive.proposition,
          temperature: Preventive.temperature,
          photo_1:Preventive.photo_1.photo,
          photo_2:Preventive.photo_2.photo,
          photo_3:Preventive.photo_3.photo,
          photo_4:Preventive.photo_4.photo,
        })

        setCheckBoxSerage(Preventive.serage)
        setCheckBoxEquil(Preventive.equilibrage)
        setImage_1_View(Preventive.photo_1.image)
        setImage_2_View(Preventive.photo_2.image)
        setImage_3_View(Preventive.photo_3.image)
        setImage_4_View(Preventive.photo_4.image)
      }
      setIsLoading(false)
    }
    catch (error){
      console.log(error)
    }
   
  }



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


  const toggleSerage =() =>{
    setCheckBoxSerage(!checkBoxSerage)
  }

  const iconeSerage =()=>{
    return(
      <View>
        {checkBoxSerage ? 
          <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/icon_check_true.png")}/>
          :
          <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/icon_check_false.png")}/>
        }
      </View>
    )
  }

  const toggleEquilibrage =() =>{
    setCheckBoxEquil(!checkBoxEquil)
  }

  const iconeEquilibrage =()=>{
    return(
      <View>
        {checkBoxEquil ? 
          <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/icon_check_true.png")}/>
          :
          <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/icon_check_false.png")}/>
        }
      </View>
    )
  }

const handle_Obsevervation_gene_av = (val) => {
  if( val.trim().length >= 3 ) {
      setData({
          ...data,
          obsevervation_gene_av: val,
      });
  } else {
      setData({
          ...data,
          obsevervation_gene_av: val,
      });
  }
}
const handle_Obsevervation_gene_ap = (val) => {
  if( val.trim().length >= 3 ) {
      setData({
          ...data,
          obsevervation_gene_ap: val,
      });
  } else {
      setData({
          ...data,
          obsevervation_gene_ap: val,
      });
  }
}
const handle_Obsevervation_conectique = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          obsevervation_conectique: val,
      });
  } else {
      setData({
          ...data,
          obsevervation_conectique: val,
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


  const setLocalPreventive =()=>{

  }


useEffect(()=>{
  // console.log(dataItem)
})

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

              
                <CaracteristiqueScreen/>
              
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

  const renderForm=()=>{
    return(
      <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
        <View style={{flex:1}}>
          <Text style={styles.titrechamp}>Observation Général avant</Text>
          <TextInput
                placeholder="Notez ici toutes vos observations avant tout action"
                placeholderTextColor="#777"
                autoCapitalize="sentences"
                numberOfLines={7}
                multiline={true}           
                value={data.obsevervation_gene_av}       
                style={[styles.textinput,styles.textinputmulti]}
                // onChangeText={(val) => handleInput(data.obsevervation_gene_av,val)}
                onChangeText={(val) => handle_Obsevervation_gene_av(val)}

            />              
        </View>
        <View style={{flex:1}}>
          <Text style={styles.titrechamp}>Observation de la connectique</Text>
          <TextInput
                placeholder="Notez ici une description de la panne"
                placeholderTextColor="#777"
                autoCapitalize="sentences"
                numberOfLines={7}
                multiline={true}
                style={[styles.textinput,styles.textinputmulti]}
                value={data.des}
                onChangeText={(val) => handle_Obsevervation_conectique(val)}
                // onChangeText={(val) => handleInput(data.obsevervation_conectique,val)}

            />              
        </View>

        <View style={{flex:1}}>
          <Text style={styles.titrechamp}>Continuité des enroulements</Text>
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
                        
                        // onChangeText={(val) => handleInput(data.continuite_U1_U2,val)}

                      />  
                  </View>  
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}>V1 - V2</Text>
                      <TextInput
                        placeholder="Ohm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        style={[styles.textinput, {}]}
                        value={data.continuite_V1_V2}
                        // onChangeText={(val) => handleInput(data.continuite_V1_V2,val)}
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
                        style={[styles.textinput, {}]}
                        value={data.continuite_W1_W2}
                        // onChangeText={(val) => handleInput(data.continuite_W1_W2,val)}
                        onChangeText={(val) => handle_Continuite_W1_W2(val)}
                      />  
                  </View>    
          </View>
                    
        </View>

        <View style={{flex:1, marginTop: 20}}>
          <Text style={styles.titrechamp}>Isolement entre bobine</Text>
          <View style={{flex:1, flexDirection: 'row'}}>
                  <View style={{flex:1}}>
                      <Text style={[styles.titrechamp, {textAlign:'center'}]}> W2 - U2</Text>
                      <TextInput
                        value={data.isolementbobine_W2_U2}
                        placeholder="MegaOhm"
                        placeholderTextColor="#777"
                        autoCapitalize="sentences"
                        keyboardType='decimal-pad'
                        style={[styles.textinput, {}]}
                        // onChangeText={(val) => handleInput(data.isolementbobine_W2_U2,val)}
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
                        style={[styles.textinput, {}]}
                        value={data.isolementbobine_W2_V2}
                        // onChangeText={(val) => handleInput(data.isolementbobine_W2_V2,val)}
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
                        style={[styles.textinput, {}]}
                        value={data.isolementbobine_U1_V2}
                        // onChangeText={(val) => handleInput(data.isolementbobine_U1_V2,val)}
                        onChangeText={(val) => handle_Isolementbobine_U1_V2(val)}
                      />  
                  </View>    
          </View>
                    
        </View>

        <View style={{flex:1, marginTop: 20}}>
          <Text style={styles.titrechamp}>Isolement entre les bobines et la masse</Text>
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
                        // onChangeText={(val) => handleInput(data.isolementbobinemasse_U1_M,val)}
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
                        // onChangeText={(val) => handleInput(data.isolementbobinemasse_V1_M,val)}
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
                        // onChangeText={(val) => handleInput(data.isolementbobinemasse_W1_M,val)}
                        onChangeText={(val) => handle_Isolementbobinemasse_W1_M(val)}
                      />  
                  </View>    
          </View>
                    
        </View>

        <View style={{flex:1, marginTop: 20}}>
          <Text style={styles.titrechamp}>Température</Text>
            <TextInput
              placeholder="°C"
              placeholderTextColor="#777"
              autoCapitalize="sentences"
              keyboardType='decimal-pad'
              style={[styles.textinput, {}]}
              value={data.temperature}
              // onChangeText={(val) => handleInput(data.temperature,val)}
              onChangeText={(val) => handle_Temperature(val)}
            />  
        </View>

        <View style={{flex:1,  flexDirection: 'row', alignItems:'center', marginTop:10}}>
          <Text style={[styles.titrechamp, {marginRight: 10}]}>Sérage</Text>
          <TouchableOpacity style={{}} onPress={() =>{toggleSerage()}}>
              {iconeSerage()}
          </TouchableOpacity> 
        </View>

        <View style={{flex:1,  flexDirection: 'row', alignItems:'center', marginTop:10}}>
          <Text style={[styles.titrechamp, {marginRight: 10}]}>Equilibrage Moteur </Text>
          <TouchableOpacity style={{}} onPress={() =>{toggleEquilibrage()}}>
              {iconeEquilibrage()}
          </TouchableOpacity> 
        </View>

        <View style={{flex:1,marginTop:20}}>
          <Text style={styles.titrechamp}>Observation général après</Text>
          <TextInput
                placeholder="Notez ici vos observations"
                placeholderTextColor="#777"
                autoCapitalize="sentences"
                numberOfLines={7}
                multiline={true}
                style={[styles.textinput,styles.textinputmulti]}
                value={data.obsevervation_gene_ap}
                // onChangeText={(val) => handleInput(data.obsevervation_gene_ap,val)}
                onChangeText={(val) => handle_Obsevervation_gene_ap(val)}

            />              
        </View>

        {/* <View style={{flex:1,  flexDirection: 'row', alignItems:'center'}}>
          <Text style={[styles.titrechamp, {marginRight: 10}]}>Sérage</Text>
          <TouchableOpacity style={{}} onPress={() =>{toggleSerage()}}>
              {iconeSerage()}
          </TouchableOpacity> 
        </View>

        <View style={{flex:1,  flexDirection: 'row', alignItems:'center', marginTop:10}}>
          <Text style={[styles.titrechamp, {marginRight: 10}]}>Equilibrage Moteur </Text>
          <TouchableOpacity style={{}} onPress={() =>{toggleEquilibrage()}}>
              {iconeEquilibrage()}
          </TouchableOpacity> 
        </View> */}
        
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
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/icon_camera.png")}/>
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
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/icon_camera.png")}/>
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
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/icon_camera.png")}/>
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
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/icon_camera.png")}/>
              </TouchableOpacity>
              <Text style={[styles.titrechamp, {marginLeft:20}]} >Image 4</Text>
            </View>
        </View>
      </View>
      

        <View style={{flex:1,marginTop:10}}>
          <Text style={styles.titrechamp}>Proposition</Text>
          <TextInput
                placeholder="Notez ici vos propositions"
                placeholderTextColor="#777"
                autoCapitalize="sentences"
                numberOfLines={7}
                multiline={true}
                style={[styles.textinput,styles.textinputmulti]}
                value={data.proposition}
                
                // onChangeText={(val) => handleInput(data.proposition,val)}
                onChangeText={(val) => handle_Proposition(val)}
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
              // defaultValue={}

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


        <View style={{flexDirection: 'row', marginTop:10}}>
          <TouchableOpacity 
          style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
          onPress={()=>{navigation.navigate('Home')}}
          >
              <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/annuler.png")}/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
            onPress={() => {postData('preventive')}}
          >
              <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/enregistrer.png")}/>
          </TouchableOpacity>
          
        </View>
        <View>
          <TouchableOpacity 
              style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
              onPress={() => {localSave(dataItem.item_planning)}}
            >
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/btn_local_save.png")}/>
            </TouchableOpacity>
        </View>
        {viewModal(modalitem)}
        
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
              <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
          </View>
      
        <View style={{flexDirection: 'row', justifyContent: 'center',}}>
          <Text style={{fontSize: 20, color: '#316094', fontWeight: 'bold'}}>MOTEUR : </Text>
          <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold', marginLeft:15}}>{dataItem.moteur.item_moteur}</Text>
          <TouchableOpacity
            onPress={() => {
                            // setModalitem(item)
                            setmodalVisible(true)
                        }}
          >
            <Text style={{fontSize: 20, color: '#ED7524', 
                          fontWeight: 'bold', marginLeft:15,
                          // borderWidth: 1.2,
                          borderRadius:8,
                          paddingHorizontal: 10,
                          paddingVertical:2,
                          backgroundColor:'#316094',
                          }}>Détails</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop:10 , 
                      }}>
          <Text style={{fontSize: 16, color: '#111', fontWeight: 'bold'}}> Atelier : {dataItem.atelier.nom_atelier}</Text>
          <Text style={{fontSize: 16, color: '#111', fontWeight: 'bold'}}> Equipement : {dataItem.equipement.nom_equipenent}</Text>
        </View>
      
        <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
          <Text style={[styles.etatprovenance, {color: '#316094',width: '100%', marginLeft:15,}]}>
          INTERVENTION PREVENTIVE PROGRAMMée</Text>
        </View>
      </View>
      
      { !isLoading ? renderForm() : loading()}
      
          

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
        fontSize: 18, 
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
      }
  
    

   
   
  });

export default Form_Inter_Prev_Screen;