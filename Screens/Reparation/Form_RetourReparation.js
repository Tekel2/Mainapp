import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput, PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { baseUrlApi } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';



const Form_RetourReparation =  ({route, navigation})=> {
 
  
  const {dataItem} = route.params
  const {userInfo,access_token, logout} = useContext(AuthContext)
  const [checkBoxTestValide, setCheckBoxTestValide] = useState(false)

  const [dataSuperviseur, setDataSuperviseur] = useState([])
  const [dataTechnicien, setDataTechnicien] = useState([])
  const [image_1_View, setImage_1_View] = useState('')
  const [image_2_View, setImage_2_View] = useState('')
  const [image_3_View, setImage_3_View] = useState('')
  const [image_4_View, setImage_4_View] = useState('')
  const [dateRetour , setDatestRetour] = useState(null)
  const [isDatePickerVisibleRetour, setDatePickerVisibilityRetour] = useState(false);
  const [isLoading, setIsloading] = useState(false);


  const [data, setData] = React.useState({
    
    date_Retour : "",
    solutions:'',
    motif_reparation: '',
    continuite_U1_U2: 0.0,
    continuite_V1_V2: 0.0,
    continuite_W1_W2: 0.0,
    isolementbobine_W2_U2: 0.0,
    isolementbobine_W2_V2: 0.0,
    isolementbobine_U1_V2: 0.0,
    isolementbobinemasse_U1_M: 0.0,
    isolementbobinemasse_V1_M: 0.0,
    isolementbobinemasse_W1_M: 0.0,
    observation_gen:'',
    idTech: 0,
    idsuperv:0,
    photo_1:{},
    photo_2:{},
    photo_3:{},
    photo_4:{},

});

useEffect(() =>{
  console.log(access_token)
  getSuperviseur('superviceur_list')
  getTechnicien('technicien_list')

},[])



// liste de tous les supervisseurs de la plateforme
const getSuperviseur = async ( route, ) =>{

  try {
    setIsloading(true)

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
      setIsloading(false)
      // console.log("superviseur : ", data)

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
    console.log(error)
    setIsloading(false)

  }    
}
// liste de tous les techniciens de la plateforme
const getTechnicien = async ( route, ) =>{

  try {
    setIsloading(true)
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
      setIsloading(false)

  } catch (error) {
    if(!error.response){
      alert("Aucune reponse du serveur");
    }
    else if (error.response?.status === 500){
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
    console.log(error)
    setIsloading(false)

  }    
}


const showDatePickerRetour = () => {
  setDatePickerVisibilityRetour(true);
};

const hideDatePickerRetour = () => {
  setDatePickerVisibilityRetour(false);
};

const handleConfirmRetour = (jour) => {
  setDatestRetour(jour)
  hideDatePickerRetour();
};

const toggleTestValide =() =>{
  setCheckBoxTestValide(!checkBoxTestValide)
}
const iconeTestValide =()=>{
  return(
    <View>
      {checkBoxTestValide ? 
        <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon_check_true.png")}/>
        :
        <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon_check_false.png")}/>
      }
    </View>
  )
}

const handle_contact_prestatire = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          contact_prestatire: val,
      });
  }
  
}

const handle_prestatire = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          prestatire: val,
      });
    }
}

const handle_solution = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          solutions: val,
      });
    }
}

const handle_observatio_gen = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          observation_gen: val,
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


useEffect(()=>{
  // console.log(moteurItem)
})



