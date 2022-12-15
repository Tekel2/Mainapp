  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Form_Inter_Prev_Screen from '../Screens/Form_Inter_Prev_Screen'
import HomeScreen from '../Screens/HomeScreen';


const Stack = createStackNavigator();



const HomeNavigator = ({navigation}) => (
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
        {/* <Stack.Screen name="Home" component={HomeScreen}/> */}

        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Form_Pre" component={Form_Inter_Prev_Screen}/>


        
      
      
    </Stack.Navigator>
);

export default HomeNavigator


