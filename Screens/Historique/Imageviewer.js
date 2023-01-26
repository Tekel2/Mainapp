
import React from 'react'
import { View, StyleSheet, Image, StatusBar } from 'react-native'
import { baseUrlmedia } from '../../API/urlbase'

const Imageviewer=({route}) =>{
    const {dataURI} = route.params

    return (
    <View style={styles.MainContainer}>
        <StatusBar hidden/>
        <Image source={{ uri:`${baseUrlmedia}${dataURI}`  }} 
        // style={{ width: 350, height: 200, marginHorizontal:10, borderRadius:4}} 
        style={{ flex:1, borderRadius:4}} 


        />
    </View>
    )

}

export default Imageviewer

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignContent:'center',
      backgroundColor: '#000'
    },

})