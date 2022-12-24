import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

// import CustomDrawer from '../Components/CustomDrawer'
import { CustomDrawer } from '../Components/CustomDrawer';


import HomeNavigator from './HomeNavigator';
import PlannindNavigator from './PlanningNavigator';
import HistoriqueNavigator from './HistoriqueNavigator';
import ReparationNavigator from './ReparationNavigator';
import MoteurNavigator from './MoteurNavigator';
import AtelierNavigation from './AtelierNavigation';
import EquipementNavigation from './EquipementNavigation';


const Drawer = createDrawerNavigator();


export default function Drawernavigation() {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{headershow:false}}>
          <Drawer.Screen name='Home' component={HomeNavigator}/>
          <Drawer.Screen name="Moteur" component={MoteurNavigator }/>
          <Drawer.Screen name="Planning" component={PlannindNavigator}/>
          {/* <Drawer.Screen name="Reparation" component={ReparationNavigator}/> */}
          <Drawer.Screen name="Historique" component={HistoriqueNavigator}/>
          <Drawer.Screen name="Atelier" component={AtelierNavigation}/>
          <Drawer.Screen name="Equipement" component={EquipementNavigation}/>
      </Drawer.Navigator>
    );
  }