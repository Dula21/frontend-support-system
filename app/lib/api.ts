import axios from 'axios';

// --- UPDATED SECTION ---
// Uses the Vercel environment variable in production, or localhost for your own testing.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api` 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});
// -----------------------

// Request Interceptor: Attach Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle Global Errors
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
