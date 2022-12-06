import React, { Component, useState,useEffect } from 'react';
import { StyleSheet, View, Text, Image,Button, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import RNSearchablePicker from 'react-native-searchable-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

// const dataMoteurInstalled = [
//     {
//         "id": 6,
//         "createdOn": "2022-10-27",
//         "updatedOn": "2022-10-27",
//         "temperature": 37.0,
//         "observation_general": "RAS",
//         "observation_avant": "RAS",
//         "observation_apres": "RAS",
//         "atelier": "SECHEUR",
//         "equipement": "ONDULEUR",
//         "couplage": "ETOILE",
//         "motif_remplacement": "RAS",
//         "continuite_u1_U2": 0.0,
//         "continuite_v1_v2": 0.0,
//         "continuite_w1_w2": 0.0,
//         "isolement_bobine_w2_u2": 0.0,
//         "isolement_bobine_w2_v2": 0.0,
//         "isolement_bobine_u2_v2": 0.0,
//         "isolement_bobine_masse_u1_m": 0.0,
//         "isolement_bobine_masse_v1_m": 0.0,
//         "isolement_bobine_masse_w1_m": 0.0,
//         "serage": true,
//         "equilibrage": true,
//         "photo_1": null,
//         "photo_2": null,
//         "photo_3": null,
//         "photo_4": null,
//         "photo_5": null,
//         "photo_6": null,
//         "photo_7": null,
//         "photo_8": null,
//         "photo_9": null,
//         "photo_10": null,
//         "moteur": 3,
//         "old_moteur": null,
//         "technicien": 2,
//         "superviceur": 3,
//         "item_moteur": "12009386",
//     },
//     {
//         "id": 7,
//         "createdOn": "2022-10-27",
//         "updatedOn": "2022-10-27",
//         "temperature": 37.0,
//         "observation_general": "RAS",
//         "observation_avant": "RAS",
//         "observation_apres": "RAS",
//         "atelier": "SECHEUR",
//         "equipement": "SAS",
//         "couplage": "ETOILE",
//         "motif_remplacement": "RAS",
//         "continuite_u1_U2": 0.0,
//         "continuite_v1_v2": 0.0,
//         "continuite_w1_w2": 0.0,
//         "isolement_bobine_w2_u2": 0.0,
//         "isolement_bobine_w2_v2": 0.0,
//         "isolement_bobine_u2_v2": 0.0,
//         "isolement_bobine_masse_u1_m": 0.0,
//         "isolement_bobine_masse_v1_m": 0.0,
//         "isolement_bobine_masse_w1_m": 0.0,
//         "serage": true,
//         "equilibrage": true,
//         "photo_1": null,
//         "photo_2": null,
//         "photo_3": null,
//         "photo_4": null,
//         "photo_5": null,
//         "photo_6": null,
//         "photo_7": null,
//         "photo_8": null,
//         "photo_9": null,
//         "photo_10": null,
//         "moteur": 4,
//         "old_moteur": null,
//         "technicien": 2,
//         "superviceur": 3,
//         "item_moteur": "12009387",
//     },
//     {
//         "id": 8,
//         "createdOn": "2022-10-27",
//         "updatedOn": "2022-10-27",
//         "temperature": 37.0,
//         "observation_general": "RAS",
//         "observation_avant": "RAS",
//         "observation_apres": "RAS",
//         "atelier": "SECHEUR",
//         "equipement": "SUPPRESSUE",
//         "couplage": "ETOILE",
//         "motif_remplacement": "RAS",
//         "continuite_u1_U2": 0.0,
//         "continuite_v1_v2": 0.0,
//         "continuite_w1_w2": 0.0,
//         "isolement_bobine_w2_u2": 0.0,
//         "isolement_bobine_w2_v2": 0.0,
//         "isolement_bobine_u2_v2": 0.0,
//         "isolement_bobine_masse_u1_m": 0.0,
//         "isolement_bobine_masse_v1_m": 0.0,
//         "isolement_bobine_masse_w1_m": 0.0,
//         "serage": true,
//         "equilibrage": true,
//         "photo_1": null,
//         "photo_2": null,
//         "photo_3": null,
//         "photo_4": null,
//         "photo_5": null,
//         "photo_6": null,
//         "photo_7": null,
//         "photo_8": null,
//         "photo_9": null,
//         "photo_10": null,
//         "moteur": 5,
//         "old_moteur": null,
//         "technicien": 2,
//         "superviceur": 3,
//         "item_moteur": "12009390",

//     }
// ]

const Form_new_planning = ({route, navigation}) => {


    // const [data , setData] = useState([])
    const [dateIntDebut , setDateInstDebut] = useState(null)
    const [dateIntFin , setDateInstFin] = useState(null)
    const [isDatePickerVisibleFin, setDatePickerVisibilityFin] = useState(false);
    const [isDatePickerVisibleDebut, setDatePickerVisibilityDebut] = useState(false);
    

    const showDatePickerDebut = () => {
        setDatePickerVisibilityDebut(true);
    };

    const hideDatePickerDebut = () => {
        setDatePickerVisibilityDebut(false);
    };

    const handleConfirmDebut = (jour) => {
        setDateInstDebut(jour)
        hideDatePickerDebut();
    };

    const showDatePickerFin = () => {
        setDatePickerVisibilityFin(true);
    };

    const hideDatePickerFin = () => {
        setDatePickerVisibilityFin(false);
    };

    const handleConfirmFin = (jour) => {
        setDateInstFin(jour)     
        hideDatePickerFin();
    };
    

    const {moteurItem} = route.params

    const compareDate = (debut, fin) =>{
        if (debut < fin){
            console.warn("date debut est inferieur",debut)
        }
        else{
            console.warn("date Fin",fin)

        }
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
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>Nouveau Planning</Text>
          </View>
        </View>
        {/* {console.log(moteurItem.atelier)} */}
        <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>

            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{textAlign:'left',marginLeft:10,color:'#0A233E', fontSize:25,marginTop:10,marginBottom:10, fontWeight:'bold'}}>Moteur</Text>
            </View>
            <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
                <Text style={{flex:2, fontSize:18, color:'#000'}}>Item Moteur</Text>
                <Text style={{flex:2, fontSize:20, color:'#0A233E', flexWrap:'wrap', fontWeight:"bold"}}>{moteurItem.item.item_moteur}</Text>
            </View>
            <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
                <Text style={{flex:2, fontSize:18, color:'#000'}}>Atelier</Text>
                <Text style={{flex:2, fontSize:20, color:'#0A233E', flexWrap:'wrap', fontWeight:"bold"}}>{moteurItem.item.atelier}</Text>
            </View>
            <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
                <Text style={{flex:2, fontSize:18, color:'#000'}}>Equipement</Text>
                <Text style={{flex:2, fontSize:20, color:'#0A233E', flexWrap:'wrap', fontWeight:"bold"}}>{moteurItem.item.equipement}</Text>
            </View>
            <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
                {/* <Text style={{flex:2, fontSize:18, color:'#000'}}>Date intervention</Text>
                 */}
                <TouchableOpacity
                    onPress={showDatePickerDebut}
                    style={{flex:2, fontSize:18, color:'#000'}}
                >
                    <Text style={{ color:'#000', fontSize:22}}>Date début</Text>

                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisibleDebut}
                    mode="date"
                    onConfirm={handleConfirmDebut}
                    onCancel={hideDatePickerDebut}
                />
                <Text style={{flex:2, fontSize:20, color:'#0A233E', flexWrap:'wrap', fontWeight:"bold"}}>
                    {dateIntDebut ? dateIntDebut.toLocaleDateString() : '- - -'}
                </Text>

            </View>
            <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
                {/* <Text style={{flex:2, fontSize:18, color:'#000'}}>Date intervention</Text>
                 */}
                <TouchableOpacity
                    onPress={showDatePickerFin}
                    style={{flex:2, fontSize:18, color:'#000'}}
                >
                    <Text style={{ color:'#000', fontSize:22}}>Date Fin</Text>

                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisibleFin}
                    mode="date"
                    onConfirm={handleConfirmFin}
                    onCancel={hideDatePickerFin}
                />
                <Text style={{flex:2, fontSize:20, color:'#0A233E', flexWrap:'wrap', fontWeight:"bold"}}>
                    {dateIntFin ? dateIntFin.toLocaleDateString() : '- - -'}
                </Text>

            </View>
            <View style={{flexDirection: 'row', marginTop:20}}>
            <TouchableOpacity style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/annuler.png")}/>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
              onPress={() => {compareDate( dateIntDebut, dateIntFin )}}
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

export default Form_new_planning;