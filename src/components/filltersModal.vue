<template>
	<ion-header class="ion-no-border">
		<ion-toolbar mode="md">
			<ion-buttons slot="start">
				<ion-button @click="cancel">
					<ion-icon slot="icon-only" color="blue" :icon="close"></ion-icon>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding-horizontal">
		<h2>Filtrer pokemon list</h2>
		<ion-item>
			<ion-label position="stacked">Enter your name</ion-label>
			<ion-input ref="input" type="text" placeholder="Your name"></ion-input>
		</ion-item>
		<ion-item>
    	<ion-select 
				:multiple="true" 
				mode="md"
				:value="filters.moves"
				@ionChange="filters.moves = $event.detail.value" 
				interface="popover" 
				placeholder="Select movement number">
				<ion-select-option v-for="item in store.moveList" :key="item.name" :value="item.name">{{ item.name }}</ion-select-option>
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
			IonInput,
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
		experience: 0,
	});

	function cancel() {
		modalController.dismiss(null, 'cancel');
	}
	function confirm() {
		console.log(filters);
		storePokemon.filters.moves = filters.moves;
		storePokemon.getPokemonsFilter();
		modalController.dismiss(null, 'cancel');
	}

	function compareWith(o1: any, o2: any) {
		console.log(o1, o2);
		
		return o1 && o2 ? o1 === o2 : o1 === o2;
	}
</script>
<style scoped lang="scss">
	ion-modal{
		ion-content{
			--background: white;
			--padding-end: 24px;
    	--padding-start: 24px;
		}
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