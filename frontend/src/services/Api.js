import axios from 'axios';

// Use VITE_APP_API_URL for production, VITE_API_BASE_URL for development
const baseURL = import.meta.env.VITE_APP_API_URL || import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;