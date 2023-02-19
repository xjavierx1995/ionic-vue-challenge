<template>
	<v-pagination
    v-model="page"
    :pages="store.pageSize"
		hideFirstButton
		hideLastButton
    :range-size="1"
    active-color="#DCEDFF"
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
<style scoped lang="css">
	.Pagination{
		justify-content: center;
	}
</style>