import axios from 'axios';
import React, { Component, useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, RefreshControl, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { baseUrlApi, baseUrlmedia } from '../../API/urlbase';
import { AuthContext } from '../../context/Authcontext';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const DetailsReparation = ({navigation,route}) => {

  const {logout,access_token} = useContext(AuthContext)


  const {dataItem} = route.params
  const [data , setData] = useState([])
//   const [dataAteler , setDataAtelier] = useState([])
  const [isLoadingInstalled, setIsLoadingInstalled] = useState(false)
      
  const [dataMoteur, setDataMoteur] = useState([])

//   function getData(){
//     return route.params.moteurItem
//   }

  useEffect(()=>{
//    setDataMoteur(getData)
    console.log(dataItem.moteur_hs.superviceur)
  }, [])
  
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    //getatelier_eqt("atelier-eqt",dataItem.id )
  }, []);


  useEffect(() =>{
    //getatelier_eqt("atelier-eqt",dataItem.id )
    // console.log(dataItem)
  }, [])

//   useEffect(() =>{
//     if(!isLoadingInstalled){
//         fetchDataAtelier("http://192.168.227.30:8000/api/atelier",dataInstal.equipement.id )
//     }
//   }, [])


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
                Rapport Réparation</Text>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'normal', flexWrap:'wrap', fontWeight:'800', fontSize:22, color:'#ED7524', textAlign:'center', }}>
                        Moteur {dataItem.reparation_encour ? "Réparation encours" : "Déjà réparé"}
                    </Text>
                </View>
                
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10, marginTop: 20}}>
                <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Prestataire</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style= {{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{dataItem.prestataire}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10, marginBottom:30}}>
                <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Contact </Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style= {{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{dataItem.contact_prestataire}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Item Réparation</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style= {{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{dataItem.item_reparation}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Item Moteur</Text>
                </View>
            <View style={{flex:1,}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{dataItem.moteur_hs.moteur.item_moteur}</Text>
                </View>
            </View>

            {/* <View style={{flex:1}}>
                <Text style={{flexWrap:'wrap', fontWeight: '400', fontSize:18, color:'#000'}}>Démonter à :</Text>
            </View> */}
            {/* <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                <View style={{flex:1, marginLeft:10}}> 
                        <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Dans l'Atelier</Text>
                </View>
                <View style={{flex:1}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{data.nom_atelier}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Sur l'Equipement</Text>
                </View>
                <View style={{flex:1}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{data.nom_equipement}</Text>
                </View>
            </View> */}


            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Superviser Par </Text>
                </View>
                <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{dataItem.create_by.username}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                <View style={{flex:1, marginLeft:10}}> 
                        <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Dernier Technicien</Text>
                    </View>
                <View style={{flex:1, marginLeft:10}}> 
                        <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{dataItem.moteur_hs.technicien.username}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Date intervention</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{dataItem.createdOn}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Date modification</Text>
                </View>
                <View style={{flex:1}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{dataItem.updatedOn}</Text>
                </View>
            </View>

            {/* <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Motif de remplacement</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.motif_remplacement}</Text>
                </View>
            </View> */}

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Observation general</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.observation_general}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Motif</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.motif_reparation}</Text>
                </View>
            </View>

            {/* <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Couplage</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.couplage}</Text>
                </View>
            </View> */}

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>continuite u1 U2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.moteur_hs.continuite_u1_U2} Ohm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>continuite v1 v2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.moteur_hs.continuite_v1_v2} Ohm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>continuite w1 w2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.moteur_hs.continuite_w1_w2} Ohm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement w2 u2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.moteur_hs.isolement_bobine_w2_u2} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement w2 v2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.moteur_hs.isolement_bobine_w2_v2} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement u2 v2</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.moteur_hs.isolement_bobine_u2_v2} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement masse u1</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.moteur_hs.isolement_bobine_masse_u1_m} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolementmasse v1</Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.moteur_hs.isolement_bobine_masse_v1_m} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement masse w1 </Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.moteur_hs.isolement_bobine_masse_w1_m} MOhm</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Sérage </Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.serage?'Parfait':'Nom'}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10, borderBottomWidth:1, marginHorizontal: 10}}>
            <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Equilibrage </Text>
                </View>
            <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}> {dataItem.equilibrage?'Parfait':'Nom'}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                <View style={{flex:1, marginLeft:10}}> 
                    <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Proposition</Text>
                </View>
                <View style={{flex:1}}> 
                    <Text style={{fontSize:18, fontWeight:'500', color:'#0A233E'}}>{dataItem.recommendation}</Text>
                </View>
            </View>

            {
                dataItem.photo_bon_sortie !== null || dataItem.photo_moteur !== null?

                <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                
                    <View style={{flex:1, marginLeft:10}}> 
                        <Text style={{fontStyle:'italic', fontSize:18, color:'#000', textAlign:'center'}}>Image(s) de la sortie</Text>
                    </View>
                   
                </View>
                :
                <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                
                    <View style={{flex:1, marginLeft:10}}> 
                        <Text style={{fontStyle:'normal', fontSize:20, color:'#666', textAlign:'center'}}>- Aucune image -</Text>
                    </View>
                   
                </View>
            }

            {
                dataItem.photo_bon_sortie !== null?
                <TouchableOpacity
                    style={{flexDirection:'row', flex:1, marginTop:10, marginHorizontal: 10, marginBottom: 20 }}
                    onPress={() => {navigation.navigate('His_imageviewer', {dataURI:dataItem.photo_bon_sortie})}}
                >                    
                    <Image source={{ uri:`${baseUrlmedia}${dataItem.photo_bon_sortie}`  }} style={{ width: 350, height: 200, marginHorizontal:10, borderRadius:4}} />
                    
                </TouchableOpacity>

                : null
            }
            {
                dataItem.photo_moteur !== null?
                <TouchableOpacity
                    style={{flexDirection:'row', flex:1, marginTop:10, marginHorizontal: 10, marginBottom: 20 }}
                    onPress={() => {navigation.navigate('His_imageviewer', {dataURI:dataItem.photo_moteur})}}
                >                    
                    <Image source={{ uri:`${baseUrlmedia}${dataItem.photo_moteur}`  }} style={{ width: 350, height: 200, marginHorizontal:10, borderRadius:4}} />
                    
                </TouchableOpacity>
                : null
            }
          


            {
                dataItem.moteur_hs.photo_1 !== null || dataItem.moteur_hs.photo_2 !== null ||dataItem.moteur_hs.photo_3 !== null ?

                <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                
                    <View style={{flex:1, marginLeft:10}}> 
                        <Text style={{fontStyle:'italic', fontSize:18, color:'#000', textAlign:'center'}}>Image(s) de l'intervention</Text>
                    </View>
                   
                </View>
                :
                <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
                
                    <View style={{flex:1, marginLeft:10}}> 
                        <Text style={{fontStyle:'normal', fontSize:20, color:'#666', textAlign:'center'}}>- Aucune image de l'intervention -</Text>
                    </View>
                   
                </View>
            }

            {
                dataItem.moteur_hs.photo_1 !== null?
                <TouchableOpacity
                    style={{flexDirection:'row', flex:1, marginTop:10, marginHorizontal: 10, marginBottom: 20 }}
                    onPress={() => {navigation.navigate('His_imageviewer', {dataURI:dataItem.moteur_hs.photo_1})}}
                >                    
                    <Image source={{ uri:`${baseUrlmedia}${dataItem.moteur_hs.photo_1}`  }} style={{ width: 350, height: 200, marginHorizontal:10, borderRadius:4}} />
                    
                </TouchableOpacity>

                : null
            }
            {
                dataItem.moteur_hs.photo_2 !== null?
                <TouchableOpacity
                    style={{flexDirection:'row', flex:1, marginTop:10, marginHorizontal: 10, marginBottom: 20 }}
                    onPress={() => {navigation.navigate('His_imageviewer', {dataURI:dataItem.moteur_hs.photo_2})}}
                >                    
                    <Image source={{ uri:`${baseUrlmedia}${dataItem.moteur_hs.photo_2}`  }} style={{ width: 350, height: 200, marginHorizontal:10, borderRadius:4}} />
                    
                </TouchableOpacity>
                : null
            }
            {
                dataItem.moteur_hs.photo_3 !== null?
                <TouchableOpacity
                    style={{flexDirection:'row', flex:1, marginTop:10, marginHorizontal: 10, marginBottom: 20 }}
                    onPress={() => {navigation.navigate('His_imageviewer', {dataURI:dataItem.moteur_hs.photo_3})}}
                >                    
                    <Image source={{ uri:`${baseUrlmedia}${dataItem.moteur_hs.photo_3}`  }} style={{ width: 350, height: 200, marginHorizontal:10, borderRadius:4}} />
                    
                </TouchableOpacity>
                : null
            }
            {
                dataItem.moteur_hs.photo_4 !== null?
                <TouchableOpacity
                    style={{flexDirection:'row', flex:1, marginTop:10, marginHorizontal: 10, marginBottom: 20 }}
                    onPress={() => {navigation.navigate('His_imageviewer', {dataURI:dataItem.moteur_hs.photo_4})}}
                >                    
                    <Image source={{ uri:`${baseUrlmedia}${dataItem.moteur_hs.photo_4}`  }} style={{ width: 350, height: 200, marginHorizontal:10, borderRadius:4}} />
                    
                </TouchableOpacity>
                : null
            }
            


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
        
         { isLoadingInstalled ? loading() : renderContentView()}

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

export default DetailsReparation;