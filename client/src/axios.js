import axios from 'axios';

const cryptoInstance = axios.create({
  baseURL: 'http://localhost:9000/cryptoAPI/'
});
cryptoInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const stockInstance = axios.create({
  baseURL: 'http://localhost:9000/stockAPI/'
});
stockInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export {cryptoInstance, stockInstance};
