<template>

	<ion-grid :fixed="true" v-if="!loading">
		<ion-row>
			<ion-col 
				:style="`background-color:${TypesIcons[item.type].color}`" 
				class="ion-text-capitalize" size="4" v-for="(item, index) in movesDetailed" :key="index">
				<img class="type-icon" :src="TypesIcons[item.type].url" />
				<br>
				{{ item.name.replace('-', ' ') }}
			</ion-col>
		</ion-row>
	</ion-grid>

	<ion-grid :fixed="true" v-else>
		<ion-row>
			<ion-col class="ion-text-capitalize" size="4" v-for="i in 10" :key="i">
				<ion-skeleton-text :animated="true" style="width: 20px"></ion-skeleton-text>
				<br>
				<ion-skeleton-text :animated="true" style="width: 50px"></ion-skeleton-text>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>
<script setup lang="ts">
	import { IonGrid, IonRow, IonCol, IonSkeletonText } from '@ionic/vue';
	import axios from '@/plugins/axios';
	import { toRefs, onMounted, ref, Ref } from 'vue';
	import { TypesIcons } from '@/helpers/types';

	const props = defineProps<{ 
		pokemonMoves: {
			move:{
				name: string;
				url: string;
			}
		}[]
	}>();

	const { pokemonMoves } = toRefs(props);
	const movesDetailed: Ref<any[]> = ref([]);
	const loading = ref(false);

	async function getMovesDetails() {				
		loading.value = true;
		const promises = pokemonMoves.value.map(async (e): Promise<any> => {

			const res = await axios.get(`move/${e.move.name}`)
			
			return {
				name: e.move.name,
				type: res.data.type.name
			}
		});
		movesDetailed.value = await Promise.all(promises);

		movesDetailed.value.sort((a, b) => {
			if (a.type < b.type) {
				return -1;
			}
			if (a.type > b.type) {
				return 1;
			}
			return 0;
		});
		loading.value = false;
	}

	onMounted(async () => {
		await getMovesDetails();
	})
	
</script>
<style lang="scss">
	ion-col{
		height: 13vh;
		padding: 16px;
		margin: 7px;
		// background-color: #135d54;
		border: solid 1px #fff;
		color: #fdfdfd;
		text-align: center;
		border-radius: 4px;

		max-width: calc(calc(2 / var(--ion-grid-columns, 8.1)) * 54vh) !important;

		.type-icon{
			filter: brightness(3);
			width: 3vh;
			height: 3vh;
			margin-bottom: 6px;
		}
	}
	
</style>