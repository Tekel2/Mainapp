import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/Authcontext';
// import useAuth from './useAuth';


const useRefreshToken = () => {
    // const { setAuth } = useAuth();
    const {userInfo, refresh_token} = useContext(AuthContext)


    const refresh = async () => {
        const response = await axios.get('/token/refresh/', {
            withCredentials: true,
            "refresh_token": refresh_token
        });
        AsyncStorage.setItem('access_token', response.data.access);
        AsyncStorage.setItem('refresh_token', response.data.refresh);
        AsyncStorage.setItem('userInfo', JSON.stringify(jwt_decode(response.data.access)));
        // setAuth(prev => {
        //     console.log(JSON.stringify(prev));
        //     console.log(response.data.accessToken);
        //     return { ...prev, accessToken: response.data.accessToken }
        // });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
