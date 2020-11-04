import axios from 'axios';

const api = axios.create({
  baseURL: 'http://devserver.oktagongames.com:5000/api/',
});

export default api;
