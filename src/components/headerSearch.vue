<template>
	<ion-header>
		<ion-toolbar class="ion-no-border">
			<img src="assets/images/pokeball_background.png">

			<div class="title"><!-- What pokemon are you looking for? -->
			
				<h2>What pokemon are you looking for?</h2>
			</div>

			<div class="search">
				<ion-item fill="solid">
					<ion-label position="floating">Search pokemon</ion-label>
					<ion-input @ionChange="search" :debounce="2000" v-model="store.filters.name"></ion-input>
					<ion-icon :icon="searchOutline" slot="end"></ion-icon>
				</ion-item>
				<ion-button fill="clear">
					<ion-icon slot="icon-only" :icon="options"></ion-icon>
				</ion-button>
			</div>
			
		</ion-toolbar>
	</ion-header>
</template>
<script setup lang="ts">
	import { pokemonStore } from '@/store/pokemon.store';
	import { IonHeader, IonToolbar, IonIcon, IonItem, IonInput, IonLabel, IonButton } from '@ionic/vue';
	import { searchOutline, options } from 'ionicons/icons'

	const store = pokemonStore();

	function search() {
		console.log('buscar');
		
		store.getPokemonsFilter();
	}
</script>
<style scoped lang="scss">
	ion-toolbar{
		--background: #072AC8;
		--min-height: 234px;
		--color: white;

		img{
			position: absolute;
			right: 0;
			top: 38px;
			filter: grayscale(1);
			opacity: 0.3;
		}

		.title{
			flex-direction: column;
			padding: 0px;
			gap: 8px;

			width: 70%;
			margin: 16px;
		}

		.search{
			display: flex;
			gap: 25px;
			justify-content: center;
			align-items: center;
		}

		ion-button{
			--color: #fcfcfc;
		}

		
		ion-item{
			.item-has-focus{
				color: #fcfcfc;
			}


			--background: transparent;
			--background-activated: transparent;
			--background-focused: transparent;
			--background-hover: transparent;
			--border-color: #fcfcfc;
			--color: #fcfcfc;
			--color-activated: #fcfcfc;
			--color-focused: #fcfcfc;
			--color-hover: #fcfcfc;
			--highlight-color-focused: #fcfcfc;
			--detail-icon-color: #fcfcfc;
			--detail-icon-font-size: 16px;

			ion-label{
				--color: #fcfcfc;
			}

			ion-label:focus {
				color: red;
			}
			ion-icon{
				color: #fcfcfc;
				margin-bottom: 0;
			}
		}
	}
</style>