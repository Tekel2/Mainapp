import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'


const Formreparation = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
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
});

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
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
            </View>
        
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>Mise en Réparation</Text>
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
                onChangeText={(val) => handle_ItemMoteur(val)}
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
                onChangeText={(val) => handle_reference(val)}
              />  
          </View>
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Numéro de série</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="characters"
                style={[styles.textinput, {}]}
                onChangeText={(val) => handle_numeroserie(val)}
              />  
          </View>
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Marque</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="characters"
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_marque(val)}
              />  
          </View>
          <View style={{flex:1, marginTop: 10}}>
            <Text style={styles.titrechamp}>Type de moteur</Text>
              <TextInput
                placeholder="...."
                placeholderTextColor="#777"
                autoCapitalize="characters"
                style={[styles.textinput,styles.textinputmulti]}
                onChangeText={(val) => handle_type_moteur(val)}
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
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/annuler.png")}/>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
              onPress={() => {saveDatatoServer( data )}}
              >
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/enregistrer.png")}/>
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

export default Formreparation;