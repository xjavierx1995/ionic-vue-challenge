import { PokemonDetail } from "./pokemonDetail";

export interface Pokemon{
	name: string;
	url?: string;
	detail: PokemonDetail
}