// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

function  MoteurInstalledItem ({route, navigation }) {

  // _displayFavoriteImage() {
    
  //   // if (this.props.profile.id === this.props.favoritesProfileStore[0].id) {
  //   //   // Si la props isFilmFavorite vaut true, on affiche le 🖤
  //   //   return (
  //   //     <Image
  //   //       style={styles.favorite_image}
  //   //       source={require('../image/favorite heart.png')}
  //   //     />
  //   //   )
  //   // }
  // }



  // render() 
    // const moteur = this.props.moteur
    const moteur =  route.params.moteur
    // const _displaysprofiledetail = this.props._displaysprofiledetail
    
    return (
      <View style={{marginBottom:6, flexDirection:'column',  justifyContent: 'flex-start', flex:1}}>
            <TouchableOpacity 
              style={{flexDirection:'row', height:70, }}
              onPress={() => navigation.navigate('MenuMoteur')}
              >
                <View style={{flex:1,borderTopLeftRadius: 5, borderBottomLeftRadius:5,borderWidth:1, borderColor:'#316094', justifyContent: 'center', alignContent: 'center'}}>
                    <Image style={{alignSelf:'center',}} source={require("../Screens/sources/assets/images/icon-moteur.png")}/>
                </View>
                <View style={{flex: 5, backgroundColor:'#316094', paddingLeft: 10,borderTopRightRadius: 5, borderBottomRightRadius:5 }}>
                  <Text style={{fontSize: 20, color:'#E4E4E4', fontWeight:'900'}}>5JM11-65468</Text>
                  <Text style={{fontSize: 16, color:'#E4E4E4', fontWeight:'900'}}>{moteur.atelier}</Text>
                  <Text style={{fontSize: 16, color:'#E4E4E4', fontWeight:'900'}}>{moteur.equipement} </Text>
                </View>
            </TouchableOpacity>
      </View>
    )
  
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: '#1B2F70',
    marginBottom: 5,
    height: 120,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    flex: 1,
  },
  main_container_: {
    height: 120,
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: '#1B2F70',
    padding: 5,
    backgroundColor: '#efefef',
    borderBottomLeftRadius: 15,
    borderBottomWidth: 1.5,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  view_header_container: {
      flexDirection: 'row',
      flex: 0.71,
  },
  text_profilefonction:{
      flex: 1,
      flexWrap: 'wrap',
      fontWeight: 'bold',
      fontSize: 18
  },
  text_Note: {
      fontWeight: 'bold',
      fontSize: 22,
      color: '#666666'
  },
  text_profile_name:{
    fontSize:15,
    fontStyle: 'italic',
    color: '#666666'

  },
  view_Localisation_container: {
    flexDirection: 'row',
    flex: 0.5,
    padding: 0,
    margin: 0,
  },
  text_localisation: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555555',
    fontStyle: 'italic'
  },
  text_avis:{
    textAlign: 'right',
    fontWeight: '100',
    color: '#4a4a4a'
  },
  view_body: {
      flexDirection: 'row',
      flex: 2
  },
  image: {
    width: 65,
    height: 65,
    margin: 5,
    backgroundColor: 'gray',
    borderRadius: 4
  },
  view_contain_body: {
    flex: 1
  },
  text_body: {
    flexWrap: 'wrap'
  },
  favorite_image: {
    width: 28,
    height: 28,
    marginRight: 5
  }
})

export default MoteurInstalledItem