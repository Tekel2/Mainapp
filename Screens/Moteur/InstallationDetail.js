import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, RefreshControl, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const InstallationDetail = ({navigation,route}) => {

  const {moteurItem} = route.params
  const [dataInstal , setDatainstall] = useState([])
  const [dataAteler , setDataAtelier] = useState([])
  const [isLoadingInstalled, setIsLoadingInstalled] = useState(true)
      
  const [dataMoteur, setDataMoteur] = useState([])

//   function getData(){
//     return route.params.moteurItem
//   }

//   useEffect(()=>{
//    setDataMoteur(getData)
//   }, [])
  
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    fetchDataInstallation("http://192.168.227.30:8000/api/moteur_installed",moteurItem.id )
  }, []);


  useEffect(() =>{
    console.log(moteurItem)
    fetchDataInstallation("http://192.168.227.30:8000/api/moteur_installed",moteurItem.id )
  }, [])

//   useEffect(() =>{
//     if(!isLoadingInstalled){
//         fetchDataAtelier("http://192.168.227.30:8000/api/atelier",dataInstal.equipement.id )
//     }
//   }, [])

  
  

  const fetchDataInstallation = async (url, id_installed) => {
    let lien = url +"/"+ id_installed
    // console.log(lien)
    setIsLoadingInstalled(true)
    // console.log(dataMoteur)
    try{
      const response = await fetch(lien)
      if (response.status == 200){
        const json = await response.json()
        setDatainstall(json);
        setIsLoadingInstalled(false)

        console.log(json.atelier.nom_atelier)
        
        // fetchDataAtelier("http://192.168.227.30:8000/api/atelier",json.equipement.id )
        
        console.log(json.technicien.username)

      }
      else if (response.status == 401){
        setDatainstall([]);
        setIsLoadingInstalled(false);

      }
      
      console.log(response.status)
    } catch (error){
      console.log(error)
      setIsLoadingInstalled(false)
    }
  }

  const fetchDataAtelier = async (url, id_atelier) => {
    let lien = url +"/"+ id_atelier
    console.log(lien)
    try{
      const response = await fetch(lien)
      if (response.status == 200){
        const json = await response.json()
        setDataAtelier(json);
        setIsLoadingInstalled(false)

        // setFiltrerData(json);
        console.log(json)

      }
      else if (response.status == 401){
        setDataAtelier([]);
        // setFiltrerData([]);

      }
      
      // console.log(json)
      console.log(response.status)
    } catch (error){
      console.log(error)
    }
  }

  const loading =()=>{
    if (!isLoadingInstalled){
        return(
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator color='#000' size={'large'}/>
            </View>
        )
    }
  }


  const renderContentView=()=>{
    return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
        <View >
            <Text style={{flexWrap:'wrap', fontWeight: 'bold', fontSize:20, color:'#0A233E'}}>
            Détail moteur installé</Text>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Item Installation</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataInstal.item_installation}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Item Moteur</Text>
            </View>
           <View style={{flex:1,}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataInstal.moteur.item_moteur}</Text>
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
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataInstal.atelier.nom_atelier}</Text>
            </View>
        </View>
        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Sur l'Equipement</Text>
            </View>
           <View style={{flex:1}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataInstal.equipement.item_equipenent}</Text>
            </View>
        </View>


        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Superviseur Par </Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataInstal.superviceur.username}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Intallé par :</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataInstal.technicien.username}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Date Installation</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}>{dataInstal.createdOn}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Motif de remplacement</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.motif_remplacement}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Observation avant</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.observation_avant}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Observation Après</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.observation_apres}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Couplage</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.couplage}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>continuite u1 U2</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.continuite_u1_U2}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>continuite v1 v2</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.continuite_v1_v2}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>continuite w1 w2</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.continuite_w1_w2}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement w2 u2</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.isolement_bobine_w2_u2}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement w2 v2</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.isolement_bobine_w2_v2}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement u2 v2</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.isolement_bobine_u2_v2}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement masse u1</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.isolement_bobine_masse_u1_m}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolementmasse v1</Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.isolement_bobine_masse_v1_m}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>isolement masse w1 </Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.isolement_bobine_masse_w1_m}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10,borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Sérage </Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.serage?'Parfait':'Nom'}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:10, borderBottomWidth:1, marginHorizontal: 10}}>
           <View style={{flex:1, marginLeft:10,justifyContent:'center'}}> 
                <Text style={{fontStyle:'italic', fontSize:18, color:'#000'}}>Equilibrage </Text>
            </View>
           <View style={{flex:1, marginLeft:10}}> 
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0A233E'}}> {dataInstal.equilibrage?'Parfait':'Nom'}</Text>
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
        <ScrollView style={{flex:1, flexDirection:'column', paddingBottom:50, marginBottom:10,borderRadius:8, borderWidth:1}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}
            
        >
            { isLoadingInstalled ? loading() : renderContentView()}
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

export default InstallationDetail;