// axios.js
import axios from 'axios';
import { getToken } from './Authorized';
import data from './data';
import pkgJson from '../../package.json';
// Add a request interceptor
axios.interceptors.request.use(
  config => {
    if (
      // config.baseURL === baseApiAddress &&
      !config.headers.Authorization
    ) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers['X-Client-Version'] = pkgJson.version;
      config.headers['X-Client-Name'] = 'Web';
    }
    return config;
  },
  error => Promise.reject(error),
);

// Add a response interceptor
axios.interceptors.response.use(
  response =>
    // Do something with response data
    response,
  error =>
    // Do something with response error
    Promise.reject(error),
);

export default axios;
