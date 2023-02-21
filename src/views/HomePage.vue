<template>
	<ion-page>
		<HeaderSearch></HeaderSearch>

		<ion-content>
			<ion-card v-if="store.hasFilter && !store.isLoading">
				<ion-card-header>
					<ion-card-title>{{ store.total }} resultados</ion-card-title>
				</ion-card-header>
			</ion-card>
			
				<div class="row ion-padding-top" v-if="!store.isLoading">
					<div class="col"  size-sm="4" 
						v-for="pokemon in (store.isFilterActive ? store.paginatedLocalData : store.pokemonList)" 
						:key="pokemon.name" 
					>
						<PokemonCard :pokemon="pokemon"/>
					</div>
				</div>

				<div class="row" v-else>
					<div class="col" v-for="i in 10" :key="i">
						<PokemonCardLoading />
					</div>
				</div>
			
			
				
		</ion-content>

		<ion-footer class="ion-no-border" mode="md">
			<ion-toolbar>
				<PaginationComponent/>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script setup lang="ts">
	import { IonContent, IonPage, IonToolbar, IonFooter, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/vue';
	import PokemonCard from '@/components/pokemonCard.vue';
	import PokemonCardLoading from '@/components/pokemonCardLoading.vue';
	import { onMounted } from 'vue';
	import { pokemonStore } from '@/store/pokemon.store';
	import PaginationComponent from '@/components/paginationComponent.vue';
	import HeaderSearch from '@/components/headerSearch.vue';


	const store = pokemonStore();

	onMounted(async () => await store.getPokemons());
	
</script>

<style scoped lang="scss">
// Definir variables para el grid
$grid-columns: 12;
$grid-gutter: 16px;

// Definir el mixin para crear columnas
@mixin make-column($columns, $total-columns: $grid-columns) {
  flex: 0 0 auto;
  width: (100% / $total-columns) * $columns;
  margin-bottom: $grid-gutter;
}

// Definir el mixin para el grid
@mixin make-grid($columns: $grid-columns, $gutter: $grid-gutter) {
  display: flex;
  flex-wrap: wrap;
  margin-left: -$gutter;
  & > * {
    padding-left: $gutter;
  }
}

// Crear el grid para dispositivos móviles
.row {
  @include make-grid();
  .col {
    @include make-column(12);
  }
}

// Agregar estilos para dispositivos de escritorio
@media screen and (min-width: 768px) {
  .row {
    .col {
      @include make-column(4);
    }
  }
}

// Agregar estilos para pantallas más grandes
@media screen and (min-width: 992px) {
  .row {
    .col {
      @include make-column(3);
    }
  }
}
</style>
