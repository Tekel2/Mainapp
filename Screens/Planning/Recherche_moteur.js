import React, { Component, useState,useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import RNSearchablePicker from 'react-native-searchable-picker';


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
        "item_moteur": "12009390",

    },
    {
      "id": 9,
      "createdOn": "2022-10-27",
      "updatedOn": "2022-10-27",
      "temperature": 37.0,
      "observation_general": "RAS",
      "observation_avant": "RAS",
      "observation_apres": "RAS",
      "atelier": "SECHEUR",
      "equipement": "SUPPRESSUE",
      "item_moteur": "12009392",

  },
  {
    "id": 10,
    "createdOn": "2022-10-27",
    "updatedOn": "2022-10-27",
    "temperature": 37.0,
    "observation_general": "RAS",
    "observation_avant": "RAS",
    "observation_apres": "RAS",
    "atelier": "SECHEUR",
    "equipement": "SUPPRESSUE",
    "item_moteur": "12009400",

},
{
  "id": 11,
  "createdOn": "2022-10-27",
  "updatedOn": "2022-10-27",
  "temperature": 37.0,
  "observation_general": "RAS",
  "observation_avant": "RAS",
  "observation_apres": "RAS",
  "atelier": "SECHEUR",
  "equipement": "SUPPRESSUE",
  "item_moteur": "12009410",
},
{
  "id": 12,
  "createdOn": "2022-10-27",
  "updatedOn": "2022-10-27",
  "temperature": 37.0,
  "observation_general": "RAS",
  "observation_avant": "RAS",
  "observation_apres": "RAS",
  "atelier": "SECHEUR",
  "equipement": "SUPPRESSUE",
  "item_moteur": "12009420",

},
{
  "id": 13,
  "createdOn": "2022-10-27",
  "updatedOn": "2022-10-27",
  "temperature": 37.0,
  "observation_general": "RAS",
  "observation_avant": "RAS",
  "observation_apres": "RAS",
  "atelier": "SECHEUR",
  "equipement": "SUPPRESSUE",
  "item_moteur": "12009421",

},
{
  "id": 14,
  "createdOn": "2022-10-27",
  "updatedOn": "2022-10-27",
  "temperature": 37.0,
  "observation_general": "RAS",
  "observation_avant": "RAS",
  "observation_apres": "RAS",
  "atelier": "SECHEUR",
  "equipement": "SUPPRESSUE",
  "item_moteur": "12009422",

},
{
  "id": 15,
  "createdOn": "2022-10-27",
  "updatedOn": "2022-10-27",
  "temperature": 37.0,
  "observation_general": "RAS",
  "observation_avant": "RAS",
  "observation_apres": "RAS",
  "atelier": "SECHEUR",
  "equipement": "SUPPRESSUE",
  "item_moteur": "12009425",

}
]

const Recherche_moteur = ({navigation, route}) => {
//   const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const couplage = ["Etoile", "Triangle"]

//   const [data, setData] = React.useState({
//     obsevervation_gene: '',
//     atelier: '',
   
// });

const [data , setData] = useState([])
const [filtrerData, setFiltrerData] = useState([])

const [selected, setSelected] = useState();
const [direction, setDirection] = useState(false);

const selectHandler = item => {
  setSelected(item);
}

useEffect(() => {
  setData(dataMoteurInstalled)
  setFiltrerData(dataMoteurInstalled)
}, []);

const {option} = route.params
const navigateTo = (direct, valParam) =>{
  if (direct){
    console.log(valParam)
    return(
      navigation.navigate('Repartion_form',{moteurItem:valParam})
    )
  }
  else{
    console.log(valParam)
    return(
      navigation.navigate('Planning_new',{moteurItem:valParam})
    )
  }
}
const handleDirection = () =>{
  // if (option === 'repar')
  {option === 'repar' ? setDirection(true) :setDirection(false)  }
}
useEffect(() => {
  handleDirection()
}, []);



const searcheFilterFunction = (text) =>{
    if(text){
        const newData = data.filter(item => {
            console.log(item.equipement)
            console.log(text)
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
        
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>
              Recherche du moteur
            </Text>
          </View>
        </View>

        <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
            <View style={styles.inputzone }>
                <View style={{flexDirection: 'row',}}>
                    <View style={{flex:9, }}>
                        <TextInput
                            style={styles.rechercheinput}
                            // onChangeText={(val) => besointextInputChange(val)}
                            clearButtonMode="while-editing"
                            // maxLength= {22}
                            keyboardType='decimal-pad'
                            placeholder="rechercher item moteur"
                            placeholderTextColor = "#A4A5A4"
                            onChangeText={(val) => searcheFilterFunction(val)}
                        /> 
                    </View>
                              
                </View>            
            </View>
          {
            filtrerData.map((item, index) =>{
                return(
                    <View style={{marginBottom:6, flexDirection:'column',  justifyContent: 'flex-start', flex:1}}>
                    <TouchableOpacity 
                        style={{flexDirection:'row', height:70, }}
                        onPress={() => navigateTo(direction, {item})}
                        >
                          <View style={{flex:1,borderTopLeftRadius: 5, borderBottomLeftRadius:5,borderWidth:1, borderColor:'#316094', justifyContent: 'center', alignContent: 'center'}}>
                              <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon-moteur.png")}/>
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
      },
      inputzone:{
        // flex:2,
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        // borderBottomWidth:1,
        paddingBottom:10,
        marginTop: 10,
        marginBottom: 10,
        // borderBottomWidth: 1.5,
        // borderBottomColor: '#316094'
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
        textAlign:'center',
        marginHorizontal: 10,
        
    },
  
    

   
   
  });

export default Recherche_moteur;