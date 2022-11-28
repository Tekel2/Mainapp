import React from 'react'
// import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './Navigation/MainStackNavigator'

import { DrawerContent } from './Screens/DrawerContent'
import HomeScreen from './Screens/HomeScreen';
import Drawernavigation from './Navigation/Drawernavigation';

// const Drawer = createDrawerNavigator();




const App = () =>{
  return(
  <NavigationContainer>
    {/* <Drawer.Navigator drawerContent={props => <DrawerContent {...props }/>}>
      <Drawer.Screen name = 'Home' component={MainStackNavigator}/>
    </Drawer.Navigator> */}
    <Drawernavigation/>
    {/* <MainStackNavigator/>  */}
                    
  </NavigationContainer>
   
  )
}

export
 default App