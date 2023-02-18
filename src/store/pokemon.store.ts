import { defineStore } from "pinia"

interface Pokemon{
	name: string;
	url: string;
	detail?: any
}

interface PokemonList{
	pokemonList: Pokemon[]
}
export const pokemonStore = defineStore('pokemon', {
  state: () => ({
		pokemonList: []
	} as PokemonList),
  getters: {
    doubleCount: (state) => state,
  },
  actions: {
    getPokemons() {
      
    },
  },
})