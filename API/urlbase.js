//<ROOT>/shared/APIKit.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Create axios client, pre-configured with baseURL

const port = 8000;
const localIP = '192.168.105.30';
const routeAuth = 'auth';
const routeAPI = 'api';
// const action = 'login';
export const baseUrlAuth = `http://${localIP}:${port}/${routeAuth}`;
export const baseUrlApi = `http://${localIP}:${port}/${routeAPI}`;
export const baseUrlmedia = `http://${localIP}:${port}`;

// let AUTH = axios.create({
//   baseURL: baseURL,
//   timeout: 10000,
// });

// // Set JSON Web Token in Client to be included in all calls
// export const setClientToken = token => {
//   AUTH.interceptors.request.use(function(config) {
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });
// };

// export default AUTH;

export const axiosInstanceAuth = axios.create({
    baseURL: `http://${localIP}:${port}/${routeAuth}`,
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + AsyncStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


export const axiosInstanceAPI = axios.create({
    
    baseURL: `http://${localIP}:${port}/${routeAPI}`,
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + AsyncStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        // 'accept': '*/*'
    }
});


// axiosInstanceAPI.interceptors.response.use(
//     response => (response, error )=> {
//       const originalRequest = error.config;
      
//       if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
//           const refresh_token = localStorage.getItem('refresh_token');

//           return axiosInstanceAPI
//               .post('/token/refresh/', {refresh: refresh_token})
//               .then((response) => {

//                   localStorage.setItem('access_token', response.data.access);
//                   localStorage.setItem('refresh_token', response.data.refresh);

//                   axiosInstanceAPI.defaults.headers['Authorization'] = "JWT " + response.data.access;
//                   originalRequest.headers['Authorization'] = "JWT " + response.data.access;

//                   return axiosInstanceAPI(originalRequest);
//               })
//               .catch(err => {
//                   console.log(err)
//               });
//       }
//       return Promise.reject(error);
//   },
// );
// export default axiosInstanceAPI