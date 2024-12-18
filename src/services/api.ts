import axios from 'axios';
import { PaginatedUsersResponse } from '../@types/userTypes';

const api = axios.create({
  baseURL: 'https://reqres.in/api', 
  timeout: 5000,                   
});

export const signUp = (data: { email: string; password: string }) =>
  api.post('/register', data);

export const login = (data: { email: string; password: string }) =>
  api.post('/login', data);

export const fetchUserById = (id: number) => {
  const token = localStorage.getItem('token');
  return api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchUsers = (page: number): Promise<PaginatedUsersResponse> => {
  const token = localStorage.getItem('token'); 
  return api
    .get(`/users?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
};

export default api;
