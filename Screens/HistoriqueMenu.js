import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';



const HistoriqueMenu = ({navigation}) => {


  const [data, setData] = useState({
    
  });

 
    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
        <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
            <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/logo-entete.png")}/>
        </View>
        <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
            <View style={{marginTop:20, marginBottom:20}}>
                <Text style={{fontSize: 22, flexWrap:'wrap', fontWeight:'bold', color:'#0A233E'}}>Historique des Interventions</Text>
            </View>
            <View style={{flexDirection:'column'}}>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('His_preventive')}
                //   onPress={() => navigation.navigate('bilanMoteur', {moteurItem:moteurItem})}

                >
                    <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
                        <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/btn_preventive.png")}/>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
                        <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/btn_curative.png")}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
                        <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/btn_hs.png")}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
                        <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/btn_install_2.png")}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
                        <Image style={{alignSelf:'center',}} source={require("./sources/assets/images/btn_reparation.png")}/>
                    </View>
                </TouchableOpacity>

               
            </View>
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
   
   
  });

export default HistoriqueMenu;