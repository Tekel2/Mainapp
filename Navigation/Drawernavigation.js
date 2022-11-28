import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

// import CustomDrawer from '../Components/CustomDrawer'
import SplashScreen from '../Screens/SplashScreen'
import HomeScreen from '../Screens/HomeScreen'
import { CustomDrawer } from '../Components/CustomDrawer';


const Drawer = createDrawerNavigator();




export default function Drawernavigation() {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{headershow:false}}>
          <Drawer.Screen name="Splash" component={SplashScreen}/>
          <Drawer.Screen name="Home" component={HomeScreen}options={{
            title:'',          
            }}/>
        {/* <Drawer.Screen name="MenuMoteur" component={MenuMoteurScreen}/>
          <Drawer.Screen name="caracteristique" component={CaracteristiqueScreen}/>
          <Drawer.Screen name="bilanMoteur" component={BilanMoteurScreen}/>
          <Drawer.Screen name="Form_HorService" component={Form_HorserviceScreen}/>
          <Drawer.Screen name="Form_Insatll" component={Form_Installation}/>
          <Drawer.Screen name="Form_Cur" component={Form_Inter_Cur_Screen}/>
          <Drawer.Screen name="Form_Pre" component={Form_Inter_Prev_Screen}/> */}
      </Drawer.Navigator>
    );
  }