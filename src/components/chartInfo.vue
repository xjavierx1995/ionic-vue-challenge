<template>
	<div class="chart-container">
    <canvas id="myChart"></canvas>
  </div>
</template>
<script setup	lang="ts">
	import { PokemonDetail } from '@/interfaces/pokemonDetail';
	import { Chart } from 'chart.js/auto'
	import { onMounted, ref, toRefs } from 'vue';

	const props = defineProps<{ 
		pokemonDetail: PokemonDetail
	}>();

	const { pokemonDetail } = toRefs(props);
	
	
	
	const chart = ref()

	function getInfo() {
		const stats = pokemonDetail.value.stats.reduce((acc: any, stat) => {
			acc[stat.stat.name] = stat.base_stat;
			return acc;
		}, {});

		return [
			stats.speed,
			stats['special-defense'],
			stats['special-attack'],
			stats['defense'],
			stats['attack'],
			stats['hp']
		]
		
	}

	function setupChart() {
		const chartData = {
			labels: [ 
				'Speed',
				'Sp Defense',
				'Sp Attack',
				'Defense',
				'Attack',
				'Hp',
			],
			datasets: [{

				axis: 'y',
				
				data: getInfo(),
				fill: false,
				backgroundColor: ['#072AC8'],
				borderWidth: 1
			}]
		}
		const canvas = document.getElementById('myChart') as HTMLCanvasElement
		const ctx = canvas.getContext('2d');
		chart.value = new Chart(ctx!, {
			data: chartData,
			type: 'bar',

			options: {
				responsive: true,
				plugins:{
					legend:{
						display: false
					}
				},
				/* legend: {
						display: false
				}, */
				indexAxis: 'y'
			}
		})
	}
  onMounted(() => setupChart())
</script>
<style lang="scss">
	/* #myChart {
		width: 100%;
		height: 400px;
	} */

	.chart-container{
		max-width: 43vh;
		margin: auto;
	}
</style>