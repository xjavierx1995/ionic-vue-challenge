import axios from 'axios';
import { toastController } from '@ionic/vue';
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

		toastController.create({
			message: 'An error has occurred',
			duration: 1500,
			position: 'top'
		})
    return Promise.reject(error);
  }
);

export default instance