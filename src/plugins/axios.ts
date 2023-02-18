import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.message === 'Network Error') {
      // Manejar error de red aquí
    }
    return Promise.reject(error);
  }
);

export default instance