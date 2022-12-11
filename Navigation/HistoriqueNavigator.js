  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import MenuMoteurScreen from '../Screens/MenuMoteurScreen'
import CaracteristiqueScreen from '../Screens/CaracteristiqueScreen'
import Form_HorserviceScreen from '../Screens/Form_HorserviceScreen'
import Form_Installation from '../Screens/Form_Installation'
import Form_Inter_Cur_Screen from '../Screens/Form_Inter_Cur_Screen'
import Form_Inter_Prev_Screen from '../Screens/Form_Inter_Prev_Screen'
import HistoriqueMenu from '../Screens/HistoriqueMenu';
import HistoriquePreventive from '../Screens/HistoriquePreventive';
import HistoriqueCurative from '../Screens/HistoriqueCurative';
import HistoriqueHS from '../Screens/HistoriqueHS';
import HistoriqueInstallation from '../Screens/HistoriqueInstallation';
import HistoriqueReparation from '../Screens/HistoriqueReparation';


const Stack = createStackNavigator();



const HistoriqueNavigator = ({navigation}) => (
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
        {/* <Stack.Screen name="Splash" component={SplashScreen}/> */}
        {/* <Stack.Screen name="Historique" component={HistoriqueMenu}/> */}
        <Stack.Screen name="Historique" component={HistoriqueMenu}/>
        <Stack.Screen name="His_preventive" component={HistoriquePreventive}/>
        <Stack.Screen name="His_curative" component={HistoriqueCurative}/>
        <Stack.Screen name="His_hs" component={HistoriqueHS}/>
        <Stack.Screen name="His_install" component={HistoriqueInstallation}/>
        <Stack.Screen name="His_reparation" component={HistoriqueReparation}/>
        <Stack.Screen name="Form_edit_prev" component={Form_Inter_Prev_Screen}/>
      
    </Stack.Navigator>
);

export default HistoriqueNavigator


