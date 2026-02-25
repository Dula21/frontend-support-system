
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request Interceptor: Attach Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle Global Errors (The Fix)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Force redirect on expired token
    }
    return Promise.reject(error);
  }
);

export default api;
