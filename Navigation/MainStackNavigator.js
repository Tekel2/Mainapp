  
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../Screens/SplashScreen'
import HomeScreen from '../Screens/HomeScreen'
import MenuMoteurScreen from '../Screens/MenuMoteurScreen'



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
        
        


        {/* <Stack.Screen name="ProfileDetails" component={ProfileDetailsSreen}options={{
          title:'Profile',
          }}/> */}
    </Stack.Navigator>
);

export default MainStackNavigator
