  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import ReparationList from '../Screens/ReparationList';
import ReparationDetail from '../Screens/ReparationDetail';
import Formreparation from '../Screens/Formreparation';
import Recherche_moteur from '../Screens/Recherche_moteur';


const Stack = createStackNavigator();



const PlanningNavigator = ({navigation}) => (
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
        <Stack.Screen name="Repartion" component={ReparationList}/>
        <Stack.Screen name="Repartion_detail" component={ReparationDetail}/>
        <Stack.Screen name="Repartion_form" component={Formreparation}/>
        <Stack.Screen name="Repartion_find" component={Recherche_moteur}/>
        
      
    </Stack.Navigator>
);

export default PlanningNavigator


