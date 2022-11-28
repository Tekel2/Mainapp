  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MoteurList from '../Screens/MoteurList'
import MoteurNew from '../Screens/MoteurNew';
import MoteurDetail from '../Screens/MoteurDetail'
import Form_New_Moteur from '../Screens/Form_New_Moteur';
import Form_Installation from '../Screens/Form_Installation';
import Moteur_CaracteristiqueScreen from '../Screens/Moteur_CaracteristiqueScreen';
const Stack = createStackNavigator();



const MoteurNavigator = ({navigation}) => (
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
        <Stack.Screen name="moteur_Home" component={MoteurList}/>
        <Stack.Screen name="moteur_new_moteur" component={Form_New_Moteur}/>
        <Stack.Screen name="moteur_detail" component={Moteur_CaracteristiqueScreen}/>
        <Stack.Screen name="moteur_install" component={Form_Installation}/>
      
    </Stack.Navigator>
);

export default MoteurNavigator


