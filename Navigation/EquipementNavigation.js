  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import EquipementList from '../Screens/EquipementList';


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
        {/* <Stack.Screen name="His_preventive" component={HistoriquePreventive}/>
        <Stack.Screen name="Form_edit_prev" component={Form_Inter_Prev_Screen}/> */}
      
    </Stack.Navigator>
);

export default EquipementNavigation


