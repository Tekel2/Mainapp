  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ReparationList from '../Screens/Reparation/ReparationList';
// import Recherche_moteur from '../Screens/Planning/Recherche_moteur';


// import ReparationList from '../Screens/Reparation/ReparationList';
import ReparationDetail from '../Screens/Reparation/ReparationDetail';
import Formreparation from '../Screens/Reparation/Formreparation';
import Recherche_moteur from '../Screens/Reparation/Recherche_moteur';
import Form_RetourReparation from '../Screens/Reparation/Form_RetourReparation';


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
        <Stack.Screen name="Repartion_form_retout" component={Form_RetourReparation}/>
        <Stack.Screen name="Repartion_find" component={Recherche_moteur}/>
        
      
    </Stack.Navigator>
);

export default PlanningNavigator


