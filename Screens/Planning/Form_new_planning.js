import React, { Component, useState,useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image,Button, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput, Alert } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import RNSearchablePicker from 'react-native-searchable-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { AuthContext } from '../../context/Authcontext';
import { baseUrlApi } from '../../API/urlbase';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const Form_new_planning = ({route, navigation}) => {


    const {moteurItem, methode} = route.params
    const {access_token, userInfo} = useContext(AuthContext)

    const [dateIntDebut , setDateInstDebut] = useState(null)
    const [dateIntFin , setDateInstFin] = useState(null)
    const [taches , setTaches] = useState('')
    const [isDatePickerVisibleFin, setDatePickerVisibilityFin] = useState(false);
    const [isDatePickerVisibleDebut, setDatePickerVisibilityDebut] = useState(false);
    const [isloading, setIsloading] = useState(false);

    const FormatDate = (data) => {
        let dateTimeString =
            data.getFullYear() +
            '-' +
            (data.getMonth() + 1) +
            '-' +
            data.getDate() 
        
        return dateTimeString; // It will look something like this 3-5-2021 16:23
    };
    

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

    const handle_Taches = (val) => {
        setTaches(val)
      }
    
      useEffect(()=>{
        // console.log(moteurItem.date_end_int)
        // console.log(moteurItem.date_int)
        // console.log(moteurItem.tache)
        // console.log(methode)
        // setIsloading(true)

        // wait(3000).then(()=>{
            if(methode === 'put'){
            {moteurItem.date_end_int !== null ? setDateInstFin(moteurItem.date_end_int) : null}
            {moteurItem.date_int !== null ? setDateInstDebut(moteurItem.date_int) : null}
            {moteurItem.tache !== null ? setTaches(moteurItem.tache) : ''}
            setIsloading(false)}
        // }
            
        // )
        
       

      })
    
    const data = () => {
        return {
            moteur : moteurItem.moteur.id,
            create_by : userInfo.id,
            atelier : moteurItem.atelier.id,
            equipement : moteurItem.equipement.id,
            date_int : FormatDate(dateIntDebut),
            date_end_int : FormatDate(dateIntFin),
            tache : taches
        }
    }

    const putData = async (data, route, ) =>{
        console.log(data)
        try {
          setIsloading(true)
          const response = await axios.put(`${baseUrlApi}/${route}/`, 
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `JWT ${access_token}`
                }
              },
            );
          
            navigation.navigate('Planning')
    
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
          console.log(error.status)
          setIsloading(false)
    
        }
    
    
        
    }

    const postData = async (data, route, ) =>{
        console.log(data)
        try {
          setIsloading(true)
          const response = await axios.post(`${baseUrlApi}/${route}/True/`, 
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `JWT ${access_token}`
                }
              },
            );
          
            navigation.navigate('Planning')
    
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
          console.log(error.status)
          setIsloading(false)
    
        }
    
    
        
    }
    

    const compareDate = (debut, fin) =>{
        if(debut !==null || fin !== null)
            if (debut < fin){
                // postData(data(), 'planning') 
                {methode === 'post' ? postData(data(), 'planning') : putData(data(), 'planning')}               
            }
            else{
                alert("Vérifier les dates de Fin et de début du planning d'intervention")
            }
        else{
            alert("Définir la période d'intervention")

        }
    }

    const loading =()=>{
        return(
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={'large'}/>
          </View>
        )
      }

    const datePostOrput =(datte, methode)=>{
        console.log(datte,"  444444  ", methode)
        if(methode === 'post'){
            return ""+datte.toLocaleDateString()
        }
        else  if(methode === 'put'){
            return ""+datte
        }

    }

    const renderForm=(methode)=>{
      if(methode === 'post'){
        return(
          <View style ={{flex:1}}>
          <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
               
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
            </View>
        )
      }
      else  if(methode === 'put'){
        return (
          <View style ={{flex:1}}>
          <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
               
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
                    {/* {dateIntDebut ? dateIntDebut.toLocaleDateString() : '- - -'} */}
                    {dateIntDebut ? datePostOrput(dateIntDebut, methode) : '- - -'}
                </Text>

            </View>
            <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
               
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
                    {/* {dateIntFin ? dateIntFin.toLocaleDateString() : '- - -'} */}
                    {dateIntDebut ? datePostOrput(dateIntDebut, methode) : '- - -'}

                </Text>

            </View>
            </View>
        )
    }
    }

    const renderForme =()=>{
        return(
            <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>

            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{textAlign:'left',marginLeft:10,color:'#0A233E', fontSize:25,marginTop:10,marginBottom:10, fontWeight:'bold'}}>Moteur</Text>
            </View>
            <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
                <Text style={{flex:2, fontSize:20, color:'#000'}}>Item Moteur</Text>
                <Text style={{flex:2, fontSize:20, color:'#0A233E', flexWrap:'wrap', fontWeight:"bold"}}>{moteurItem.moteur.item_moteur}</Text>
            </View>
            <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
                <Text style={{flex:2, fontSize:20, color:'#000'}}>Atelier</Text>
                <Text style={{flex:2, fontSize:20, color:'#0A233E', flexWrap:'wrap', fontWeight:"bold"}}>{moteurItem.atelier.nom_atelier}</Text>
            </View>
            <View style={{flex:1, flexDirection:'row',marginTop:10,}}>
                <Text style={{flex:2, fontSize:20, color:'#000'}}>Equipement</Text>
                <Text style={{flex:2, fontSize:20, color:'#0A233E', flexWrap:'wrap', fontWeight:"bold"}}>{moteurItem.equipement.nom_equipenent}</Text>
            </View>

            <View style={{flex:1, justifyContent:'center' , alignItems:'center',marginTop:25,}}>
                <Text style={{flex:2, fontSize:20, color:'#000'}}>Définir la période d'intervention</Text>
            </View>


            {renderForm(methode)}

            <View style={{flex:1}}>
                <Text style={styles.titrechamp}>Tâche</Text>
                <TextInput
                    placeholder="Description des tâches"
                    placeholderTextColor="#777"
                    autoCapitalize="sentences"
                    numberOfLines={7}
                    multiline={true}                  
                    style={[styles.textinput,styles.textinputmulti]}
                    onChangeText={(val) => handle_Taches(val)}

                />              
            </View>
            <View style={{flexDirection: 'row', marginTop:20}}>
            <TouchableOpacity style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/annuler.png")}/>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}
              onPress={() => {compareDate( dateIntDebut, dateIntFin )}}
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
            <Text style={[styles.etatprovenance, {width: 250, marginLeft:15, color: '#000'}]}>Nouveau Planning</Text>
          </View>
        </View>
        {/* {console.log(moteurItem.atelier)} */}
       
        {isloading ? loading() : renderForme()}

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
      color: '#000',
      marginTop:10
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