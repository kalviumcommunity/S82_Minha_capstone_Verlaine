import api from './api';

export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const signup = async (userData) => {
  const { data } = await api.post('/auth/signup', userData);
  return data;
};

export const verifyLoginOtp = async (otpData) => {
  const { data } = await api.post('/auth/verify-login-otp', otpData);
  return data;
};

export const verifySignupOtp = async (otpData) => {
  const { data } = await api.post('/auth/verify-otp', otpData);
  return data;
};

export const sendOtp = async (email) => {
  const { data } = await api.post('/otp/send-otp', email);
  return data;
};

export const googleAuth = async (token) => {
  const { data } = await api.post('/auth/google', { token });
  return data;
};

export const getUser = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};