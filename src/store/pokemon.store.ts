import { Pokemon } from "@/interfaces/pokemon";
import { PokemonList } from "@/interfaces/pokemonList"
import { PokemonListResponse } from "@/interfaces/pokemonListResponse";
import { defineStore } from "pinia"
import axios from '../plugins/axios';

export const pokemonStore = defineStore('pokemon', {
  state: () => ({
		pokemonList: [],
		page: 1,
		pageSize: 20,
		total: 0,
		totalPages: 0
	} as PokemonList),
  getters: {
    getPokemonList: (state) => state.pokemonList,
  },
  actions: {
    async getPokemons(page = 1) {
			
			const offset = (page - 1) * this.pageSize;
			try {
				const pokemonData = await axios.get<PokemonListResponse>(`pokemon?limit=${this.pageSize}&offset=${offset}`);
				const promises = pokemonData.data.results.map(async (e: Omit<Pokemon, 'detail'>): Promise<Pokemon> => {

					const res = await axios.get(`pokemon/${e.name}`)
					return {
						name: e.name,
						url: e.url,
						detail: res.data
					}
				});

				const total = pokemonData.data.count;
				this.page = page;
				this.total = parseInt(total);
				this.totalPages = Math.ceil(this.total / this.pageSize);
				this.pokemonList = await Promise.all(promises);
				
			} catch (error) {
				console.log(error);	
			}
      
    },
  },
})