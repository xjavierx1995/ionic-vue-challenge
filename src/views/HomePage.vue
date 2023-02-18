<template>
		<ion-page>
			<ion-header :translucent="true">
				<ion-toolbar>
					<ion-title>Blank</ion-title>
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
						<!-- <button
							v-for="page in store.totalPages"
							:key="page"
							:class="{ active: page === store.page }"
							@click="getPokemonsList(page)"
						>
							{{ page }}
						</button> -->
					</div>
				</div>
			</ion-content>
		</ion-page>
</template>

<script setup lang="ts">
	import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
	import { onMounted } from 'vue';
	import { pokemonStore } from '@/store/pokemon.store';

	const store = pokemonStore();

	async function getPokemonsList(page?:number) {
		await store.getPokemons(page);
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
