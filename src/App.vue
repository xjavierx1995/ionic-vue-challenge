<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { moveStore } from './store/move.store';
const store = moveStore();

onMounted(async () => await store.getMoves());
</script>
<style lang="scss">
	@import "@hennge/vue3-pagination/dist/vue3-pagination.css";
	@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@500&family=Roboto&display=swap');
	ion-content{
		--background: #dcdde8;
		--padding-end: 16px;
    --padding-start: 16px;
		font-family: 'Roboto' !important;
	}

	h2{
		font-family: 'Readex Pro';
		font-style: normal;
		font-weight: 500;
		font-size: 3.3vh;
		line-height: 28px;
	}
</style>
