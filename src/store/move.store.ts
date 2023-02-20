import { ListResponse } from "@/interfaces/ListResponse";
import { Move } from "@/interfaces/move";
import { MoveState } from "@/interfaces/moveState";
import { defineStore } from "pinia"
import axios from '../plugins/axios';

export const moveStore = defineStore('move', {
  state: () => ({
		moveList: []
	} as MoveState),
  getters: {
		
  },
  actions: {
   async getMoves(){
		const res = await axios.get<ListResponse<Move[]>>(`move?limit=1000000`);
		this.moveList = res.data.results;
		
	 }
  },
})