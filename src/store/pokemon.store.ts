import { Pokemon } from "@/interfaces/pokemon";
import { PokemonList } from "@/interfaces/pokemonList"
import { PokemonListResponse } from "@/interfaces/pokemonListResponse";
import { defineStore } from "pinia"
import axios from '../plugins/axios';

export const pokemonStore = defineStore('pokemon', {
  state: () => ({
		pokemonList: [],
		allPokemon: [],
		page: 1,
		pageSize: 10,
		total: 0,
		totalPages: 0,
		isFilterActive: false,
		filters: {
			experience: 0,
			moves: [],
			name: ''
		}
	} as PokemonList),
  getters: {
    getPokemonList: (state) => state.pokemonList,
    hasFilter: (state) => {
			const { experience, moves, name } = state.filters

			return experience > 0 || moves.length > 0 || name !== ''; 
		},
		paginatedLocalData: (state) => {
			const startIndex = (state.page - 1) * state.pageSize;
			const endIndex = startIndex + state.pageSize;
			return state.pokemonList.slice(startIndex, endIndex);
		},
		
  },
  actions: {
    async getPokemons() {
			this.isFilterActive = false;
			try {
				const offset = (this.page - 1) * this.pageSize;

				const pokemonData = await axios.get<PokemonListResponse>(`pokemon?limit=${this.pageSize}&offset=${offset}`);
				const promises = pokemonData.data.results.map(async (e: Omit<Pokemon, 'detail'>): Promise<Pokemon> => {

					const res = await axios.get(`pokemon/${e.name}`)
					return {
						name: e.name,
						url: e.url,
						detail: res.data
					}
				});

				this.total = parseInt(pokemonData.data.count);
				this.totalPages = Math.ceil(this.total / this.pageSize);
				this.pokemonList = await Promise.all(promises);
				
			} catch (error) {
				console.log(error);	
			}
      
    },
    async getPokemonsFilter() {
			try {
				
				if (!this.isFilterActive) {
					const pokemonData = await axios.get<PokemonListResponse>(`pokemon?limit=100000`);
					const promises = pokemonData.data.results.map(async (e: Omit<Pokemon, 'detail'>): Promise<Pokemon> => {

						const res = await axios.get(`pokemon/${e.name}`)
						return {
							name: e.name,
							url: e.url,
							detail: res.data
						}
					});

					this.allPokemon = await Promise.all(promises);
				}

				
				if (this.hasFilter) {
					
					this.pokemonList = this.allPokemon.filter((pokemon) =>{
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
				}else{
					this.pokemonList = this.allPokemon
				}
				
				this.page = 1;
				this.total = this.pokemonList.length;
				this.totalPages = Math.ceil(this.total / this.pageSize);

				this.isFilterActive = true;
			} catch (error) {
				console.log(error);	
			}
      
    },
  },
})