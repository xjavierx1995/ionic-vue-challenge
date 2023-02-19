<template>
		<ion-page>
			<ion-header :translucent="true">
				<ion-toolbar>
					<ion-title>Blank</ion-title>
					<ion-buttons slot="start">
					<ion-button @click="getPokemonListFiltered()">
						<ion-icon slot="start" :icon="add"></ion-icon>
						Click me
					</ion-button>
				</ion-buttons>
				</ion-toolbar>
				
			</ion-header>

			<ion-content :fullscreen="true">
					<div v-for="pokemon in (filterActive ? dataFiltered : store.pokemonList)" :key="pokemon.name">
						<PokemonCard :pokemon="pokemon" />
					</div>
			</ion-content>

			<ion-footer mode="md">
				<ion-toolbar>
					<PaginationComponent/>
				</ion-toolbar>
			</ion-footer>
		</ion-page>
</template>

<script setup lang="ts">
	import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonFooter } from '@ionic/vue';
	import PokemonCard from '@/components/pokemonCard.vue';
	import { add } from "ionicons/icons";
	import { onMounted, reactive, ref, Ref } from 'vue';
	import { pokemonStore } from '@/store/pokemon.store';
	import { PokemonFilter } from '@/interfaces/pokemonFilter';
	import { Pokemon } from '@/interfaces/pokemon';
	import PaginationComponent from '@/components/paginationComponent.vue';


	const store = pokemonStore();

	const filters: PokemonFilter = reactive({
		name: 'pikachu',
		moves: [],
		experience: 0,
	});

	const filterActive: Ref<boolean> = ref(false);
	const dataFiltered: Ref<Pokemon[]> = ref([]);

	async function getPokemonsList() {
		await store.getPokemons();
	}

	async function getPokemonListFiltered() {// TODO: esta funcion deberia ir en el modal de filtros
		filterActive.value = true;
		await store.getPokemonsFilter(filters);
		paginatedLocalData();
	}

	function paginatedLocalData(page = 1) {//TODO: esto deberia ir en el store?
		const startIndex = (page - 1) * store.pageSize;
		const endIndex = startIndex + store.pageSize;
		dataFiltered.value = store.pokemonList.slice(startIndex, endIndex);
  }

	onMounted(() => getPokemonsList());
	
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
