import { Pokemon } from "./pokemon";

export interface PokemonList{
	pokemonList: Pokemon[];
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}