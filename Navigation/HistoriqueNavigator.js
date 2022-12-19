  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HistoriqueMenu from '../Screens/Historique/HistoriqueMenu';
import HistoriqueHS from '../Screens/Historique/HistoriqueHS';
import Form_Inter_Prev_Screen from '../Screens/Form_Inter_Prev_Screen';

// import Form_Inter_Prev_Screen from '../Screens/Historique/Form_Inter_Prev_Screen'
// import HistoriqueMenu from '../Screens/Historique/HistoriqueMenu';
// import HistoriquePreventive from '../Screens/Historique/HistoriquePreventive';
// import HistoriqueCurative from '../Screens/Historique/HistoriqueCurative';
// import HistoriqueHS from '../Screens/Historique/HistoriqueHS';
// import HistoriqueInstallation from '../Screens/Historique/HistoriqueInstallation';
// import HistoriqueReparation from '../Screens/Historique/HistoriqueReparation';


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
        <Stack.Screen name="Form_edit_prev" component={Form_Inter_Prev_Screencreen}/>
      
    </Stack.Navigator>
);

export default HistoriqueNavigator


