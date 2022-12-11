  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AtelierList from '../Screens/AtelierList';
import rechercheatelier from '../Screens/rechercheatelier';
import Form_new_atelier from '../Screens/Form_new_atelier';


const Stack = createStackNavigator();



const AtelierNavigation = ({navigation}) => (
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
        <Stack.Screen name="Atelier" component={AtelierList}/>
        <Stack.Screen name="Form_atelier" component={Form_new_atelier}/> 
      
    </Stack.Navigator>
);

export default AtelierNavigation


