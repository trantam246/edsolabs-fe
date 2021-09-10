import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosClient; 