//<ROOT>/shared/APIKit.js
import axios from 'axios';

// Create axios client, pre-configured with baseURL

const port = 8000;
const localIP = '192.168.227.30';
const routeAuth = 'auth';
const routeAPI = 'api';
// const action = 'login';
export const baseUrlAuth = `http://${localIP}:${port}/${routeAuth}`;
export const baseUrlApi = `http://${localIP}:${port}/${routeAPI}`;

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