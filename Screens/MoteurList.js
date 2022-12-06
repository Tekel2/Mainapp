import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native';


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
      "equipement": "COMPRESSEUR",
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
      "superviceur": 3
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
      "equipement": "COMPRESSEUR",
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
      "superviceur": 3
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
      "equipement": "COMPRESSEUR",
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
      "moteur": 5,
      "old_moteur": null,
      "technicien": 2,
      "superviceur": 3
  }
]

const MoteurList = ({navigation}) => {


  const [data, setData] = React.useState({
    
  });

 
    return (
        <SafeAreaView style={styles.MainContainer} >
          <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
            <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
        </View>
        <View style={{ flexDirection:'row',}}>
          <View style={{flex:1, alignContent:'flex-end'}}>
            <Text style={{paddingLeft: 20,textAlign:'left',fontSize:25,flexWrap:'wrap', fontWeight:'900', color:'#316094'}}>
            Moteur en Stock Maintenance</Text>
          </View>
          <View style={{}}>
            <TouchableOpacity
              onPress={() =>navigation.navigate('moteur_new_moteur')}
            >
              <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/btn_new.png")}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.view_liste}> 
            <FlatList 
                data={dataMoteurInstalled}
                style={{height: 100}}
                keyExtractor={(item) => item.id.toString()}
                renderItem = {({ item }) => 

                <View>
                  <View 
                    style={{marginBottom:6, 
                            flexDirection:'column',  
                            justifyContent: 'flex-start', 
                            flex:1}}>
                      <TouchableOpacity 
                          style={{flexDirection:'row', height:70, }}
                          onPress={() => navigation.navigate('moteur_detail')}
                          >
                            <View style={{flex:1,borderTopLeftRadius: 5, borderBottomLeftRadius:5,borderWidth:1, borderColor:'#316094', justifyContent: 'center', alignContent: 'center'}}>
                                <Image style={{alignSelf:'center',}} source={require("../Screens/sources/assets/images/icon-moteur.png")}/>
                            </View>
                            <View style={{flex: 5, backgroundColor:'#316094', paddingLeft: 10,borderTopRightRadius: 5, borderBottomRightRadius:5 }}>
                              <Text style={{fontSize: 20, color:'#E4E4E4', fontWeight:'900'}}>{item.id}</Text>
                              <Text style={{fontSize: 20, color:'#E4E4E4', fontWeight:'900'}}>{item.createdOn}</Text>
                            </View>

                        </TouchableOpacity>
                  </View>
                  <View>

                  </View>
                </View>

                }
            />            
          
         </View>
           

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
    view_liste: {
      flex: 6,
      marginTop: 15,
      // backgroundColor: '#1B2F70',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom:0,
    top: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },


  main_container: {
    backgroundColor: '#1B2F70',
    marginBottom: 5,
    height: 120,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row'
    // flex: 1,
  },
  main_container_: {
    height: 100,
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: '#1B2F70',
    padding: 5,
    backgroundColor: '#efefef',
    borderBottomLeftRadius: 15,
    borderBottomWidth: 1.5,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    // flexDirection: 'row'

  },
  view_header_container: {
      flexDirection: 'row',
      flex: 0.71,
  },
  text_profilefonction:{
      flex: 1,
      flexWrap: 'wrap',
      fontWeight: 'bold',
      fontSize: 18
  },
  text_Note: {
      fontWeight: 'bold',
      fontSize: 22,
      color: '#666666'
  },
  text_profile_name:{
    fontSize:15,
    fontStyle: 'italic',
    color: '#666666'

  },
  view_Localisation_container: {
    flexDirection: 'row',
    flex: 0.5,
    padding: 0,
    margin: 0,
  },
  text_localisation: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555555',
    fontStyle: 'italic'
  },
  text_avis:{
    textAlign: 'right',
    fontWeight: '100',
    color: '#4a4a4a'
  },
  view_body: {
      flexDirection: 'row',
      flex: 2
  },
  image: {
    width: 65,
    height: 65,
    margin: 5,
    backgroundColor: 'gray',
    borderRadius: 4
  },
  view_contain_body: {
    flex: 1
  },
  text_body: {
    flexWrap: 'wrap'
  },
  favorite_image: {
    width: 28,
    height: 28,
    marginRight: 5
  }
   
   
  });

export default MoteurList;