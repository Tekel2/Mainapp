import React, { Component, useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { AuthContext } from '../../context/Authcontext';
import axios from 'axios';
import { baseUrlApi } from '../../API/urlbase';


const  Form_Installation = ({navigation, route}) => {

  const {userInfo,userToken} = useContext(AuthContext)
  const {moteurItem} = route.params
  const [isLoading, setIsLoading] = useState(true)
  const couplage = ["Etoile", "Triangle"]
  const superviseur = [{"Etoile":12,"id":55,nom:"tekeu"}, {"Triangle":15, "id":56,nom:"april"}]

  const [image_1, setImage_1] = useState('')
  const [image_2, setImage_2] = useState('')
  const [image_3, setImage_3] = useState('')
  const [image_4, setImage_4] = useState('')


  const [dataAtalier, setDataAtalier] = useState([])
  const [dataSuperviseur, setDataSuperviseur] = useState([])
  const [dataTechnicien, setDataTechnicien] = useState([])


  useEffect(() =>{
    getAtelier('atelier')
    getSuperviseur('equipement')
  },[])


  const getAtelier = async ( route, ) =>{

    try {
      setIsLoading(true)
      const response = await axios.get(`${baseUrlApi}/${route}/`, 
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `token ${userToken}`
            }
          },
        );
        // navigation.navigate('Equipement')
        const data = await response.data
        setDataAtalier(data)
        console.log("atelier : ", data)
        
        setIsLoading(false)


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
      console.log(error)
      // setIsloading(false)
      setIsLoading(false)


    }    
  }

  const getSuperviseur = async ( route, ) =>{

    try {
      setIsLoading(true)

      const response = await axios.get(`${baseUrlApi}/${route}/`, 
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `token ${userToken}`
            }
          },
        );
        // navigation.navigate('Equipement')
        const data = await response.data
        setDataSuperviseur(data)
        setIsLoading(false)
        console.log("superviseur : ", data)

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
      console.log(error)
      setIsLoading(false)

    }    
  }

  const getTechnicien = async ( route, ) =>{

    try {
      const response = await axios.get(`${baseUrlApi}/${route}/`, 
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `token ${userToken}`
            }
          },
        );
        // navigation.navigate('Equipement')
        const data = await response.data
        setDataTechnicien(data)

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
      console.log(error)
      // setIsloading(false)

    }    
  }


  const [data, setData] = React.useState({
    obsevervation_gene: '',
    atelier: '',
    equipement: '',
    ancienmoteur_item: '',
    motifremplacement: '',
    couplage: '',
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



    // secureTextEntry: true,
    // isValidUser: true,
    // isValidPassword: true,
});

const getImage_1 = () =>{
    const options = {
      storageOption : {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true
    };

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
      setImage_1(source)

      }
    })
  }

  const getImage_2 = () =>{
    const options = {
      storageOption : {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true
    };

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
      setImage_2(source)

      }
    })
  }
  const getImage_3 = () =>{
    const options = {
      storageOption : {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true
    };

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
      setImage_3(source)

      }
    })
  }
  const getImage_4 = () =>{
    const options = {
      storageOption : {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true
    };

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
      setImage_4(source)

      }
    })
  }


