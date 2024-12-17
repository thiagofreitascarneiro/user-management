import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api', 
  timeout: 5000,                   
});

export const signUp = (data: { email: string; password: string }) =>
  api.post('/register', data);

export const login = (data: { email: string; password: string }) =>
  api.post('/login', data);

export const fetchUserById = (id: number) => api.get(`/users/${id}`);

export default api;
