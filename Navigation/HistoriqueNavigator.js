  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HistoriqueMenu from '../Screens/Historique/HistoriqueMenu';
import HistoriqueHS from '../Screens/Historique/HistoriqueHS';
import Form_Inter_Prev_Screen from '../Screens/Form_Inter_Prev_Screen';

// import Form_Inter_Prev_Screen from '../Screens/Historique/Form_Inter_Prev_Screen'
// import HistoriqueMenu from '../Screens/Historique/HistoriqueMenu';
import HistoriquePreventive from '../Screens/Historique/HistoriquePreventive';
import HistoriqueCurative from '../Screens/Historique/HistoriqueCurative';
// import HistoriqueHS from '../Screens/Historique/HistoriqueHS';
import HistoriqueInstallation from '../Screens/Historique/HistoriqueInstallation';
import HistoriqueReparation from '../Screens/Historique/HistoriqueReparation';
import DetailsPreventive from '../Screens/Historique/DetailsPreventive';
import DetailsCurative from '../Screens/Historique/DetailsCurative';
import DetailsHS from '../Screens/Historique/DetailsHS';
import DetailsInstallation from '../Screens/Historique/DetailsInstallation';
import Imageviewer from '../Screens/Historique/Imageviewer';
import DetailsReparation from '../Screens/Historique/DetailsReparation';


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
        <Stack.Screen name="Historique" component={HistoriqueMenu}/>
        <Stack.Screen name="His_preventive" component={HistoriquePreventive}/>
        <Stack.Screen name="His_curative" component={HistoriqueCurative}/>
        <Stack.Screen name="His_hs" component={HistoriqueHS}/>
        <Stack.Screen name="His_install" component={HistoriqueInstallation}/>
        <Stack.Screen name="His_reparation" component={HistoriqueReparation}/>
        <Stack.Screen name="His_preventive_dtl" component={DetailsPreventive}/>
        <Stack.Screen name="His_curative_dtl" component={DetailsCurative}/>
        <Stack.Screen name="His_hs_dtl" component={DetailsHS}/>
        <Stack.Screen name="His_install_dtl" component={DetailsInstallation}/>
        <Stack.Screen name="His_reparartion_dtl" component={DetailsReparation}/>
        <Stack.Screen name="His_imageviewer" component={Imageviewer}/>
      
    </Stack.Navigator>
);

export default HistoriqueNavigator


