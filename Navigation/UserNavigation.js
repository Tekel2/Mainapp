  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import MoteurListScreen from '../Screens/Moteur/MoteurListScreen';
import MenuMoteurScreen from '../Screens/Moteur/MenuMoteurScreen';
import Moteur_CaracteristiqueScreen from '../Screens/Moteur/Moteur_CaracteristiqueScreen';
import Form_New_Moteur from '../Screens/Moteur/Form_New_Moteur'

// import MoteurList from '../Screens/MoteurList'
// import MoteurNew from '../Screens/MoteurNew';
// import MoteurDetail from '../Screens/Moteur/MoteurDetail'
// import Form_New_Moteur from '../Screens/Form_New_Moteur';
import Form_Installation from '../Screens/Moteur/Form_Installation';
// import Moteur_CaracteristiqueScreen from '../Screens/Moteur_CaracteristiqueScreen';
// import MoteurListScreen from '../Screens/MoteurListScreen';
// import MenuMoteurScreen from '../Screens/MenuMoteurScreen';
import BilanMoteurScreen from '../Screens/Moteur/BilanMoteurScreen';
import Form_HorserviceScreen from '../Screens/Moteur/Form_HorserviceScreen';
import Form_Inter_Cur_Screen from '../Screens/Moteur/Form_Inter_Cur_Screen';
import InstallationDetail from '../Screens/Moteur/InstallationDetail';
import RegisterUserScreen from '../Screens/Users/RegisterUserScreen';

const Stack = createStackNavigator();



const UserNavigation = ({navigation}) => (
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
        <Stack.Screen name="Compte" component={RegisterUserScreen}/>
        {/* <Stack.Screen name="moteur_new_moteur" component={Form_New_Moteur}/>
        <Stack.Screen name="caracteristique" component={Moteur_CaracteristiqueScreen}/>
        <Stack.Screen name="moteur_install" component={Form_Installation}/>
        <Stack.Screen name="moteur_installed_info" component={InstallationDetail}/>

        <Stack.Screen name="MenuMoteur" component={MenuMoteurScreen}/>
        <Stack.Screen name="bilanMoteur" component={BilanMoteurScreen}/>
        <Stack.Screen name="Form_HorService" component={Form_HorserviceScreen}/>
        <Stack.Screen name="Form_Cur" component={Form_Inter_Cur_Screen}/> */}
      
    </Stack.Navigator>
);

export default UserNavigation


