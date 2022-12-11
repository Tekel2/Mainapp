import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, FlatList, ScrollView } from 'react-native';


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

const ReparationList = ({navigation}) => {


  // const [data, setData] = React.useState({
    
  // });
const [data , setData] = useState([])
const [filtrerData, setFiltrerData] = useState([])
const [moteuPlanning, setMoteurPlanning] = useState(false)

const [selected, setSelected] = useState();

const selectHandler = item => {
  setSelected(item);
}

useEffect(() => {
  setData(dataMoteurInstalled)
  setFiltrerData(dataMoteurInstalled)
}, []);

const togleMoteurPlanning = ( ) =>{
  setMoteurPlanning(!moteuPlanning)
}
const Stringtext =() =>{
  if (moteuPlanning){
    return(
      <Text style={{fontSize:18, color:'#000' }}>/Planning</Text>
    )
  }
  else{
    return(
      <Text style={{fontSize:18, color:'#000' }}>/moteur</Text>
    )
  }
}
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

 
    return (
        <SafeAreaView style={styles.MainContainer} >
          <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
            <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
        </View>
        <View style={{ flexDirection:'row',}}>
          <View style={{flex:1, alignContent:'flex-end'}}>
            <Text style={{paddingLeft: 20,textAlign:'left',fontSize:28,flexWrap:'wrap', fontWeight:'900', color:'#316094'}}>
            Réparation de Moteur</Text>
          </View>
          <View style={{}}>
            <TouchableOpacity
              onPress={() =>navigation.navigate('Repartion_find', {option:"repar"} )}
            >
              <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/btn_new.png")}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.view_liste}>
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
                    <View style={{flex:3, justifyContent:'center', alignContent:'center' }}>
                      <TouchableOpacity
                        onPress={() => {togleMoteurPlanning()}}
                      >
                       
                          {moteuPlanning ? Stringtext() : Stringtext()}
                      </TouchableOpacity>
                      
                    </View>
                              
                </View>            
            </View>
            <ScrollView>
                {
                  filtrerData.map((item, index) =>{
                    return(
                    <View 
                      style={{marginBottom:6, 
                              flexDirection:'row',  
                              justifyContent: 'flex-start', 
                              flex:1}}>

                          <View> 
                          </View>
                        <TouchableOpacity 
                            style={{flexDirection:'row', flex:3, height:60, }}
                            onPress={() => navigation.navigate('Repartion_detail')}
                            >
                            
                              <View style={{flex: 5, 
                                            backgroundColor:'#316094',
                                            borderTopLeftRadius:5,
                                            borderBottomLeftRadius:5,
                                             paddingLeft: 10, 
                                             justifyContent:'center',}}>
                                <Text style={{fontSize: 18, color:'#E4E4E4', fontWeight:'500'}}>ItemReparation: </Text>
                                <Text style={{fontSize: 18, color:'#E4E4E4', fontWeight:'500'}}>Préstataire: IDE </Text>
                                
                              </View>

                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={{flexDirection:'row', flex:1, height:60, }}
                          //   onPress={() => navigation.navigate('moteur_detail')}
                            // onPress={() => navigation.navigate('Planning_new',{moteurItem:item})}

                            >
                          <View style={{flex: 5,
                                      paddingLeft: 10,
                                      borderTopRightRadius: 5,
                                      borderBottomRightRadius:5,
                                      justifyContent:'center',
                                      borderWidth:1 ,
                                      borderColor:'#316094',}}>
                              <Text style={{fontSize: 18, color:'#E4E4E4', fontWeight:'900',color:'#0A233E'}}>Modifier</Text>
                          </View>

                          </TouchableOpacity>
                    </View>

                  )
                  })
              }
                 
            </ScrollView>         
          
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

export default ReparationList;