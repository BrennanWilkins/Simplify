import axios from 'axios';

export const authInstance = axios.create({
  // baseURL: 'http://localhost:9000/api/auth/'
  baseURL: 'https://simplify.herokuapp.com/api/auth/'
});

export const instance = axios.create({
  // baseURL: 'http://localhost:9000/api/'
  baseURL: 'https://simplify.herokuapp.com/api/'
});
