// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class HoraireItem extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <Text style={styles.text_horaire_jour}>Lundi </Text>
        <Text style={styles.text_horaire_heure}>6H - 18H </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginBottom: 5,
    height: 30,
    flex: 1,
    borderBottomWidth: 2,
    borderColor: '#b9b9b9',
    flexDirection: 'row'
  },
  text_horaire_jour:{
    paddingLeft: 35,
    fontSize: 19,
    color: '#101010'
  },
  text_horaire_heure: {
      textAlign: 'right',
      flex: 1,
      fontSize: 18, 
      paddingRight: 35,
      color: '#141414'
  }

})

export default HoraireItem