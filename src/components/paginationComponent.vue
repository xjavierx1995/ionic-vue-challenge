<template>
	<v-pagination
    v-model="page"
    :pages="store.pageSize"
		hideFirstButton
		hideLastButton
    :range-size="1"
    active-color="#072AC8"
		@update:modelValue="getPokemonsList"
  />
</template>
<script setup lang="ts">
import { pokemonStore } from "@/store/pokemon.store";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { ref } from "vue";

	const page = ref(1)
	const store = pokemonStore();

	async function getPokemonsList(page?:number) {
		await store.getPokemons(page);
	}

</script>
<style lang="scss">
	.Pagination{
		justify-content: center;		

		.PaginationControl{
			.Control{
				&.Control-active{
					fill: #072AC8;
				}
			}
		}
		
		.Page {
			width: 40px;
			height: 40px;
			color: #8d91a5;
			&.Page-active{
				color: #fdfdfd;
				border-radius: 4px;
				width: 40px;
				height: 40px;
				font-weight: 500;
				font-size: 14px;
				line-height: 20px;	
			}
		}
	}
</style>