const handle_Obsevervation_gene = (val) => {
  if( val.trim().length >= 3 ) {
      setData({
          ...data,
          obsevervation_gene: val,
      });
  } else {
      setData({
          ...data,
          obsevervation_gene: val,
      });
  }
}
const handle_Atelier = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          atelier: val,
      });
  } else {
      setData({
          ...data,
          atelier: val,
      });
  }
}
const handle_Equipement = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          equipement: val,
      });
  } else {
      setData({
          ...data,
          equipement: val,
      });
  }
}
const handle_Ancienmoteur_item = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          ancienmoteur_item: val,
      });
  } else {
      setData({
          ...data,
          ancienmoteur_item: val,
      });
  }
}
const handle_Motifremplacement = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          motifremplacement: val,
      });
  } else {
      setData({
          ...data,
          motifremplacement: val,
      });
  }
}
const handle_Couplage = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          couplage: val,
      });
  } else {
      setData({
          ...data,
          couplage: val,
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

const resetAllTextInput = () => {
  setData({
      ...data,
      obsevervation_gene: '',
      atelier: '',
      equipement: '',
      ancienmoteur_item: '',
      motifremplacement: '',
      couplage: '',
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
  });

}

const fetchDataMoteur = async () => {
  console.log(datatofetch())
   
    try {
      const response = await axios.post(`${baseUrlApi}/api/moteur/`, 
      
      {
        create_by : userInfo.id,
        item_moteur : data.item,
        reference : data.reference,
        numeroserie : data.numeroserie,
        marque : data.marque,
        type_moteur : data.type_moteur,
        phase : data.phase,      
        frequence : data.frequence,      
        cosfi : data.cosfi,      
        rendement : data.rendement,      
        puissance : data.puissance,      
        tour_min : data.tour_min,      
        temperature_ambiante_user : data.temperature_ambiante_user, 
        tension_etoile : data.tension_etoile,
        tension_triangle : data.tension_triangle,      
        courant_triangle : data.courant_triangle,      
        courant_etoile : data.courant_etoile,
        poids : 30,
        indice_protection : data.indice_protection,
        install : false
        // datatofetch
      },
      {
        headers: {
          // "Accept":" */*",
          "Content-Type": "application/json",
          'Authorization': `token ${userToken}`
        }
      },
      );
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        
      } else {
        // throw new Error("An error has occurred");
        console.log(response.request)
      }
    } catch (error) {
      alert("An error has occurred");
      // setIsLoading(false);
      console.log(error)
    }


    
}





const saveDatatoServer = (data) => {
  console.log(data)
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
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold', marginLeft:15}}>{moteurItem.item_moteur}</Text>
          </View>
          
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>INSTALLATION</Text>
          </View>
        </View>

        <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Observation Général</Text>
            <TextInput
                  placeholder="Notez ici toutes vos observations avant tout action"
                  placeholderTextColor="#777"
                  autoCapitalize="words"
                  numberOfLines={7}
                  multiline={true}
                  onChangeText={(val) => handle_Obsevervation_gene(val)}
                            
                  style={[styles.textinput,styles.textinputmulti]}
              />              
          </View>

          

          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Atelier</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="words"
                style={[styles.textinput, {}]}
                onChangeText={(val) => handle_Atelier(val)}
              />  
          </View>
          <View style={{flex:1, marginTop: 20}}>
            <Text style={styles.titrechamp}>Equipement</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="words"
                style={[styles.textinput, {}]}
                onChangeText={(val) => handle_Equipement(val)}
              />  
          </View>
          <View style={{flex:1, marginTop: 20}}>
            <Text style={styles.titrechamp}>Item Ancien Moteur</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="words"
                style={[styles.textinput, {}]}
                onChangeText={(val) => handle_Ancienmoteur_item(val)}
              />  
          </View>
          <View style={{flex:1, marginTop: 20}}>
            <Text style={styles.titrechamp}>Motif de remplacement </Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="words"
                numberOfLines={3}
                multiline={true}
                // style={[styles.textinput, {}]}
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_Motifremplacement(val)}
              />  
          </View>
          
          <View style={{flex:1, marginTop:20}}>
            <Text style={styles.titrechamp}>Couplage</Text>

            <SelectDropdown
                data={dataAtalier}
                rowTextStyle={{textAlign:'left'}}
                selectedRowTextStyle={{color:'#ED7524', fontWeight: '900', }}
                buttonStyle={{borderWidth:1,borderRadius:4, justifyContent:'center', flex: 1, width:'100%'}}
                // buttonTextStyle={{textAlign:'center', color:'#111'}}

                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    handle_Couplage(selectedItem)
                }}

                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.nom_atelier
                }}
            />     

            {/* <View style={{}}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={styles.label}>Do you like React Native?</Text>
            </View>       */}
          </View>

          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Continuité des enroulements en Ω</Text>
            <View style={{flex:1, flexDirection: 'row'}}>
                   <View style={{flex:1}}>
                        <Text style={[styles.titrechamp, {textAlign:'center'}]}> U1 - U2</Text>
                        <TextInput
                          placeholder="Ohm"
                          placeholderTextColor="#777"
                          autoCapitalize="words"
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
                          autoCapitalize="words"
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
                          autoCapitalize="words"
                          keyboardType='decimal-pad'
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
                          autoCapitalize="words"
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
                          autoCapitalize="words"
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
                          autoCapitalize="words"
                          keyboardType='decimal-pad'
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
                          autoCapitalize="words"
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
                          autoCapitalize="words"
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
                          autoCapitalize="words"
                          keyboardType='decimal-pad'
                          style={[styles.textinput, {}]}
                          onChangeText={(val) => handle_Isolementbobinemasse_W1_M(val)}
                        />  
                   </View>    
            </View>
                      
          </View>
          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Température</Text>
              <TextInput
                placeholder="°C"
                placeholderTextColor="#777"
                autoCapitalize="words"
                keyboardType='decimal-pad'
                style={[styles.textinput, {}]}
                onChangeText={(val) => handle_Temperature(val)}
              />  
          </View>

          <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:10}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}>
                {
                  image_1?
                  <View >
                      <Image style={{width:150, height:150, margin:10, borderRadius:8}} source={image_1}/>
                  </View>                
                  :
                  null
                }
                
                <View style={{justifyContent: 'center', alignItems: 'center',margin: 10,flexDirection:'row'}}>
                  <TouchableOpacity
                    onPress={()=> getImage_1()}
                  >
                    <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon_camera.png")}/>
                  </TouchableOpacity>
                  <Text style={[styles.titrechamp, {marginLeft:20}]} >Image 1</Text>
                </View>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}>
                {
                  image_2?
                  <View >
                      <Image style={{width:150, height:150, margin:10, borderRadius:8}} source={image_2}/>
                  </View>                
                  :
                  null
                }
                
                <View style={{justifyContent: 'center', alignItems: 'center',margin: 10,flexDirection:'row'}}>
                  <TouchableOpacity
                    onPress={()=> getImage_2()}
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
                image_3?
                 <View >
                    <Image style={{width:150, height:150, margin:10, borderRadius:8}} source={image_3}/>
                </View>                
                :
                null
              }
              
              <View style={{justifyContent: 'center', alignItems: 'center',margin: 10,flexDirection:'row'}}>
                <TouchableOpacity
                  onPress={()=> getImage_3()}
                >
                  <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon_camera.png")}/>
                </TouchableOpacity>
                <Text style={[styles.titrechamp, {marginLeft:20}]} >Image 3</Text>
              </View>
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}>
              {
                image_4?
                 <View >
                    <Image style={{width:150, height:150, margin:10, borderRadius:8}} source={image_4}/>
                </View>                
                :
                null
              }
              
              <View style={{justifyContent: 'center', alignItems: 'center',margin: 10,flexDirection:'row'}}>
                <TouchableOpacity
                  onPress={()=> getImage_4()}
                >
                  <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon_camera.png")}/>
                </TouchableOpacity>
                <Text style={[styles.titrechamp, {marginLeft:20}]} >Image 4</Text>
              </View>
          </View>
        </View>

          
          <View style={{flex:1, marginTop:10}}>
            <Text style={styles.titrechamp}>Proposition</Text>
            <TextInput
                  placeholder="Notez ici vos propositions"
                  placeholderTextColor="#777"
                  autoCapitalize="words"
                  numberOfLines={7}
                  multiline={true}
                  style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_Proposition(val)}

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
              onPress={() => {saveDatatoServer( data )}}
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

export default Form_Installation;