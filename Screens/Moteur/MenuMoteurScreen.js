//This is an example code for NavigationDrawer//
import React, { useContext, useEffect, useState } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/Authcontext';





const MenuMoteurScreen = ({navigation, route}) => {


  const {userInfo,access_token} = useContext(AuthContext)

  const [dataMoteur, setDataMoteur] = useState([])
  

  const {moteurItem} = route.params

  function getData(){
    return moteurItem
  }

  useEffect(()=>{
  //  setDataMoteur(getData)
  console.log(userInfo.fonction)
  }, [])
  
    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
        <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
            <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/logo-entete.png")}/>
        </View>

        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 20, color: '#316094', fontWeight: 'bold'}}>MOTEUR : </Text>
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold', marginLeft:15}}>{moteurItem.moteur.item_moteur}</Text>
          </View>
         

          <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop:15,}}>
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold'}}>Informations</Text>
            <View style={{paddingLeft:20, marginTop:15}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('caracteristique', {moteurItem:moteurItem})}
                >
                  <Text style={styles.btninfo}>Caractéristiques</Text>
                </TouchableOpacity>
                
               { moteurItem.moteur.install ?
               <TouchableOpacity
                  onPress={() => navigation.navigate('moteur_installed_info', {moteurItem:moteurItem})}
                >
                  <Text style={styles.btninfo}>Détails Installation</Text>
                </TouchableOpacity>: null}

                {moteurItem.moteur.install ? 
                  <TouchableOpacity
                    onPress={() => navigation.navigate('bilanMoteur', {moteurItem:moteurItem})}
                  >
                    <Text style={styles.btninfo}>Bilan Moteur</Text>
                  </TouchableOpacity> : null}
            </View>
          </View>


          <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop:15,}}>
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold'}}>Interventions</Text>
            <View style={{paddingLeft:20, marginTop:15}}>
                { moteurItem.moteur.install ?
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Form_Cur', {moteurItem:moteurItem})}
                  >
                    <Text style={styles.btninfo}>Curative</Text>
                  </TouchableOpacity> : null}

                { moteurItem.moteur.install &&  userInfo.fonction < 3 ?
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Form_HorService', {moteurItem:moteurItem})}
                  >
                    <Text style={styles.btninfo}>Hors service</Text>
                  </TouchableOpacity> : null}

                  {
                    !moteurItem.moteur.install  ?
                    <View style={{flex:1, alignItems:'center', }}>
                      <Text style={{color:'#555', fontSize:18}}>Le moteur n'étant pas installé, les Interventions sont indisponible</Text>
                    </View>
                    :
                    null
                  }

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
   btninfo: {
    fontSize: 20, 
    color: '#827878', 
    fontWeight: 'bold', 
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: '#827878',
    borderRadius:8,
    width: 180,
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
   
  });

  // const mapStateToProps = (state) => {
  //   return {
  //     favoritesProfile: state.favoritesProfile
  //   }
  // }
  
export default MenuMoteurScreen;
  // export default connect(mapStateToProps)(RechercheSreen)








