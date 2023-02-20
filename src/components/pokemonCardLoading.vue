<template>
	<ion-card button>
		<div class="image-container">
			<ion-skeleton-text :animated="true"></ion-skeleton-text>
		</div>
		<ion-card-header>
			<ion-card-title><ion-skeleton-text :animated="true"></ion-skeleton-text></ion-card-title>
			<ion-card-subtitle><ion-skeleton-text :animated="true"></ion-skeleton-text></ion-card-subtitle>
		</ion-card-header>

		<ion-card-content>
			<ion-skeleton-text :animated="true"></ion-skeleton-text>
		</ion-card-content>

		<div class="type-container">
			<ion-chip>
				<ion-avatar>
					<ion-skeleton-text :animated="true"></ion-skeleton-text>
				</ion-avatar>
				<ion-skeleton-text :animated="true"></ion-skeleton-text>
				
			</ion-chip>
		</div>
	</ion-card>
</template>
<script setup lang="ts">
 	import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonLabel, IonAvatar, IonSkeletonText } from '@ionic/vue';
</script>
<style scoped lang="scss">
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

		ion-chip{
			--background: #ececf2;
			--color: #8d91a5;
			ion-avatar{
				margin: auto;
				img{
					width: 16px;
					height: 16px;
				}
			}
		}
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