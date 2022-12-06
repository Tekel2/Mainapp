import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

// import CustomDrawer from '../Components/CustomDrawer'
import SplashScreen from '../Screens/SplashScreen'
import HomeScreen from '../Screens/HomeScreen'
import { CustomDrawer } from '../Components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeNavigator from './HomeNavigator';
import MenuMoteurScreen from '../Screens/MenuMoteurScreen';
import PlannindNavigator from './PlanningNavigator';
import HistoriqueNavigator from './HistoriqueNavigator';
import ReparationNavigator from './ReparationNavigator';
import MoteurNavigator from './MoteurNavigator';


const Drawer = createDrawerNavigator();




export default function Drawernavigation() {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{headershow:false}}>
          <Drawer.Screen name='Home' component={HomeNavigator}/>
          <Drawer.Screen name="Moteur" component={MoteurNavigator }/>
          <Drawer.Screen name="Planning" component={PlannindNavigator}/>
          <Drawer.Screen name="Repartion" component={ReparationNavigator}/>
          <Drawer.Screen name="Historique" component={HistoriqueNavigator}/>
      </Drawer.Navigator>
    );
  }