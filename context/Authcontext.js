import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [isLoading, setIsloading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [test, setTest] = useState('tekeu le  big');

    const login = () => {
        setIsloading(true)
        setUserToken('capsuleapp');
        AsyncStorage.setItem('userToken', 'capsuleapp')
        setUserToken('capsuleapp');
        setIsloading(false);
    }


    const logout = () =>{
        setIsloading(true)
        setUserToken(null);
        AsyncStorage.removeItem('userToken')
        setIsloading(false)
    }


    const isLoggedIn = async ()=>{
        try {
            setIsloading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            setUserToken(userToken)
            setIsloading(false)
        } catch (e) {
            console.log(e)    
        }
    }

    useEffect(()=>{
        isLoggedIn()
        
    }, [])


    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    )
}