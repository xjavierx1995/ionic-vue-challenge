<template>
	<ion-header class="ion-no-border">
		<ion-toolbar mode="md"><!-- TODO: esto es transparente -->
			<ion-buttons slot="start">
				<ion-button @click="cancel">
					<ion-icon slot="icon-only" color="blue" :icon="close"></ion-icon>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content class="filter-container ion-padding-horizontal">
		<h2>Filtrer pokemon list</h2>
		<ion-item>
			<ion-label position="floating">Select movement number</ion-label>
    	<ion-select 
				:multiple="true" 
				mode="md"
				:value="filters.moves"
				@ionChange="filters.moves = $event.detail.value" 
				
			>
				<ion-select-option v-for="item in store.moveList" :key="item.name" :value="item.name">{{ item.name }}</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-label position="floating">Select experience level</ion-label>
    	<ion-select 
				mode="md"
				:value="filters.experience"
				@ionChange="filters.experience = $event.detail.value"
				interface="popover" 
				>
				<ion-select-option :key="0" :value="0">Seleccionar</ion-select-option>
				<ion-select-option v-for="i in 255" :key="i" :value="i">{{ i }}</ion-select-option>
			</ion-select>
		</ion-item>
	</ion-content>
	<div class="modal-footer">
			<ion-button color="grey" @click="cancel">
				Cancel
			</ion-button>
			<ion-button color="blue" @click="confirm">
				Filter
			</ion-button>
	</div>

</template>
<script setup lang="ts">
	import { moveStore } from '@/store/move.store';
import { pokemonStore } from '@/store/pokemon.store';
	import {
			IonButtons,
			IonButton,
			IonHeader,
			IonContent,
			IonToolbar,
			IonIcon,
			IonItem,
			IonLabel,
			modalController,
			IonSelect,
			IonSelectOption
	} from '@ionic/vue';
	import { close } from 'ionicons/icons'
	import { reactive } from 'vue';

	const store = moveStore();
	const storePokemon = pokemonStore();

	const filters = reactive({
		moves: storePokemon.filters.moves,
		experience: storePokemon.filters.experience,
	});

	function cancel() {
		modalController.dismiss(null, 'cancel');
	}
	function confirm() {
		storePokemon.filters.moves = filters.moves;
		storePokemon.filters.experience = filters.experience;
		storePokemon.getPokemonsFilter();
		modalController.dismiss(null, 'cancel');
	}

</script>
<style scoped lang="scss">
	
		ion-content{
			--background: white;
			--padding-end: 24px;
    	--padding-start: 24px;

			&.filter-container{

			

				ion-item{
					margin-bottom: 2vh;
					--background: #ececf2;
					--border-radius: 8px 8px 0px 0px;
					--color: #8D91A5;
				}
			}
		}
	

	ion-toolbar{
		--background: transparent;
	}
	.modal-footer{
		position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    min-height: 56px;
    justify-content: space-evenly;
		padding-bottom: 16px;

		ion-button {
  		--border-radius: 4px;
			width: 11em;
			font-family: 'Readex Pro';
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 24px;
		}
	}
</style>