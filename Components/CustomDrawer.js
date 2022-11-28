import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, Modal, Pressable, TextInput } from 'react-native';


import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer'
import { Drawer } from 'react-native-paper';
 
// import  Icon  from 'react-native-vector-icons/MaterialCommunityIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Row } from 'react-native-table-component';
// import Icon from 'react-native-vector-icons/EvilIcons'


export function CustomDrawer (props){
    return(
       <View style={styles.MainContainer}>
         <DrawerContentScrollView 
            {...props} 
            contentContainerStyle={{backgroundColor:'#316094'}}>
            <View style={{padding:10, paddingBottom:30, justifyContent:'center', alignContent:'center', borderBottomRightRadius:8}}>
                <Text style={{textAlign:'center', fontSize:22, fontWeight:'bold', color:'#ED7524'}}>CIMAF | CAMEROUN </Text>
                <View style={{marginTop:20, marginLeft:10}}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'#E4E4E4'}}>TEKEU</Text>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'#E4E4E4'}}>Superviseur</Text>
                </View>
            </View>
            <View style={{backgroundColor:'#fff', }}>
                <DrawerItemList{...props} />
            </View>
        </DrawerContentScrollView>
        <View>
            <TouchableOpacity 
                onPress={() =>{}}
                style={{paddingVertical:15}}
            >
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:15,fontFamily:'Roboto-medium',marginLeft:5}}>Out site item</Text>


            </View>

            </TouchableOpacity>
        </View>
       </View>
    )
}


const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      
    //   backgroundColor:'#316094',

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