import { Pokemon } from "@/interfaces/pokemon";
import { PokemonFilter } from "@/interfaces/pokemonFilter";
import { PokemonList } from "@/interfaces/pokemonList"
import { PokemonListResponse } from "@/interfaces/pokemonListResponse";
import { defineStore } from "pinia"
import axios from '../plugins/axios';

export const pokemonStore = defineStore('pokemon', {
  state: () => ({
		pokemonList: [],
		page: 1,
		pageSize: 10,
		total: 0,
		totalPages: 0,
		filters: {
			experience: 0,
			moves: [],
			name: ''
		}
	} as PokemonList),
  getters: {
    getPokemonList: (state) => state.pokemonList,
  },
  actions: {
    async getPokemons(page = 1) {
			
			try {
				const offset = (page - 1) * this.pageSize;

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
    async getPokemonsFilter(filter: PokemonFilter) {
			this.filters = filter;
			try {
				
				const pokemonData = await axios.get<PokemonListResponse>(`pokemon?limit=100000`);
				const promises = pokemonData.data.results.map(async (e: Omit<Pokemon, 'detail'>): Promise<Pokemon> => {

					const res = await axios.get(`pokemon/${e.name}`)
					return {
						name: e.name,
						url: e.url,
						detail: res.data
					}
				});

				this.page = 1;
				const pokemons = await Promise.all(promises);

				const filteredPokemon = pokemons.filter((pokemon) =>{
						if (this.filters.name !== '' && pokemon.name.includes(this.filters.name)) {
							return true;
						}
						if (this.filters.moves.length > 0 && this.filters.moves.every((move) => pokemon.detail.moves.some((m) => m.move.name.includes(move))) ) {
							return true;
						}
						if (this.filters.experience != 0 && pokemon.detail.base_experience == this.filters.experience) {
							return true;
						}
						return false;
				});
				this.total = filteredPokemon.length;
				this.totalPages = Math.ceil(this.total / this.pageSize);
				this.pokemonList = filteredPokemon;
			} catch (error) {
				console.log(error);	
			}
      
    },
  },
})