import React, { Component, useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import { AuthContext } from '../../context/Authcontext';
// import axios from "axios";
import axios from '../../API/config-axiox';
import { baseUrlApi } from '../../API/urlbase';

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

// const baseUrl = "http://192.168.203.30:8000";

function Form_New_Moteur (props) {
  const {userInfo,access_token, logout} = useContext(AuthContext)
  const [csrfToken, setCsrfToken] = useState(null)

  const couplage = ["Etoile", "Triangle"]

  const [data, setData] = React.useState({
    item : "",
    reference : "",
    numeroserie : "",
    marque : "",
    type_moteur : "" ,     
    phase : ""      ,
    frequence : 0,
    cosfi : 0,      
    rendement : 0.0,      
    puissance : 0,      
    tour_min : 0,      
    temperature_ambiante_user : 0,      
    tension_etoile : 0,
    tension_triangle : 0,
    courant_triangle : 0,      
    courant_etoile : 0, 
    indice_protection : 0,
    poids : 0,
});


const handle_poids = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          poids: val,
      });
  } else {
      setData({
          ...data,
          poids: val,
      });
  }
}

const handle_input = (input, val, )=>{
  if( val.trim().length >= 5 ) {
    setData({
        ...data,
        [input]: val,
    });
} else {
    setData({
        ...data,
        [input]: val,
    });
}
}

const handle_ItemMoteur = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          item: val,
      });
  } else {
      setData({
          ...data,
          item: val,
      });
  }
}
const handle_reference = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            reference: val,
        });
    } else {
        setData({
            ...data,
            reference: val,
        });
    }
  }

const handle_numeroserie = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            numeroserie: val,
        });
    } else {
        setData({
            ...data,
            numeroserie: val,
        });
    }
  }

const handle_marque = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            marque: val,
        });
    } else {
        setData({
            ...data,
            marque: val,
        });
    }
  }

const handle_type_moteur = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            type_moteur: val,
        });
    } else {
        setData({
            ...data,
            type_moteur: val,
        });
    }
  }
const handle_phase = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            phase: val,
        });
    } else {
        setData({
            ...data,
            phase: val,
        });
    }
  }

const handle_frequence = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            frequence: val,
        });
    } else {
        setData({
            ...data,
            frequence: val,
        });
    }
  }

const handle_cosfi = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            cosfi: val,
        });
    } else {
        setData({
            ...data,
            cosfi: val,
        });
    }
  }

const handle_rendement = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            rendement: val,
        });
    } else {
        setData({
            ...data,
            rendement: val,
        });
    }
  }

const handle_puissance = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            puissance: val,
        });
    } else {
        setData({
            ...data,
            puissance: val,
        });
    }
  }

const handle_tour_min = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            tour_min: val,
        });
    } else {
        setData({
            ...data,
            tour_min: val,
        });
    }
  }

const handle_temperature_ambiante_user = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            temperature_ambiante_user: val,
        });
    } else {
        setData({
            ...data,
            temperature_ambiante_user: val,
        });
    }
  }

const handle_tension_etoile = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            tension_etoile: val,
        });
    } else {
        setData({
            ...data,
            tension_etoile: val,
        });
    }
  }

const handle_tension_triangle = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            tension_triangle: val,
        });
    } else {
        setData({
            ...data,
            tension_triangle: val,
        });
    }
  }

const handle_courant_triangle = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            courant_triangle: val,
        });
    } else {
        setData({
            ...data,
            courant_triangle: val,
        });
    }
  }

const handle_courant_etoile = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            courant_etoile: val,
        });
    } else {
        setData({
            ...data,
            courant_etoile: val,
        });
    }
  }

const handle_indice_protection = (val) => {
    if( val.trim().length >= 5 ) {
        setData({
            ...data,
            indice_protection: val,
        });
    } else {
        
    }
  }


useEffect(()=>{
  // const csrfToken = Cookies.get('csrftoken')
  // console.log(access_token)
})

const  removeItemValue= async(key) =>{
  try {
      await AsyncStorage.removeItem('NEW'+key);
      return true;
  }
  catch(exception) {
      return false;
  }
}

