import axios from 'axios';
import React, { Component, useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, RefreshControl, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { baseUrlApi } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const DetailsPreventive = ({navigation,route}) => {

  const {userInfo,access_token} = useContext(AuthContext)


  const {dataIntevention} = route.params
  const [data , setData] = useState([])
//   const [dataAteler , setDataAtelier] = useState([])
  const [isLoadingInstalled, setIsLoadingInstalled] = useState(true)
      
  const [dataMoteur, setDataMoteur] = useState([])

//   function getData(){
//     return route.params.moteurItem
//   }

  useEffect(()=>{
//    setDataMoteur(getData)
console.log(dataIntevention)
  }, [])
  
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getatelier_eqt("atelier-eqt",dataIntevention.id )
  }, []);


  useEffect(() =>{
    // getatelier_eqt("atelier-eqt",dataIntevention.id )
  }, [])

//   useEffect(() =>{
//     if(!isLoadingInstalled){
//         fetchDataAtelier("http://192.168.227.30:8000/api/atelier",dataInstal.equipement.id )
//     }
//   }, [])



const getatelier_eqt = async (route, id) => {

    const configGetMotor = {
      method: 'get',
      url: `${baseUrlApi}/${route}/${id}/`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      const response = await axios(configGetMotor);
      const data = await response.data
      setData(data);
    //   setFiltrermoteurInstalled(data);
    setIsLoadingInstalled(false)

    } catch (error){
      console.log(error)
      if(!error.response){
        alert("Aucune reponse du serveur");
      }
      else if (error.response?.status === 400){
        alert("Certains informations ne sont pas renseignées")
      }
      else if (error.response?.status === 401){
        alert("Vous n'est pas authorisé")
        useRefreshToken()
        // fetchmoteurInstalled()
      }
      else if (error.response?.status === 404){
        alert("Aucune corespondance a votre demande")
      }
      // alert("An error has occurred");
      // setIsloading(false)
    }
  }

  

  const loading =()=>{
    // if (!isLoadingInstalled){
        return(
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator color='#000' size={'large'}/>
            </View>
        )
    // }
  }


  const renderContentView=()=>{
    return(
        <ScrollView style={{flex:1, flexDirection:'column', paddingBottom:50, marginBottom:10,borderRadius:8, borderWidth:1}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
        
    >
        <View style={{justifyContent:'center', alignItems:'center'}}>

            <View style>
                <Text style={{flexWrap:'wrap', fontWeight: 'bold', fontSize:20, color:'#0A233E'}}>
                Détails intervention Préstataire</Text>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Item Preventive</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataIntevention.item_preventive}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Item Moteur</Text>
                </View>
            <View style={{flex:1,}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataIntevention.moteur.item_moteur}</Text>
                </View>
            </View>

            {/* <View style={{flex:1}}>
                <Text style={{flexWrap:'wrap', fontWeight: '400', fontSize:18, color:'#000'}}>Démonter à :</Text>
            </View> */}
            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Dans l'Atelier</Text>
                </View>
            <View style={{flex:1}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{data.nom_atelier}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Sur l'Equipement</Text>
                </View>
            <View style={{flex:1}}> 
                    {/* <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataIntevention.equipement.item_equipenent}</Text> */}
                </View>
            </View>


            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Superviser Par </Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataIntevention.superviceur.username}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Technicien</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataIntevention.technicien.username}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Date intervention</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataIntevention.createdOn}</Text>
                </View>
            </View>

            {/* <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Motif de remplacement</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.motif_remplacement}</Text>
                </View>
            </View> */}

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Observation(s) Avant</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.observation_avant}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Observation(s) Après</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.observation_apres}</Text>
                </View>
            </View>

            {/* <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Couplage</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.couplage}</Text>
                </View>
            </View> */}

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>continuite u1 U2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.continuite_u1_U2} Ohm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>continuite v1 v2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.continuite_v1_v2} Ohm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>continuite w1 w2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.continuite_w1_w2} Ohm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement w2 u2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.isolement_bobine_w2_u2} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement w2 v2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.isolement_bobine_w2_v2} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement u2 v2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.isolement_bobine_u2_v2} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement masse u1</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.isolement_bobine_masse_u1_m} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolementmasse v1</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.isolement_bobine_masse_v1_m} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement masse w1 </Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.isolement_bobine_masse_w1_m} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Sérage </Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.serage?'Parfait':'Nom'}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10, borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Equilibrage </Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataIntevention.equilibrage?'Parfait':'Nom'}</Text>
                </View>
            </View>

            {/* <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Date modification</Text>
            </View>
            <View style={{flex:1}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>454545</Text>
            </View>
            </View> */}


        </View>     





       



    </ScrollView>
    )
  }


 
    return (
        <SafeAreaView 
        style={styles.MainContainer}
    >
        <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
            <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/logo-entete.png")}/>
        </View>
        
         { !isLoadingInstalled ? loading() : renderContentView()}

    </SafeAreaView>
           
        
    );
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: '#E4E4E4',
      paddingTop: 10,
      paddingLeft: 10, 
      paddingRight: 10
    },
   
   
  });

export default DetailsPreventive;