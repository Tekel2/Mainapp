import React, { useContext, useEffect } from 'react'
// import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Drawernavigation from './Navigation/Drawernavigation';
import { Provider } from 'react-redux';
import { Store } from './Reduxe/store';
import SplashScreen from 'react-native-splash-screen'
import AuthNavigator from './Navigation/AuthNavigator';
import { AuthProvider} from './context/Authcontext'
import AppNav from './Navigation/AppNav';


const App = () =>{

  //Gestion du splash Screen avant le démarage de l'application
  useEffect(() =>{
    SplashScreen.hide()
  },[])



  return(
    // <Provider store={Store}>
    <AuthProvider>
        <AppNav/> 
    </AuthProvider>
      
    // </Provider>
   
  )
}

export
 default App