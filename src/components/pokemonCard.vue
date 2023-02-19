<template>
	<ion-card>
		<img 
		style="height: 159px;"
			:src="pokemon.detail.sprites.other.home.front_default ?? pokemon.detail.sprites.other['official-artwork'].front_default" 
		/>
		<ion-card-header>
			<ion-card-title>{{ pokemon.name }}</ion-card-title>
			<ion-card-subtitle>#{{ pokemon.detail.order }}</ion-card-subtitle>
		</ion-card-header>

		<ion-card-content>
			Moves <strong>{{ pokemon.detail.moves.length }}</strong> Experience <strong>{{ pokemon.detail.base_experience }} </strong>
		</ion-card-content>

		<ion-button v-for="(type, index) in pokemon.detail.types" :key="index" fill="clear" >
			<ion-chip color="medium">{{ type.type.name }}</ion-chip>
		</ion-button>
	</ion-card>
</template>
<script setup lang="ts">
 import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { toRefs, defineProps } from 'vue';
	import { Pokemon } from '@/interfaces/pokemon';

	const props = defineProps<{ 
	pokemon: Pokemon
	}>();	

	const { pokemon } = toRefs(props);
</script>
<style lang="">
	
	
</style>