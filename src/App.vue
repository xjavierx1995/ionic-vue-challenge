<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@500&family=Roboto&display=swap');
	ion-content{
		--background: #dcdde8;
		--padding-end: 16px;
    --padding-start: 16px;
		font-family: 'Roboto' !important;
	}
</style>
