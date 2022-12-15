  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import LoginScreen from '../Screens/LoginScreen';


const Stack = createStackNavigator();



const AuthNavigator = ({navigation}) => (
    <Stack.Navigator 
      screenOptions={{
        headerStyle:{
          backgroundColor:'#1B2F70'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
          fontWeight: 'bold'
        }
        }}
        headerMode='none'
        >
        {/* <Stack.Screen name="Splash" component={SplashScreen}/> */}
        {/* <Stack.Screen name="Historique" component={HistoriqueMenu}/> */}
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      
    </Stack.Navigator>
);

export default AuthNavigator


