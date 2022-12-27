import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { axiosInstanceAuth, baseUrlAuth } from "../API/urlbase";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export const AuthProvider = ({children}) =>{

    const [isLoading, setIsloading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [auth, setAuth] = useState({});
    const [access_token, setAccess_token] = useState(null);
    const [refresh_token, setRefresh_token] = useState(null);



    const [userInfo, setUserInfo] = useState(null);
    const [errMgs, setErrMgs] = useState("null");




    const login = async (username, password) => {
        setIsloading(true);
        try{
            const response = await axiosInstanceAuth.post('/token/obtain/', {
                username: username,
                password: password
            });
            // axiosInstanceAuth.defaults.headers['Authorization'] = "JWT " + response.data.access;
            // console.log("acces : ", response.data.access)
            // console.log("refresh : ", response.data.refresh)
            // console.log(jwt_decode(response.data.access))

            setAccess_token(response.data.access)
            setRefresh_token(response.data.refresh)
            setUserInfo(jwt_decode(response.data.access))
            AsyncStorage.setItem('access_token', response.data.access);
            AsyncStorage.setItem('refresh_token', response.data.refresh);
            AsyncStorage.setItem('userInfo', JSON.stringify(jwt_decode(response.data.access)));
            setIsloading(false)
        }
        catch (err) {
            if(!err?.response){
                setErrMgs('No server Response')
            }
            else if (err.response?.status === 400){
                setErrMgs('Le username ou le  password est absent')
            }
            else if (err.response?.status === 401){
                setErrMgs('Vous n\'etes pas authrisé')
            }
            else {
                setErrMgs('Login Failed')
            }
            setIsloading(false)
        }

        

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
        // axios.post(`${baseUrlAuth}/login`,
                    
        // {
        //     username,
        //     password
        // })
        // .then(res => {
        //     // console.log(res.data);
        //     let userInfor = res.data
        //     // setUserInfo(userInfor)
        //     console.log('data:       ',userInfor.data)
        //     console.log('token1      ',userInfor.token)
        //     setUserToken(userInfor.token);
        //     setUserInfo(userInfor.data);    
        //     AsyncStorage.setItem('userToken', userInfor.token);            
        //     AsyncStorage.setItem('userInfo', JSON.stringify(userInfor.data));
            

        // })
        // .catch(err => {
        //     console.log(`login error tekeu ${err}`);
        //     console.log(err,'5555555555')
        //     // if(!err?.response){
        //     //     setErrMgs('No server Response')
        //     // }
        //     if (err.response?.status === 400){
        //         setErrMgs('Le username ou le  password est absent')
        //     }
        //     else if (err.response?.status === 401){
        //         setErrMgs('Vous n\'etes pas authrisé')
        //     }
        //     else if (err.response?.status === 403){
        //         console.log('erreur 403')
        //         setErrMgs('Vous n\'etes pas authrisé')
        //     }
        //     else {
        //         setErrMgs('Login Failed')
        //     }
        // });
        
        // wait(1000).then(() => setIsloading(false));    
    }


    const logout = async () =>{
        setIsloading(true);
        
        let refresh_token = await AsyncStorage.getItem('refresh_token');
        // console.log("refresh_token ",refresh_token)
        try{
            const response = await axiosInstanceAuth.post('/blacklist/', {
                "refresh_token": refresh_token
            });

            AsyncStorage.removeItem('access_token');
            AsyncStorage.removeItem('refresh_token');
            AsyncStorage.removeItem('userInfo');

            setAccess_token(null)
            setRefresh_token(null)

            setIsloading(false)

            return response


        // axios.defaults.headers.common['Authorization'] = `token ${userToken}`
        // .then(res => {
        //     console.log(res)
        //     // if (res.status === 200){
        //         setUserToken(null)
        //         AsyncStorage.removeItem('userInfo');
        //         AsyncStorage.removeItem('userToken');
                // wait(1000).then(() => );
                
            // }
            // ;
        // })
        }
        catch(e)  {
            // console.log(`login error ${e}`);
            if(!err?.response){
                setErrMgs('No server Response')
            }
            else if (err.response?.status === 400){
                setErrMgs('Le username ou le  password est absent')
            }
            else if (err.response?.status === 401){
                setErrMgs('Vous n\'etes pas authrisé')
            }
            else {
                setErrMgs('Login Failed')
            }
        };

        
        
    }


    const isLoggedIn = async ()=>{
        try {
            setIsloading(true)
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            let refresh_token = await AsyncStorage.getItem('refresh_token');
            let access_token = await AsyncStorage.getItem('access_token');
            userInfo = JSON.parse(userInfo);

            if(userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
                setAccess_token(access_token)
                setRefresh_token(refresh_token)
            }

            setIsloading(false)
            
            
        } catch (e) {
            console.log(e)    
        }

        // wait(1000).then(() => setIsloading(false));

    }

    useEffect(()=>{
        isLoggedIn()
        
    }, [])

    let content ={login, logout, 
                isLoading,userInfo, 
                userToken, errMgs,
                access_token, refresh_token,setRefresh_token, setAccess_token}


    return(
        <AuthContext.Provider value={content}>
            {children}
        </AuthContext.Provider>
    )
}