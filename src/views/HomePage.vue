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
				<div>
					<div v-for="pokemon in store.pokemonList" :key="pokemon.name">
						{{ pokemon.name }}
					</div>
					<div>
						<ion-button 
							v-for="page in store.totalPages"
							:key="page"
							:class="{ active: page === store.page }"
							@click="getPokemonsList(page)"
						>
							{{ page }}
						</ion-button>
					</div>
				</div>
			</ion-content>
		</ion-page>
</template>

<script setup lang="ts">
	import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/vue';
	import { add } from "ionicons/icons";
	import { onMounted, reactive } from 'vue';
	import { pokemonStore } from '@/store/pokemon.store';
	import { PokemonFilter } from '@/interfaces/pokemonFilter';

	const store = pokemonStore();

	const filters: PokemonFilter = reactive({
		name: 'pikachu',
		moves: [],
		experience: 0,
	});

	async function getPokemonsList(page?:number) {
		await store.getPokemons(page);
	}

	async function getPokemonListFiltered() {
		await store.getPokemonsFilter(filters);
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
