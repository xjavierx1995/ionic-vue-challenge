export interface PokemonDetail{
	id: any;
	name: string;
	base_experience: number;
	height: number;
	is_default: any;
	order: any;
	weight: number;
	abilities: {
		ability: {
			name: string,
			url: string
		},
	}[];
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
	species: {
		name: string;
		url: string;
	};
	sprites: {
		back_default: string;
		back_female: string;
		back_shiny: string;
		back_shiny_female: string;
		front_default: string;
		front_female: string;
		front_shiny: string;
		front_shiny_female: string;
		other: {
			home: {
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      },
      "official-artwork": {
        front_default: string;
      }
		};
	};
	stats: {
		base_stat: number,
		effort: number,
		stat: {
			name: string,
			url: string
		}
	}[];
	types: {
		slot: number,
		type: {
			name: string,
			url: string
		}
	}[];
	past_types: any;
}