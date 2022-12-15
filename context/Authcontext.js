import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { baseUrlAuth } from "../API/urlbase";

export const AuthContext = createContext();

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export const AuthProvider = ({children}) =>{

    const [isLoading, setIsloading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [errMgs, setErrMgs] = useState("null");

    const login = (username, password) => {
        setIsloading(true);
        // setUserToken(null)   
        // wait(1000).then(() => setIsloading(false));    


    //     try{
    //         const response = axios.post(`${baseUrlAuth}/login`,
    //                                     {username, password},
    //                                     {
    //                                         headers:{'conten-type':'application/json'},
    //                                         withCredentials:true,
    //                                     }
    //                                 );
    //         console.log(response.data);
    //         let userInfor = response.data
    //         setUserInfo(userInfor)
    //         setUserToken(userInfor.token);
    //         AsyncStorage.setItem('userToken', userInfor.token);
    //         AsyncStorage.setItem('userInfo', JSON.stringify(userInfor));

    //     }
    //     catch (err){
    //         console.log(err,'5555555555')
    //         if(!err?.response){
    //             setErrMgs('No server Response')
    //         }
    //         else if (err.response?.status === 400){
    //             setErrMgs('Le username ou le  password est absent')
    //         }
    //         else if (err.response?.status === 401){
    //             setErrMgs('Vous n\'etes pas authrisé')
    //         }
    //         else {
    //             setErrMgs('Login Failed')
    //         }

    //         errRef.current.focus();
    //     }

    // }


        // setIsloading(false);
        axios.post(`${baseUrlAuth}/login`,{
            username,
            password
        })
        .then(res => {
            // console.log(res.data);
            let userInfor = res.data
            // setUserInfo(userInfor)
            console.log('data:       ',userInfor.data)
            console.log('token1      ',userInfor.token)
            // setUserToken(userInfor.token);
            setUserInfo(userInfor.data);    
            AsyncStorage.setItem('userToken', userInfor.token);            
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfor.data));
            
        })
        .catch(err => {
            console.log(`login error tekeu ${err}`);
            console.log(err,'5555555555')
            // if(!err?.response){
            //     setErrMgs('No server Response')
            // }
            if (err.response?.status === 400){
                setErrMgs('Le username ou le  password est absent')
            }
            else if (err.response?.status === 401){
                setErrMgs('Vous n\'etes pas authrisé')
            }
            else if (err.response?.status === 403){
                console.log('erreur 403')
                setErrMgs('Vous n\'etes pas authrisé')
            }
            else {
                setErrMgs('Login Failed')
            }
        });
        
        wait(1000).then(() => setIsloading(false));    
    }


    const logout = () =>{
        setIsloading(true);
        // console.log(userToken)
        // console.log('------------------------------------------')
        // console.log(userInfo)
        // console.log('000000000000000000000000000000000000000000')
        setUserToken(null);
        wait(1000).then(() => setIsloading(false));
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        // try{
        // axios.post(`${baseUrlAuth}/logout`)
        // axios.defaults.headers.common['Authorization'] = ''
        // .then(res => {
        //     console.log(res)
        //     if (res.status === 200){
        //         setUserToken(null)
        //         AsyncStorage.removeItem('userInfo');
        //         AsyncStorage.removeItem('userToken');
        //         wait(1000).then(() => setIsloading(false));
        //     }
        //     ;
        // })}
        // catch(e)  {
        //     console.log(`login error ${e}`);
        // };

        
        
    }


    const isLoggedIn = async ()=>{
        try {
            setIsloading(true)
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if(userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            
            
        } catch (e) {
            console.log(e)    
        }

        wait(1000).then(() => setIsloading(false));

    }

    useEffect(()=>{
        isLoggedIn()
        
    }, [])


    return(
        <AuthContext.Provider value={{login, logout, isLoading,userInfo, userToken, errMgs}}>
            {children}
        </AuthContext.Provider>
    )
}