const postDataRepatation = async (data) => {
  const datatofetch = new FormData();
    datatofetch.append('raparation',dataItem.id)
    datatofetch.append('create_by',userInfo.id)
    datatofetch.append('date_Retour',dateRetour )
    datatofetch.append('continuite_u1_U2',parseFloat(data.continuite_U1_U2.replace(/,/g, '')))
    datatofetch.append('continuite_v1_v2', parseFloat(data.continuite_V1_V2.replace(/,/g, '')))
    datatofetch.append('continuite_w1_w2', parseFloat(data.continuite_W1_W2.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_w2_u2', parseFloat(data.isolementbobine_W2_U2.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_w2_v2', parseFloat(data.isolementbobine_W2_V2.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_u2_v2',parseFloat(data.isolementbobine_U1_V2.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_masse_u1_m',parseFloat(data.isolementbobinemasse_U1_M.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_masse_v1_m',parseFloat(data.isolementbobinemasse_V1_M.replace(/,/g, '')))
    datatofetch.append('isolement_bobine_masse_w1_m',parseFloat(data.isolementbobinemasse_W1_M.replace(/,/g, '')))
    datatofetch.append('observation_retour',data.observation_gen)
    datatofetch.append('solution',data.solutions)    
    datatofetch.append('photo_1',data.photo_1)
    datatofetch.append('photo_2',data.photo_2)
    datatofetch.append('photo_3',data.photo_3)
    datatofetch.append('photo_4',data.photo_4)
    datatofetch.append('technicien',data.idTech)
    datatofetch.append('superviceur',data.idsuperv)
    datatofetch.append('test_avide',checkBoxTestValide)


    try {
      setIsloading(true)
      const response = await axios.post(`${baseUrlApi}/rt-reparations/`,datatofetch, 
      
      {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `JWT ${access_token}`
        }
      },
      );

      navigation.navigate('Reparation')
      
    } catch (error) {
      alert("An error has occurred");
      setIsloading(false);
      console.log(error)
    }


}





const loading=()=>{
  return(
    <View style={{justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
  )
}

const renderForm =()=>{
  return(
    <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
         
          {/* <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Item Moteur</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="words"
                style={[styles.textinput, {}]}
                onChangeText={(val) => handle_ItemMoteur(val)}
              />  
              <Text style={{fontStyle:'italic', fontSize:15, color:'#000'}}>(Doit être un numero article de SAP)</Text>
          </View> */}
                 
          

          <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
               
                <TouchableOpacity
                    onPress={showDatePickerRetour}
                    style={{flex:2, fontSize:18, color:'#000'}}
                >
                    <Text style={{ color:'#000', fontSize:22}}>Date de Retour </Text>

                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisibleRetour}
                    mode="date"
                    onConfirm={handleConfirmRetour}
                    onCancel={hideDatePickerRetour}
                />
                <Text style={{flex:2, fontSize:20, borderWidth:1,borderRadius:4, paddingHorizontal:5, color:'#0A233E', flexWrap:'wrap', fontWeight:"bold"}}>
                    {dateRetour ? dateRetour.toLocaleDateString() : '-/ -/ -'}

                </Text>

            </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Solution apportée</Text>
            <TextInput
                  placeholder="Notez ici toutes vos observations avant tout action"
                  placeholderTextColor="#777"
                  autoCapitalize="words"
                  numberOfLines={7}
                  multiline={true}
                  onChangeText={(val) => handle_solution(val)}
                            
                  style={[styles.textinput,styles.textinputmulti]}
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
                          style={[styles.textinput, {}]}
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
                          placeholder="MegaOhm"
                          placeholderTextColor="#777"
                          autoCapitalize="sentences"
                          keyboardType='decimal-pad'
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
                          style={[styles.textinput, {}]}
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
                          onChangeText={(val) => handle_Isolementbobinemasse_W1_M(val)}
                        />  
                   </View>    
            </View>
                      
          </View>

          <View style={{flex:1,  flexDirection: 'row', alignItems:'center', marginTop:10}}>
            <Text style={[styles.titrechamp, {marginRight: 10}]}>Test à vide Validé</Text>
            <TouchableOpacity style={{}} onPress={() =>{toggleTestValide()}}>
                {iconeTestValide()}
            </TouchableOpacity> 
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

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Observation général</Text>
            <TextInput
                  placeholder="Notez ici toutes vos observations"
                  placeholderTextColor="#777"
                  autoCapitalize="words"
                  numberOfLines={7}
                  multiline={true}
                  onChangeText={(val) => handle_observatio_gen(val)}
                            
                  style={[styles.textinput,styles.textinputmulti]}
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
            <TouchableOpacity 
              style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
              onPress={() => {resetAllTextInput()}}

              >
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/annuler.png")}/>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
              onPress={() => {postDataRepatation( data )}}
              >
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/enregistrer.png")}/>
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
        
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>Mise en Réparation</Text>
          </View>
        </View>

        {isLoading ? loading() : renderForm()}

        
           

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
    //   marginBottom: 30, 
      textAlignVertical: 'top', 
      fontSize: 16, 
      backgroundColor:'#eee', 
      fontSize: 18,
      padding:5,
      }
  
    

   
   
  });

export default Form_RetourReparation;