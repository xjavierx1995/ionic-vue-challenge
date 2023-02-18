export interface PokemonDetail{
	id: any;
	name: string;
	base_experience: number;
	height: any;
	is_default: any;
	order: any;
	weight: any;
	abilities: any;
	forms: any;
	game_indices: any;
	held_items: any;
	location_area_encounters: any;
	moves: {
		move:{
			name: string;
			url: string;
		}
	}[];
	species: any;
	sprites: any;
	stats: any;
	types: any;
	past_types: any;
}