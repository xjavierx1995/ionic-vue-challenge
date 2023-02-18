import { PokemonList } from "@/interfaces/pokemonList"
import { defineStore } from "pinia"
import axios from '../plugins/axios';

export const pokemonStore = defineStore('pokemon', {
  state: () => ({
		pokemonList: []
	} as PokemonList),
  getters: {
    doubleCount: (state) => state,
  },
  actions: {
    getPokemons() {
      axios.get('pokemon').then(function (response: any) {
				// handle success
				console.log(response);
			})
			.catch(function (error: any) {
				// handle error
				console.log(error);
			})
    },
  },
})