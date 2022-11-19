import React from 'react'
// import { View, Text } from 'react-native'


import { NavigationContainer } from '@react-navigation/native'

import MainStackNavigator from './Navigation/MainStackNavigator'

// import LoginScreen from './Screens/LoginScreen'
// import HomeScreen from './Screens/HomeScreen';
// import MenuMoteurScreen from './Screens/MenuMoteurScreen'


const App = () =>{
  return(
    // <HomeScreen/>
    // <MenuMoteurScreen/>
  // <LoginScreen/>
  <NavigationContainer>
      <MainStackNavigator/>              
  </NavigationContainer>
  )
}

export
 default App