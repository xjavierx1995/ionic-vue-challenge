<template>
	<ion-page class="detail-page">
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
			<div class="select-segment">
				<ion-segment  :value="menu" @ionChange=" menu = $event.detail.value!">
					<ion-segment-button value="about">
						<ion-label>About</ion-label>
					</ion-segment-button>
					<ion-segment-button value="moves">
						<ion-label>Moves</ion-label>
					</ion-segment-button>
				</ion-segment>
			</div>
			
			<AboutPokemon v-if="menu === 'about'"	:pokemon-detail="pokemonSelected.detail"/>
			<MovesPokemon v-if="menu === 'moves'" :pokemon-moves="pokemonSelected.detail.moves" />
		</ion-content>
	</ion-page>
</template>
<script setup lang="ts">
	import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
	import { arrowBack } from 'ionicons/icons'
	import { pokemonStore } from '@/store/pokemon.store';
	import { toRefs, ref } from 'vue';
	import AboutPokemon from '@/components/aboutPokemon.vue';
	import MovesPokemon from '@/components/movesPokemon.vue';
	import { useRouter } from 'vue-router';
	
	const router = useRouter();
	const store = pokemonStore();
	const { pokemonSelected } = toRefs(store);
	const menu = ref('about');


</script>
<style setup lang="scss">
	.detail-page{
		ion-content{
			--background: #fdfdfd;

			.select-segment{
				padding: 0 16px;
				ion-segment {
					height: 70px;
					width: 230px;
					--background: #fdfdfd;


					ion-segment-button {
						font-family: 'Roboto';
						font-style: normal;
						font-weight: 400;
						font-size: 2vh;
						line-height: 24px;

						--indicator-color: #4361EE;
						--color: #8D91A5;
						--color-checked: #4361EE;
						--indicator-height: 4px;

						&::part(indicator){
							// background-color: red;
							top: auto;
						}
					}
				}
			}
		
			.header-detail{
				background: #ececf2;
				width: 100%;
				height: 25vh;
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
					top: 1vh;
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
					// width: 146px;
					// height: 143px;
					width: 20vh;
					height: 20vh;
				}
			}
		}
		ion-toolbar{
			--background: #ececf2;
		}
	}
</style>