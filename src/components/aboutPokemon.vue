<template>
	<div class="info">
		
		<ion-list lines="none">
			<ion-item>
				<div class="attribute">Species:</div> 
				<div class="value ion-text-capitalize"> {{ pokemonDetail.species.name }} </div>
			</ion-item>
			<ion-item>
				<div class="attribute">Height:</div> 
				<div class="value"> {{ pokemonDetail.height }} </div>
			</ion-item>
			<ion-item>
				<div class="attribute">Weight:</div> 
				<div class="value"> {{ pokemonDetail.weight }} </div>
			</ion-item>
			<ion-item>
				<div class="attribute">Abilities:</div> 
				<div class="value ion-text-capitalize" v-for="(item, index) in pokemonDetail.abilities" :key="index"> {{ item.ability.name }} </div>
			</ion-item>
			<ion-item>
				<div class="attribute">Experience:</div> 
				<div class="value"> {{ pokemonDetail.base_experience }} </div>
			</ion-item>
			<ion-item>
				<div class="attribute">Type:</div> 
				<div class="value ion-text-capitalize" v-for="(item, index) in pokemonDetail.types" :key="`types-${index}`"> {{ item.type.name }} </div>
			</ion-item>
		</ion-list>
	</div>
</template>
<script setup lang="ts">
	import { IonList, IonLabel, IonItem } from '@ionic/vue'
	import { PokemonDetail } from '@/interfaces/pokemonDetail';
	import { toRefs, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	
	const router = useRouter();
	
	const props = defineProps<{ 
		pokemonDetail: PokemonDetail
	}>();

	const { pokemonDetail } = toRefs(props);

	if (!pokemonDetail.value) {
		router.push({name: 'Home'})
	}
</script>
<style scoped lang="scss">
	.info{
		margin-left: 20px;
    margin-top: 30px;
		ion-list{
			ion-item{

				height: 34px;
				.attribute{
					font-family: 'Roboto';
					font-weight: 400;
					font-size: 16px;
					line-height: 22px;
					color: #8D91A5;

					width: 100px;
    			white-space: nowrap;
				}

				.value{
					margin-right: 12px;
					font-family: 'Roboto';
					font-weight: 600;
					font-size: 16px;
					line-height: 22px;
					color: #3B3B3B;
				}
			}
		}
	}
</style>