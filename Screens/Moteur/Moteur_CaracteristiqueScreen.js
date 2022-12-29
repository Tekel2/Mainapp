import React, { Component, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';



const Moteur_CaracteristiqueScreen = ({navigation, route}) => {

    const {moteurItem} = route.params
   
    // useEffect(()=>{
    //     console.log(moteurItem)
    // },[])


 
    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
        <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{ flexDirection: 'column'}}>
            <View style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
                <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/logo-entete.png")}/>
            </View>
        
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center',}}>
            <Text style={{fontSize: 20, color: '#316094', fontWeight: '500'}}>Caractéristiques MOTEUR : </Text>
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold', marginLeft:15}}>{moteurItem.item_moteur}</Text>
          </View>

         { ! moteurItem.moteur.install ?
            <View style={{justifyContent: 'center', alignContent: 'center',marginTop: 10,}}>
           
                <TouchableOpacity
                    onPress={() =>navigation.navigate('moteur_install',{moteurItem:moteurItem})}
                >
                    <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/btn_install.png")}/>
                </TouchableOpacity>
                
            </View>
            :
            null
          }
        </View>

        <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}>
         <View style={{flexDirection:'column'}}>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> {moteurItem.moteur.marque}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> marque</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> {moteurItem.moteur.type_moteur}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> type de moteur</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> {moteurItem.moteur.numeroserie}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> Numéro de Série</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> V {moteurItem.moteur.tension_triangle} | A {moteurItem.moteur.courant_triangle}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> couplage triange</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> V {moteurItem.moteur.tension_etoile} | A {moteurItem.moteur.courant_etoile}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> couplage étoile</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{moteurItem.moteur.puissance} KW</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> puissance</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{moteurItem.moteur.tour_min} Tr/min</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> fréquence de rotation</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> {moteurItem.moteur.frequence} Hz</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}>fréquence</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{moteurItem.moteur.cosfi}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> facteur de puissance</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{moteurItem.moteur.temperature_ambiante_user}°C</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> température ambiante max</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{moteurItem.moteur.rendement} %</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}>rendement</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>{moteurItem.moteur.phase}</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}>{ moteurItem.moteur.phase > 1 ? "Phases" : "Phase"}</Text>
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
      paddingRight: 10,
      justifyContent: 'center',
      alignContent:'center'
    },
    etatprovenance:{
        fontSize: 20, 
        color: '#111', 
        fontWeight: 'bold',
        borderWidth: 1.2,
        borderRadius: 6,
        borderColor:'#ED7524',
        width: 88,
        textAlign: 'center',
        padding: 6,
        backgroundColor: '#ED7524',
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
    txtcat:{
        fontSize: 25, 
        color:'#111', 
        textAlign:'center',
        fontWeight: '900',
        
    },
    txtcat_designa:{fontWeight:'500', color:'rgba(49, 96, 148, 1)'}
   
   
  });

export default Moteur_CaracteristiqueScreen;