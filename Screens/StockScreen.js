import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';



const StockScreen = ({navigation}) => {


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

export default StockScreen;