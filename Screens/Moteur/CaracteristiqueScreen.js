import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';



const CaracteristiqueScreen = ({navigation}) => {


  const [data, setData] = React.useState({
    
  });

 
    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
        {/* <StatusBar backgroundColor='#316094' barStyle='light-content'/> */}
        <View style={{ flexDirection: 'column'}}>
            {/* <View style={{justifyContent: 'center', alignContent: 'center',margin: 10,}}>
                <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
            </View>
        
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center',}}>
            <Text style={{fontSize: 20, color: '#316094', fontWeight: 'bold'}}>MOTEUR : </Text>
            <Text style={{fontSize: 20, color: '#ED7524', fontWeight: 'bold', marginLeft:15}}>5JM11-65468</Text>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop:10 , 
                       }}>
            <Text style={{fontSize: 20, color: '#111', fontWeight: 'bold'}}> Dans l'atelier SECHEUR</Text>
            <Text style={{fontSize: 20, color: '#111', fontWeight: 'bold'}}> Sur l'√©quiment COMPRESSEUR</Text>
          </View> */}
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop:10}}>
            <Text style={styles.etatprovenance}> NEUF</Text>
            <Text style={[styles.etatprovenance, {width: 200, marginLeft:15, color: '#000'}]}> RECONDITIONN√©</Text>
          </View>
        </View>

        {/* <ScrollView style={{ flex:9, marginTop:10,marginBottom: 5, paddingBottom:5}}> */}
         <View style={{flexDirection:'column'}}>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> CAPSULE</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> marque</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> LS 90 lz</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> type de moteur</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> 595257/3</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> num√©ro de s√©rie</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> V 220 | A 6,65</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> couplage triange</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}> V3 80 | A 3,84</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> couplage √©toile</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>1,5KW</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> puissance</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>1440 Tr/min</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> fr√©quence de rotation</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>50Hz</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}>fr√©quence</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>0,78</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> facteur de puissance</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>37¬įC</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}> temp√©rature ambiante max</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>76%</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}>rendement</Text>
            </View>
            <View style={styles.cat}>
                <Text style={styles.txtcat}>Tr√©phas√©</Text>
                <Text style={[styles.txtcat,styles.txtcat_designa]}>phase</Text>
            </View>
            
         </View>
                   
        {/* </ScrollView> */}
           

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // MainContainer: {
    //   flex: 1,
    //   backgroundColor: '#E4E4E4',
    //   paddingTop: 10,
    //   paddingLeft: 10, 
    //   paddingRight: 10,
    //   justifyContent: 'center',
    //   alignContent:'center'
    // },
    etatprovenance:{
        fontSize: 18, 
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
        fontSize: 20, 
        color:'#111', 
        textAlign:'center',
        fontWeight: '900',
        
    },
    txtcat_designa:{
        fontWeight:'500', 
        fontSize:18,
        fontStyle:'italic',
        color:'rgba(49, 96, 148, 1)'}
   
   
  });

export default CaracteristiqueScreen;