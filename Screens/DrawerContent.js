import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';


import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import { Drawer } from 'react-native-paper';
 
// import  Icon  from 'react-native-vector-icons/MaterialCommunityIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import Icon from 'react-native-vector-icons/EvilIcons'


export function DrawerContent (props){
    return(
        <View style={styles.MainContainer}>
            <DrawerContentScrollView {...props}>
                <View style={[styles.drawercontent,{borderBottomWidth:1,borderColor:'#E4E4E4', paddingBottom:20}]}>
                    <View style={styles.userInfoSection}>
                        {/* <Image style={{alignSelf:'center'}} source={require("./sources/assets/images/logo-footer.png")}/> */}

                        <View style={{flex:1, flexDirection: 'row', justifyContent:'flex-start', marginTop:10}}>
                            {/* <Text 
                                style={{flexWrap:'wrap', 
                                        fontWeight: '500',
                                        fontSize: 18,
                                        color:'#316094'}}>Bienvenue</Text> */}
                            
                            <View style={{flexDirection:'column', marginLeft: 15}}>
                                <Text style={{marginLeft:0, 
                                        fontWeight: 'bold', 
                                        fontSize: 20,
                                        color:'#ED7524'
                                        }}>TEKEU BLECK</Text>
                                <Text style={{marginLeft:0, 
                                        fontWeight: '800', 
                                        fontSize: 18,
                                        fontStyle:'italic',
                                        color:'#ED7524'
                                        }}>Superviseur</Text>

                            </View>
                        </View>
                    </View>

                   
                </View>
                <View style={{flex:1}}>
                <Drawer.Section style={styles.drawercontent}>
                        
                        <DrawerItem
                            icon={({color, size})=>(
                               
                                <Image
                                source={require('./sources/assets/images/moteur-electrique.png')}
                                />
                            )}
                            
                            label= "Nouveau Moteur"
                            onPress={() => {}}
                        />
                        <DrawerItem
                            icon={({color, size})=>(
                                <Image
                                source={require('./sources/assets/images/ionic-md-time.png')}
                                />
                            )}
                            
                            label= "Planification de maintenance"
                            onPress={() => {}}
                            style={{fontSize:18}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.botomdrawersection}>
                <DrawerItem
                    icon={({color, size})=>(
                        <Image
                            source={require('./sources/assets/images/sign-out-alt.png')}
                        />
                    )}
                    label= "Se déconnecter"
                    onPress={() => {}}
                />
            </Drawer.Section>
        </View>
    )
}


const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      padding:10,
      margin:0,
      backgroundColor:'#316094',

    },
    drawercontent:{
        flex:1,
        paddingTop:0,
        marginTop:0,

    },
    userInfoSection:{
        paddingLeft:20,
        borderColor: '#e0e0e',
        marginBottom: 20,
        
    },
    botomdrawersection:{
        marginBottom: 15,
        borderColor: '#f4f4f4',
        borderTopWidth: 1
    }
    
   
   
  });