  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MoteurList from '../Screens/MoteurList'
import MoteurNew from '../Screens/MoteurNew';
import MoteurDetail from '../Screens/MoteurDetail'
import Form_New_Moteur from '../Screens/Form_New_Moteur';
import Form_Installation from '../Screens/Form_Installation';
import Moteur_CaracteristiqueScreen from '../Screens/Moteur_CaracteristiqueScreen';
import MoteurListScreen from '../Screens/MoteurListScreen';
import MenuMoteurScreen from '../Screens/MenuMoteurScreen';
import BilanMoteurScreen from '../Screens/BilanMoteurScreen';
import Form_HorserviceScreen from '../Screens/Form_HorserviceScreen';
import Form_Inter_Cur_Screen from '../Screens/Form_Inter_Cur_Screen';
import InstallationDetail from '../Screens/InstallationDetail';
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
        <Stack.Screen name="moteur_Home" component={MoteurListScreen}/>
        <Stack.Screen name="moteur_new_moteur" component={Form_New_Moteur}/>
        <Stack.Screen name="caracteristique" component={Moteur_CaracteristiqueScreen}/>
        <Stack.Screen name="moteur_install" component={Form_Installation}/>
        <Stack.Screen name="moteur_installed_info" component={InstallationDetail}/>

        <Stack.Screen name="MenuMoteur" component={MenuMoteurScreen}/>
        <Stack.Screen name="bilanMoteur" component={BilanMoteurScreen}/>
        <Stack.Screen name="Form_HorService" component={Form_HorserviceScreen}/>
        <Stack.Screen name="Form_Cur" component={Form_Inter_Cur_Screen}/>
      
    </Stack.Navigator>
);

export default MoteurNavigator


