<template lang="">
	<ion-header>
		<ion-toolbar class="ion-no-border">
			<div class="title"><!-- What pokemon are you looking for? -->
			
				<h2>What pokemon are you looking for?</h2>
			</div>
			
			<img src="assets/images/pokeball_background.png">
			<!-- <div class="img-poke"></div> -->
		</ion-toolbar>
	</ion-header>
</template>
<script setup lang="ts">
	import { IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
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
	}
</style>