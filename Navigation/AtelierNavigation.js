  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AtelierList from '../Screens/AtelierList';


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
        {/* <Stack.Screen name="His_preventive" component={HistoriquePreventive}/>
        <Stack.Screen name="Form_edit_prev" component={Form_Inter_Prev_Screen}/> */}
      
    </Stack.Navigator>
);

export default AtelierNavigation


