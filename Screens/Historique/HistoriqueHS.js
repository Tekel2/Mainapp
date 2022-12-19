import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';

const HistoriqueHS = ({navigation}) => {

    const [preventivelist, setPreventive] = useState([])
    const [filtrerData, setFiltrerData] = useState([])
    const [data, setData] = React.useState({
        
    });

 
    return (
        <SafeAreaView 
            style={styles.MainContainer}
        >
        <StatusBar backgroundColor='#316094' barStyle='light-content'/>
        <View style={{justifyContent: 'center', alignContent: 'center',margin: 10}}>
            <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/logo-entete.png")}/>
        </View>

        <ScrollView 
            style={{ flex:9, marginLeft:10,marginRight:10,marginBottom: 5, paddingBottom:5}}
            contentContainerStyle={styles.scrollView}
            // refreshC²²ontrol={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={onRefresh}
            //   />}
            >

            {
                preventivelist.map((item, index) =>{
                    return(
                        <View style={{marginBottom:6, flexDirection:'column',  justifyContent: 'flex-start', flex:1}}>
                        <TouchableOpacity 
                            style={{flexDirection:'row', height:70, }}
                            onPress={() => {
                                navigation.navigate('Form_edit_prev')}}
                            >
                              <View style={{flex:1,borderTopLeftRadius: 5, borderBottomLeftRadius:5,borderWidth:1, borderColor:'#316094', justifyContent: 'center', alignContent: 'center'}}>
                                  <Image style={{alignSelf:'center',}} source={require("../sources/assets/images/icon-moteur.png")}/>
                              </View>
                              <View style={{flex: 5, backgroundColor:'#316094', paddingLeft: 10,borderTopRightRadius: 5, borderBottomRightRadius:5 }}>
                                <Text style={{fontSize: 20, color:'#E4E4E4', fontWeight:'900'}}>{item.continuite_V1_V2}</Text>
                              </View>
                          </TouchableOpacity>
                    </View>
                  )
                }) 
            }
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

export default HistoriqueHS;