<template>
	<view class="container" :class="[{ active: isActive }]">
		<QSAnimation>
			<text class="tab-item-title" :class="[{ active: isActive }]" :style="{
				'height': height,
				'line-height': height,
				'font-size': fontSize,
				'font-weight': fontWeight,
				'color': color
			}">{{tab[props.nameField] || tab}}</text>
		</QSAnimation>
	</view>
</template>

<script>
	import QSAnimation from '@/uni_modules/QS-UI/components/QS-Animation/QS-Animation.vue';
	export default {
		components: {QSAnimation},
		props: {
			tab: {
				type: [String, Number, Object, Array, Boolean],
				default: ()=>{ return {} }
			},
			height: {
				type: [String, Number],
			},
			fontSize: {
				type: [String, Number],
			},
			fontWeight: {
				type: [String, Number],
			},
			color: {
				type: String,
			},
			props: {
				type: Object,
				default: ()=>{ return {  } }
			},
			type: {
				type: String,
			},
			isActive: {
				type: Boolean
			}
		}
	}
</script>

<style scoped>
	.container {
		position: relative;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* #ifndef APP-NVUE */
		display: flex;
		height: 100%;
		width: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		border-radius: 10rpx;
	}
	.active {
		/* background-color: #BC9D6F; */
	}
	.tab-item-title {
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		z-index: 30;
		/* #endif */
	}
	.active{
		transform: scale(1.2);
	}
</style>
