  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import MenuMoteurScreen from '../Screens/MenuMoteurScreen'
import CaracteristiqueScreen from '../Screens/CaracteristiqueScreen'
import Form_HorserviceScreen from '../Screens/Form_HorserviceScreen'
import Form_Installation from '../Screens/Form_Installation'
import Form_Inter_Cur_Screen from '../Screens/Form_Inter_Cur_Screen'
import Form_Inter_Prev_Screen from '../Screens/Form_Inter_Prev_Screen'
import BilanMoteurScreen from '../Screens/BilanMoteurScreen'
import HomeScreen from '../Screens/MoteurListScreen';
import HistoriqueMenu from '../Screens/HistoriqueMenu';
import HistoriqueSreen from '../Screens/HistoriqueScreen';
import HistoriquePreventive from '../Screens/HistoriquePreventive';
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


