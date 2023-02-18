import { Pokemon } from "./pokemon";
import { PokemonFilter } from "./pokemonFilter";

export interface PokemonList{
	pokemonList: Pokemon[];
	filters: PokemonFilter;
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}