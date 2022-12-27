import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput, PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
// import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { baseUrlApi } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';



const Formreparation =  ({route, navigation})=> {
 
  
  const {moteurItem} = route.params
  const {userInfo,access_token} = useContext(AuthContext)


  const [image_1_View, setImage_1_View] = useState('')
  const [image_2_View, setImage_2_View] = useState('')
  const [dateSortie , setDatestSortie] = useState(null)
  const [isDatePickerVisibleSortie, setDatePickerVisibilitySortie] = useState(false);
  const [isLoading, setIsloading] = useState(false);


  const [data, setData] = React.useState({
    moteur_hs : "",
    date_sortie : "",
    photo_moteur:{},
    photo_bon_sortie:{},
    contact_prestatire:'',
    prestatire:'',
    motif_reparation: ''

});

const showDatePickerSortie = () => {
  setDatePickerVisibilitySortie(true);
};

const hideDatePickerSortie = () => {
  setDatePickerVisibilitySortie(false);
};

const handleConfirmSortie = (jour) => {
  setDatestSortie(jour)
  hideDatePickerSortie();
};

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


const handle_handle_motif = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          motif_reparation: val,
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
          photo_moteur: { uri: localUri, name: filename, type }
          
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
          photo_bon_sortie: { uri: localUri, name: filename, type }
          
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
useEffect(()=>{
  // console.log(moteurItem)
})



const postDataRepatation = async (data) => {
  const datatofetch = new FormData();
    datatofetch.append('moteur_hs',moteurItem.moteur.id)
    datatofetch.append('create_by',userInfo.id)
    datatofetch.append('date_sortie',dateSortie)
    datatofetch.append('motif_reparation',data.motif_reparation)
    datatofetch.append('prestatire',data.prestatire)
    datatofetch.append('contact_prestatire',data.contact_prestatire)
    datatofetch.append('photo_bon_sortie',data.photo_bon_sortie)
    datatofetch.append('photo_moteur',data.photo_moteur)


    try {
      setIsloading(true)
      const response = await axios.post(`${baseUrlApi}/reparations/`,datatofetch, 
      
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
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Nom Prestataire</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="characters"
                style={[styles.textinput, {}]}
                onChangeText={(val) => handle_prestatire(val)}
              />  
          </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Contact Prestataire</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                keyboardType='phone-pad'
                // autoCapitalize=""
                style={[styles.textinput, {}]}
                onChangeText={(val) => handle_contact_prestatire(val)}
              />  
          </View>
          

          <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
               
                <TouchableOpacity
                    onPress={showDatePickerSortie}
                    style={{flex:2, fontSize:18, color:'#000'}}
                >
                    <Text style={{ color:'#000', fontSize:22}}>Date de Sortie </Text>

                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisibleSortie}
                    mode="date"
                    onConfirm={handleConfirmSortie}
                    onCancel={hideDatePickerSortie}
                />
                <Text style={{flex:2, fontSize:20, color:'#0A233E', flexWrap:'wrap', fontWeight:"bold"}}>
                    {dateSortie ? dateSortie.toLocaleDateString() : '- - -'}

                </Text>

            </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Motif répartion</Text>
            <TextInput
                  placeholder="Notez ici toutes vos observations avant tout action"
                  placeholderTextColor="#777"
                  autoCapitalize="words"
                  numberOfLines={7}
                  multiline={true}
                  onChangeText={(val) => handle_handle_motif(val)}
                            
                  style={[styles.textinput,styles.textinputmulti]}
              />              
          </View> 

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
                  <Text style={[styles.titrechamp, {marginLeft:20}]} >Image Moteur</Text>
                </View>
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}>
                {
                  image_2_View?
                  <View >
                      <Image style={{width:150, height:150, margin:10, borderRadius:8}} source={image_1_View}/>
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
                  <Text style={[styles.titrechamp, {marginLeft:20}]} >Image Bon de sortie</Text>
                </View>
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

export default Formreparation;