import axios from 'axios';

// 🔧 Change this to your machine's LAN IP
// Run `ipconfig` in terminal → look for IPv4 Address
// e.g. http://192.168.1.42:8000
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://192.168.1.100:8000';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.error('[API Error]', error?.response?.data ?? error.message);
    }
    return Promise.reject(error);
  }
);