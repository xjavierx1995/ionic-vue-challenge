<template>
	<ion-page>
		<HeaderSearch></HeaderSearch>

		<ion-content>
			<ion-card v-if="store.hasFilter">
				<ion-card-header>
					<ion-card-title>{{ store.total }} resultados</ion-card-title>
				</ion-card-header>
			</ion-card>
				<div v-if="!store.isLoading" >
					<PokemonCard 
						v-for="pokemon in (store.isFilterActive ? store.paginatedLocalData : store.pokemonList)" 
						:key="pokemon.name" 
						:pokemon="pokemon" />
				</div>
				<div v-else>
					<PokemonCardLoading v-for="i in 10" :key="i"/>
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
	import { IonContent, IonPage, IonToolbar, IonFooter, IonCard, IonCardHeader, IonCardTitle } from '@ionic/vue';
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
ion-card{
		--background: #fdfdfd;
		margin: 24px 0;
		border-radius: 16px;
		box-shadow: none !important;
		ion-card-title{
			font-family: 'Readex Pro';
			font-weight: 500;
			color: #55596D;
			font-size: 20px;
			line-height: 28px;
		}
	}

</style>
