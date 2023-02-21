<template>
	<ion-page>
		<ion-header class="ion-no-border">
			<ion-toolbar mode="md">
				<ion-buttons slot="start">
					<ion-button @click="router.go(-1)" fill="clear">
						<ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-no-padding">
			<div class="header-detail">
				<div class="pokemon-name ion-text-capitalize">
					{{ pokemonSelected.name }} <div class="order"> #{{ pokemonSelected.detail.order }} </div>
				</div>
				<img 
					:src="pokemonSelected.detail.sprites.other.home.front_default ?? pokemonSelected.detail.sprites.other['official-artwork'].front_default" 
				>
			</div>
			
			<AboutPokemon	:pokemon-detail="pokemonSelected.detail"/>
		</ion-content>
	</ion-page>
</template>
<script setup lang="ts">
	import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/vue';
	import { arrowBack } from 'ionicons/icons'
	import { pokemonStore } from '@/store/pokemon.store';
	import { toRefs } from 'vue';
	import AboutPokemon from '@/components/aboutPokemon.vue';
	import { useRouter } from 'vue-router';
	
	const router = useRouter();
	const store = pokemonStore();
	const { pokemonSelected } = toRefs(store);


</script>
<style setup lang="scss">
	ion-content{
		--background: #fdfdfd;
	}
	.header-detail{
		background: #ececf2;
		width: 100%;
		height: 237px;
		display: flex;
    justify-content: center;
    align-items: center;

		.pokemon-name{
			font-family: 'Readex Pro';
			font-weight: 600;
			font-size: 24px;
			line-height: 32px;
			color: #3B3B3B;
			position: absolute;
    	top: 40px;
			display: flex;
			gap: 10px;

			.order{
				font-family: 'Readex Pro';
				font-weight: 500;
				font-size: 16px;
				line-height: 32px;
				color: #3B3B3B;
			}
		}
		img{
			width: 146px;
			height: 143px;
		}
	}
	ion-toolbar{
		--background: #ececf2;
	}
</style>