import { Pokemon } from "./pokemon";
import { PokemonFilter } from "./pokemonFilter";

export interface PokemonState{
	pokemonList: Pokemon[];
	filters: PokemonFilter;
	isFilterActive: boolean;
	allPokemon: Pokemon[];
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
	isLoading: boolean;
}