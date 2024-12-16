import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api', 
  timeout: 5000,                   
});

export default api;
