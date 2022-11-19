//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import {getProfileFromWithSearchedText} from '../API/PDBA'
import Feather from "react-native-vector-icons/Feather";




const MenuMoteurScreen = ({navigation}) => {


  const [data, setData] = React.useState({
    
  });

 
    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
        <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
            <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
        </View>

        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 20, color: '#316094', fontWeight: 'bold'}}>MOTEUR : </Text>
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold', marginLeft:15}}>5JM11-65468</Text>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop:10, 
                       }}>
            <Text style={{fontSize: 20, color: '#111', fontWeight: 'bold'}}> Dans l'atelier SECHEUR</Text>
            <Text style={{fontSize: 20, color: '#111', fontWeight: 'bold'}}> Sur l'équiment COMPRESSEUR</Text>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop:15,}}>
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold'}}>Information</Text>
            <View style={{paddingLeft:20, marginTop:15}}>
                <TouchableOpacity>
                  <Text style={styles.btninfo}>Caractéristiques</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.btninfo}>Bilan moteur</Text>
                </TouchableOpacity>

            </View>
          </View>

          <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop:15,}}>
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold'}}>Interventions</Text>
            <View style={{paddingLeft:20, marginTop:15}}>
                <TouchableOpacity>
                  <Text style={styles.btninfo}>Préventive</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.btninfo}>Installation</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.btninfo}>Curative</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.btninfo}>Hors service</Text>
                </TouchableOpacity>

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








