import React, { useContext }  from "react";
import { NavigationContainer } from '@react-navigation/native';
import Drawernavigation from './Drawernavigation';
import AuthNavigator from './AuthNavigator'
import { AuthContext } from "../context/Authcontext";
import { ActivityIndicator, View } from "react-native";

function AppNav (){

    const {isLoading, access_token, refresh_token}=useContext(AuthContext)

    if (isLoading){
        return(
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
        
    }

    return(
        <NavigationContainer>
            { access_token !== null && refresh_token !== null  ? <Drawernavigation/> : <AuthNavigator/>}
            {/* <Drawernavigation/> */}
      </NavigationContainer>
    )
}

export default AppNav;