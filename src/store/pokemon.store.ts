import { Pokemon } from "@/interfaces/pokemon";
import { PokemonState } from "@/interfaces/pokemonList"
import { ListResponse } from "@/interfaces/ListResponse";
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
		isLoading: false,
		isFilterActive: false,
		filters: {
			experience: 0,
			moves: [],
			name: ''
		}
	} as PokemonState),
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
			try {
				this.isFilterActive = false;
				this.isLoading = true;
				const offset = (this.page - 1) * this.pageSize;

				const pokemonData = await axios.get<ListResponse<Pokemon[]>>(`pokemon?limit=${this.pageSize}&offset=${offset}`);				
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
				this.isLoading = false;
			} catch (error) {
				console.log(error);	
				this.isLoading = false;
			}
      
    },
    async getPokemonsFilter() {
			try {
				this.isLoading = true;
				if (!this.isFilterActive) {
					const pokemonData = await axios.get<ListResponse<Pokemon[]>>(`pokemon?limit=100000`);
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
					let filtered = this.allPokemon
					if (this.filters.name !== '') {
						
						filtered = filtered.filter((pokemon) =>{
								if (pokemon.name.includes(this.filters.name)) {
									return true;
								}
								return false;
						});
					}

					if (this.filters.moves.length > 0) {
						filtered = filtered.filter((pokemon) =>{
								if (this.filters.moves.some((move) => pokemon.detail.moves.some((m) => m.move.name.includes(move))) ) {
									return true;
								}
								return false;
						});
					}

					if (this.filters.experience != 0) {	
						filtered = filtered.filter((pokemon) =>{
							if (pokemon.detail.base_experience == this.filters.experience) {
								return true;
							}
							return false;
						});
					}

					this.pokemonList = filtered;
				}else{
					this.pokemonList = this.allPokemon
				}
				
				this.page = 1;
				this.total = this.pokemonList.length;
				this.totalPages = Math.ceil(this.total / this.pageSize);

				this.isFilterActive = true;
				this.isLoading = false;
			} catch (error) {
				console.log(error);	
				this.isLoading = false;
			}
      
    },
  },
})