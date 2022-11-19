//<ROOT>/shared/APIKit.js
import axios from 'axios';

// Create axios client, pre-configured with baseURL

const port = 8000;
const localIP = '192.168.43.217';
const apiPath = 'api';
const baseURL = `http://${localIP}:${port}/${apiPath}`;

let AUTH = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  AUTH.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default AUTH;