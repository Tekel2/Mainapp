  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Planninglist from '../Screens/HomeScreen';
import Form_new_planning from '../Screens/Form_new_planning';
import Recherche_moteur from '../Screens/Recherche_moteur';
import Planninglist_admin from '../Screens/Planninglist_admin';


const Stack = createStackNavigator();

const PlanningNavigator = ({navigation}) => (
    <Stack.Navigator 
      screenOptions={{
        headershow:false,
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
        <Stack.Screen name="Planning" component={Planninglist_admin}/>
        <Stack.Screen name="Planning_new" component={Form_new_planning}/>
        <Stack.Screen name="Planning_find" component={Recherche_moteur}/>
      
    </Stack.Navigator>
);

export default PlanningNavigator


