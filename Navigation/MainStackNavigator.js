  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../Screens/SplashScreen'
import HomeScreen from '../Screens/HomeScreen'
import MenuMoteurScreen from '../Screens/MenuMoteurScreen'
import CaracteristiqueScreen from '../Screens/CaracteristiqueScreen'
import Form_HorserviceScreen from '../Screens/Form_HorserviceScreen'
import Form_Installation from '../Screens/Form_Installation'
import Form_Inter_Cur_Screen from '../Screens/Form_Inter_Cur_Screen'
import Form_Inter_Prev_Screen from '../Screens/Form_Inter_Prev_Screen'
import BilanMoteurScreen from '../Screens/BilanMoteurScreen'


const Stack = createStackNavigator();



const MainStackNavigator = ({navigation}) => (
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
        {/* <Stack.Screen name="Home" component={HomeScreen}options={{
          title:'',
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} 
            backgroundColor="#1B2F70" onPress ={ () =>{navigation.openDrawer()} }>
            </Icon.Button>
          )
          }}/> */}


        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}options={{
          title:'',          
          }}/>
        <Stack.Screen name="MenuMoteur" component={MenuMoteurScreen}/>
        <Stack.Screen name="caracteristique" component={CaracteristiqueScreen}/>
        <Stack.Screen name="bilanMoteur" component={BilanMoteurScreen}/>
        <Stack.Screen name="Form_HorService" component={Form_HorserviceScreen}/>
        <Stack.Screen name="Form_Insatll" component={Form_Installation}/>
        <Stack.Screen name="Form_Cur" component={Form_Inter_Cur_Screen}/>
        <Stack.Screen name="Form_Pre" component={Form_Inter_Prev_Screen}/>
        
        


        {/* <Stack.Screen name="ProfileDetails" component={ProfileDetailsSreen}options={{
          title:'Profile',
          }}/> */}
    </Stack.Navigator>
);

export default MainStackNavigator
