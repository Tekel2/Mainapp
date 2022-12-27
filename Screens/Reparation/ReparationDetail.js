import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { baseUrlApi, baseUrlmedia } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';



const ReparationDetail = ({navigation, route}) => {

  const {userInfo,access_token} = useContext(AuthContext)
  const {dataItem} = route.params
  const [isloading, setIsloading] = useState(false)

  const [imgbd, setImgbd] = useState()

  const [data, setData] = React.useState({
    
  });

  
//   useEffect(()=>{
//     getImage()
//   })


  const getAtlierEqt = async () => {
    setIsloading(true)
    const configGetMotor = {
      method: 'get',
      url: `${baseUrlApi}/atelier-eqt/dataItem.moteur_hs.moteur.id/`, // Lien des planninig non executé
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      const response = await axios(configGetMotor);
      const data = await response.data
      // console.log("45654656  ",data)
      setData(data);
      // setFiltrerData(data);

         
      // console.log(json)
      console.log(response.status)
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
      }
      else if (error.response?.status === 404){
        alert("Aucun planning de disponible")
      }
      // alert("An error has occurred");
      console.log(error.status)
      // setIsloading(false)
    }

    setIsloading(false)
  }

  const getImage = async () => {
    setIsloading(true)
    const configGetMotor = {
      method: 'get',
      url: `${baseUrlmedia}${dataItem.photo_bon_sortie}`, // Lien des planninig non executé
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${access_token}`
      }
    }
    try{

      const response = await axios(configGetMotor);
      const data = await response.data
    //   console.log("",data)
      setImgbd(data);
      // setFiltrerData(data);

         
      // console.log(json)
      console.log(response.status)
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
      }
      else if (error.response?.status === 404){
        alert("Aucun planning de disponible")
      }
      // alert("An error has occurred");
      console.log(error.status)
      // setIsloading(false)
    }

    setIsloading(false)
  }


 
    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
            <StatusBar backgroundColor='#316094' barStyle='light-content'/>
            <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/logo-entete.png")}/>
                <View style={{}}>
                <Text style={{flexWrap:'wrap', textAlign:'center', fontWeight: 'bold', fontSize:20, color:'#0A233E'}}>
                Détail moteur en réparation</Text>
            </View>
            </View>
            
            <ScrollView style={{flex:1, flexDirection:'column'}}>
                <View style={{justifyContent:'center', borderLeftWidth: 1 }}>

                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Superviseur</Text>
                        </View>
                       <View style={{flex:2, marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataItem.create_by.username}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Dernier Technicien Intervenant</Text>
                        </View>
                       <View style={{flex:2,marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataItem.last_technicien.username}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Date d'Enregistrement</Text>
                        </View>
                       <View style={{flex:2, marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataItem.createdOn}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Date de sortie</Text>
                        </View>
                       <View style={{flex:2,marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataItem.date_sortie}</Text>
                        </View>
                    </View>
                    

                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Item Réparation</Text>
                        </View>
                       <View style={{flex:2, marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataItem.item_reparation}</Text>
                        </View>
                    </View>


                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Préstatiare</Text>
                        </View>
                       <View style={{flex:2, marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataItem.prestataire}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Contact du préstatiare</Text>
                        </View>
                       <View style={{flex:2, marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataItem.contact_prestataire}</Text>
                        </View>
                    </View>

                    

                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Motif de répartion</Text>
                        </View>
                       <View style={{flex:2, marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataItem.motif_reparation}.</Text>
                        </View>
                    </View>

                    

                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Item Moteur</Text>
                        </View>
                       <View style={{flex:2, marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataItem.moteur_hs.moteur.item_moteur}</Text>
                        </View>
                    </View>


                    
                    <View style={{flex:1, marginLeft:25, marginTop:20}}>
                        <Text style={{flexWrap:'wrap', fontWeight: '400', fontSize:18, color:'#000'}}>Démonter à :</Text>
                    </View>
                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Atelier</Text>
                        </View>
                       <View style={{flex:2, marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>454545</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'column', flex:1, marginTop:10}}>
                       <View style={{flex:1, marginLeft:10}}> 
                            <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Equipement</Text>
                        </View>
                       <View style={{flex:2, marginLeft:25}}> 
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>454545</Text>
                        </View>
                    </View>

                    

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
      paddingRight: 10
    },
   
   
  });

export default ReparationDetail;