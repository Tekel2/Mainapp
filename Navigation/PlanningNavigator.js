  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Planninglist from '../Screens/Planninglist';
import Form_new_planning from '../Screens/Form_new_planning';
import planning_recherche_moteur from '../Screens/planning_recherche_moteur';


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
        <Stack.Screen name="Planning" component={Planninglist}/>
        <Stack.Screen name="Planning_new" component={Form_new_planning}/>
        <Stack.Screen name="Planning_find" component={planning_recherche_moteur}/>
      
    </Stack.Navigator>
);

export default PlanningNavigator


