import React from 'react'
// import { View, Text } from 'react-native'


import { NavigationContainer } from '@react-navigation/native'

import MainStackNavigator from './Navigation/MainStackNavigator'



const App = () =>{
  return(
  <NavigationContainer>
      <MainStackNavigator/>              
  </NavigationContainer>
  )
}

export
 default App