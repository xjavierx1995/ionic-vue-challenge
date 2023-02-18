import { Pokemon } from "./pokemon";

export interface PokemonListResponse {
	count: string;
	next: number;
	previous: string;
	results: Pokemon[];
}