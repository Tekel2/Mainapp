import React, { useEffect } from 'react'
// import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './Navigation/HomeNavigator'

import { DrawerContent } from './Screens/DrawerContent'
import HomeScreen from './Screens/HomeScreen';
import Drawernavigation from './Navigation/Drawernavigation';

import SplashScreen from 'react-native-splash-screen'

// const Drawer = createDrawerNavigator();




const App = () =>{

  //Gestion du splash Screen avant le démarage de l'application
  useEffect(() =>{
    SplashScreen.hide()
  },[])


  return(
  <NavigationContainer>
    {/* <Drawer.Navigator drawerContent={props => <DrawerContent {...props }/>}>
      <Drawer.Screen name = 'Home' component={HomeNavigator}/>
    </Drawer.Navigator> */}
    <Drawernavigation/>
    {/* <HomeNavigator/>  */}
                    
  </NavigationContainer>
   
  )
}

export
 default App