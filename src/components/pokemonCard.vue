<template>
	<ion-card>
		<div class="image-container">
			<img 
			style="height: 159px;"
			:src="pokemon.detail.sprites.other.home.front_default ?? pokemon.detail.sprites.other['official-artwork'].front_default" 
			/>
		</div>
		<ion-card-header>
			<ion-card-title>{{ pokemon.name }}</ion-card-title>
			<ion-card-subtitle>#{{ pokemon.detail.order }}</ion-card-subtitle>
		</ion-card-header>

		<ion-card-content>
			Moves <span class="value">{{ pokemon.detail.moves.length }}</span> Experience <span class="value">{{ pokemon.detail.base_experience }} </span>
		</ion-card-content>

		<div class="type-container">
			<ion-chip v-for="(type, index) in pokemon.detail.types" :key="index" color="medium">{{ type.type.name }}</ion-chip>
		</div>
		<!-- <ion-button v-for="(type, index) in pokemon.detail.types" :key="index" fill="clear" >
			<ion-chip color="medium">{{ type.type.name }}</ion-chip>
		</ion-button> -->
	</ion-card>
</template>
<script setup lang="ts">
 import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonChip } from '@ionic/vue';
	import { toRefs, defineProps } from 'vue';
	import { Pokemon } from '@/interfaces/pokemon';

	const props = defineProps<{ 
	pokemon: Pokemon
	}>();	

	const { pokemon } = toRefs(props);
</script>
<style scoped lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@500&display=swap');
	
	ion-card{
		--background: #fdfdfd;
		margin: 24px 0;
		border-radius: 16px;
		box-shadow: none !important;
		ion-card-title{
			font-family: 'Readex Pro';
			font-weight: 500;
			font-size: 20px;
			line-height: 28px;
		}
		ion-card-subtitle{
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			font-size: 14px;
			line-height: 22px;
			color: #8D91A5;
		}

		ion-card-content{
			color: #8D91A5;
			gap: 7px;
			padding-bottom: 0;
    	display: flex;
		}
	}

	.type-container{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0px;
		gap: 8px;
		margin: 16px 16px;
		width: 296px;
		height: 32px;

	}

	.image-container{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background: #ececf2;
	}
	
	.value{
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 22px;
		/* identical to box height, or 157% */


		color: #55596D;
	}
</style>