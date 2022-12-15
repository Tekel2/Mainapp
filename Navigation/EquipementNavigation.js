  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import rechercheatelier from '../Screens/Equipement/rechercheatelier';
import EquipementList from '../Screens/Equipement/EquipementList';
import Form_new_eqt from '../Screens/Equipement/Form_new_eqt';


const Stack = createStackNavigator();



const EquipementNavigation = ({navigation}) => (
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
        <Stack.Screen name="Equipement" component={EquipementList}/>
        <Stack.Screen name="rechercherAtelier" component={rechercheatelier}/>
        <Stack.Screen name="Form_new_eqt_" component={Form_new_eqt}/>
      
    </Stack.Navigator>
);

export default EquipementNavigation


