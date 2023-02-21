<template>
	<ion-page>
		<HeaderSearch></HeaderSearch>

		<ion-content>
			<ion-card v-if="store.hasFilter">
				<ion-card-header>
					<ion-card-title>{{ store.total }} resultados</ion-card-title>
				</ion-card-header>
			</ion-card>
			<ion-grid>
				<ion-row v-if="!store.isLoading">
					<ion-col  size-sm="4" 
						v-for="pokemon in (store.isFilterActive ? store.paginatedLocalData : store.pokemonList)" 
						:key="pokemon.name" 
					>
						<PokemonCard :pokemon="pokemon"/>
					</ion-col>
				</ion-row>

				<ion-row v-else>
					<ion-col v-for="i in 10" :key="i">
						<PokemonCardLoading />
					</ion-col>
				</ion-row>
			</ion-grid>
			
				
		</ion-content>

		<ion-footer class="ion-no-border" mode="md">
			<ion-toolbar>
				<PaginationComponent/>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script setup lang="ts">
	import { IonContent, IonPage, IonToolbar, IonFooter, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/vue';
	import PokemonCard from '@/components/pokemonCard.vue';
	import PokemonCardLoading from '@/components/pokemonCardLoading.vue';
	import { onMounted } from 'vue';
	import { pokemonStore } from '@/store/pokemon.store';
	import PaginationComponent from '@/components/paginationComponent.vue';
	import HeaderSearch from '@/components/headerSearch.vue';


	const store = pokemonStore();

	onMounted(async () => await store.getPokemons());
	
</script>

<style scoped lang="scss">

</style>
