import { Pokemon } from "./pokemon";

export interface ListResponse<T> {
	count: string;
	next: number;
	previous: string;
	results: T;
}