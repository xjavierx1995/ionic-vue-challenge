<template>
	<ion-page>
		<HeaderSearch></HeaderSearch>

		<ion-content :fullscreen="true">
				<div v-for="pokemon in (store.isFilterActive ? store.paginatedLocalData : store.pokemonList)" :key="pokemon.name">
					<PokemonCard :pokemon="pokemon" />
				</div>
		</ion-content>

		<ion-footer class="ion-no-border" mode="md">
			<ion-toolbar>
				<PaginationComponent/>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script setup lang="ts">
	import { IonContent, IonPage, IonToolbar, IonFooter } from '@ionic/vue';
	import PokemonCard from '@/components/pokemonCard.vue';
	import { onMounted } from 'vue';
	import { pokemonStore } from '@/store/pokemon.store';
	import PaginationComponent from '@/components/paginationComponent.vue';
	import HeaderSearch from '@/components/headerSearch.vue';


	const store = pokemonStore();

	onMounted(async () => await store.getPokemons());
	
</script>

<style scoped>

</style>
