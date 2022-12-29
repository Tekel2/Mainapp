import React, { Component, useState,useEffect, useContext } from 'react';
import { RefreshControl, StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import RNSearchablePicker from 'react-native-searchable-picker';
import { baseUrlApi } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';
import axios from 'axios';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Recherche_moteur_reparation = ({navigation, route}) => {
  
  const {userInfo,access_token} = useContext(AuthContext)


  const [data , setData] = useState([])
  const [filtrerData, setFiltrerData] = useState([])

  const [selected, setSelected] = useState();
  const [direction, setDirection] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);


  const selectHandler = item => {
    setSelected(item);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getMoteur()
  }, []);

  useEffect(() => {
    getMoteur()
    // console.log(access_token)
  }, []);


  const getMoteur = async () => {

    const configGetMotor = {
      method: 'get',
      url: `${baseUrlApi}/findmoteurhs/`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      const response = await axios(configGetMotor);
      if (response.status == 200){
        const data = await response.data
        console.log(data)
        // console.log(data)
        setData(data);
        setFiltrerData(data);
      }
      else if (response.status == 401){
        setData([]);
        setFiltrerData([]);
        setMessageErr('- Aucun moteur installé ou en attente de d\'installation -')


      }
      else if (response.status == 404){
        setData([]);
        setFiltrerData([]);
        setMessageErr('- Aucun moteur installé ou en attente de d\'installation -')

      }
      
      // console.log(json)
      // console.log(response.status)
    } catch (error){
      console.log(error)
    }
  }



  const searcheFilterFunction = (text) =>{
      if(text){
          const newData = data.filter(item => {
              // console.log(item.equipement)
              // console.log(text)
              const itemData = item.moteur.item_moteur ;
              const textData = toString(text);
              return itemData.indexOf(text) > -1;
          })
          setFiltrerData(newData)
      }
      else{
          setFiltrerData(data)
      }
  }

  const moteurinstaller =() =>{
    return(
      filtrerData.map((item, index) =>{
        return(      

            <View style={{marginBottom:6, flexDirection:'column',  justifyContent: 'flex-start', flex:1}}>
             { !item.moteur.planning? // des moteurs déja planifier
               
                <TouchableOpacity 
                    style={{flexDirection:'row', height:70, }}
                    onPress={() => navigation.navigate('Repartion_form',{moteurItem:item})}
                    >
                      <View style={{flex:1,borderTopLeftRadius: 5, borderBottomLeftRadius:5,borderWidth:1, borderColor:'#316094', justifyContent: 'center', alignContent: 'center'}}>
                          <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon-moteur.png")}/>
                      </View>
                      <View style={{flex: 5, backgroundColor:'#316094', paddingLeft: 10,borderTopRightRadius: 5, borderBottomRightRadius:5 }}>
                        <Text style={{fontSize: 20, color:'#E4E4E4', fontWeight:'900'}}>Moteur : {item.moteur.item_moteur}</Text>
                        {/* <Text style={{fontSize: 16, color:'#E4E4E4', fontWeight:'900'}}>Atelier : {item.atelier.nom_atelier}</Text>
                        <Text style={{fontSize: 16, color:'#E4E4E4', fontWeight:'900'}}>Equipement : {item.equipement.nom_equipenent} </Text> */}
                      </View>
                </TouchableOpacity>
               :null
              }
            </View>
        
      )
    }) 
    )
  }

  function isEmpty(obj) {
    for(var i in obj) { return false; }
    return true;
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

        <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}
          refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}
            
        >
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
          {/* {
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
          } */}

          { !isEmpty(filtrerData) ?
                
            moteurinstaller()
            :
            <View style={{flex:5,justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'#000'}}>messageErr</Text>

            </View>
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

export default Recherche_moteur_reparation;