const fetchDataMoteur = async () => {

  const datatofetch = new FormData();
    datatofetch.append('item_moteur',data.item)
    datatofetch.append('create_by',userInfo.id)
    datatofetch.append('reference',data.reference)
    datatofetch.append('numeroserie',data.numeroserie)
    datatofetch.append('marque',data.marque)
    datatofetch.append('type_moteur',data.type_moteur)
    datatofetch.append('phase',data.phase)
    datatofetch.append('frequence',data.frequence)
    datatofetch.append('cosfi',data.cosfi)
    datatofetch.append('rendement',data.rendement)
    datatofetch.append('puissance',data.puissance)
    datatofetch.append('tour_min',data.tour_min)
    datatofetch.append('temperature_ambiante_user',parseFloat(data.temperature_ambiante_user.replace(/,/g, '')))
    datatofetch.append('tension_etoile',data.tension_etoile)
    datatofetch.append('tension_triangle',data.tension_triangle)
    datatofetch.append('courant_triangle',data.courant_triangle)
    datatofetch.append('courant_etoile',data.indice_protection)
    datatofetch.append('poids',data.poids)
    datatofetch.append('indice_protection',data.courant_etoile)
    datatofetch.append('poids',parseFloat(data.poids.replace(/,/g, '')))
    datatofetch.append('install',false)
    datatofetch.append('hors_service',false)
    datatofetch.append('planning',false)

    // console.log(datatofetch)
   
    try {
      const response = await axios.post(`${baseUrlApi}/moteur/`, datatofetch,     
      {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",

          'Authorization': `JWT ${access_token}`
        }
      },
      );
      removeItemValue()
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
      // setIsloading(false
      console.log(error)
    }    
}

const localSave =()=>{
  try{
    var dataIntervention = {
      ID : moteurItem.moteur.item_moteur,
      reference: data.reference,
      numeroserie: data.numeroserie,
      marque: data.marque,
      type_moteur: data.type_moteur,
      phase: data.phase,
      frequence: data.frequence,
      cosfi: data.cosfi,
      rendement: data.rendement,
      puissance: data.puissance,
      tour_min: data.tour_min,
      temperature_ambiante_user: data.temperature_ambiante_user,
      tension_etoile: data.tension_etoile,
      tension_triangle: data.tension_triangle,
      courant_triangle: data.courant_triangle,
      courant_etoile: data.indice_protection,
      poids: data.poids,
      indice_protection: data.courant_etoile,
      poids: data.poids,  
    }



    // const index = curatives.findIndex(cur => cur.ID === moteurItem.moteur.item_moteur)
    // let newCurative = []
    // if (index > -1){
    //   newCurative = [...curatives]
    //   newCurative[index] = dataIntervention
    // }
    // else {
    //   newCurative = [...curatives, dataIntervention]
    // }
    AsyncStorage.setItem('NEW'+moteurItem.moteur.item_moteur, JSON.stringify(dataIntervention))
    .then(()=>{
      // dispatch(setCuratives(newCurative))
      // dispatch(setPlanningItem(dataItem.item_planning))
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
    const inter = JSON.parse(await AsyncStorage.getItem('NEW'+key));
    console.log('inter.continuite_V1_V2', inter.continuite_v1_v2)
    if (inter){

      console.log("-----")
      setData({
        ...data,
        solution: inter.solution,
        descriptionpanne: inter.description_panne,
        obsevervation_gene_av: inter.observation_avant,
        obsevervation_gene_ap: inter.observation_apres,
        obsevervation_conectique: inter.observation_conectique,
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
      setCheckBoxSerage(inter.serage)
      setCheckBoxEquil(inter.equilibrage)
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
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>Nouveau Moteur</Text>
          </View>
        </View>

        <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
         
          <View style={{flex:1}}>
            <Text style={styles.titrechamp}>Item Moteur</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="words"
                style={[styles.textinput, {}]}
                // onChangeText={(val) => handle_ItemMoteur(val)}
                onChangeText={(val) => handle_input(data.item, val)}
              />  
              <Text style={{fontStyle:'italic', fontSize:15, color:'#000'}}>(Doit être un numero article de SAP)</Text>
          </View>
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Reférence</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="characters"
                style={[styles.textinput, {}]}
                // onChangeText={(val) => handle_reference(val)}
                onChangeText={(val) => handle_input(data.reference, val)}

              />  
          </View>
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Numéro de série</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="characters"
                style={[styles.textinput, {}]}
                // onChangeText={(val) => handle_numeroserie(val)}
                onChangeText={(val) => handle_input(data.numeroserie, val)}

              />  
          </View>
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Marque</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="characters"
                style={[styles.textinput,styles.textinputmulti]}
                // onChangeText={(val) => handle_marque(val)}
                onChangeText={(val) => handle_input(data.marque, val)}

              />  
          </View>
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Type de moteur</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="characters"
                style={[styles.textinput,styles.textinputmulti]}
                // onChangeText={(val) => handle_type_moteur(val)}
              />  
          </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Phase</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                keyboardType='decimal-pad'
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_phase(val)}
              />  
          </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Fréquence</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                keyboardType='decimal-pad'
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_frequence(val)}
              />  
          </View>
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Cos fi</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                keyboardType='decimal-pad'
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_cosfi(val)}
              />  
          </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Rendement</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                keyboardType='decimal-pad'
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_rendement(val)}
              />  
          </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Puissance</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                keyboardType='decimal-pad'
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_puissance(val)}
              />  
          </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Tour par minute</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                keyboardType='decimal-pad'
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_tour_min(val)}
              />  
          </View>
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Température d'usage</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                keyboardType='decimal-pad'
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_temperature_ambiante_user(val)}
              />  
          </View>
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Indice de protection</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                keyboardType='decimal-pad'
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_indice_protection(val)}
              />  
          </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Poids (Kg)</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                keyboardType='decimal-pad'
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_poids(val)}
              />  
          </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Etoile</Text>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                    <Text style={{marginLeft:5, color:'#000'}}>Courant</Text>
                    <TextInput
                        placeholder="...."
                        placeholderTextColor="#777"
                        keyboardType='decimal-pad'
                        style={[styles.textinput,styles.textinputmulti]}
                        onChangeText={(val) => handle_courant_etoile(val)}
                    />  
                </View>
                <View style={{flex:1}}>
                    <Text style={{marginLeft:5, color:'#000'}}>Tension</Text>
                    <TextInput
                        placeholder="...."
                        placeholderTextColor="#777"
                        keyboardType='decimal-pad'
                        style={[styles.textinput,styles.textinputmulti]}
                        onChangeText={(val) => handle_tension_etoile(val)}
                    />  
                </View>
              </View>
          </View>

          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Triangle</Text>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                    <Text style={{marginLeft:5, color:'#000'}}>Courant</Text>
                    <TextInput
                        placeholder="...."
                        placeholderTextColor="#777"
                        keyboardType='decimal-pad'
                        style={[styles.textinput,styles.textinputmulti]}
                        onChangeText={(val) => handle_courant_triangle(val)}
                    />  
                </View>
                <View style={{flex:1}}>
                    <Text style={{marginLeft:5,color:'#000'}}>Tension</Text>
                    <TextInput
                        placeholder="...."
                        placeholderTextColor="#777"
                        keyboardType='decimal-pad'
                        style={[styles.textinput,styles.textinputmulti]}
                        onChangeText={(val) => handle_tension_triangle(val)}
                    />  
                </View>
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
              onPress={() => {fetchDataMoteur()}}
              >
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/enregistrer.png")}/>
            </TouchableOpacity>
           
          </View>
          <View>
            <TouchableOpacity 
                style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
                onPress={() => {localSave()}}
              >
                  <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/btn_local_save.png")}/>
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
    //   marginBottom: 30, 
      textAlignVertical: 'top', 
      fontSize: 16, 
      backgroundColor:'#eee', 
      fontSize: 18,
      padding:5,
      }
  
    

   
   
  });

export default Form_New_Moteur;