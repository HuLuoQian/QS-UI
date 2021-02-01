<template>
	<view class="container">
		<view class="line" v-if="isActive"></view>
		<text class="tab-item-title" :style="{
			'height': height,
			'line-height': height,
			'font-size': fontSize,
			'font-weight': fontWeight,
			'color': color
		}">{{tab[props.nameField] || tab}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			tab: {
				type: [String, Number, Object, Array, Boolean],
				default: ()=>{ return {} }
			},
			height: {
				type: [String, Number],
				default: '84rpx'
			},
			fontSize: {
				type: [String, Number],
				default: '30rpx'
			},
			fontWeight: {
				type: [String, Number],
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
			props: {
				type: Object,
				default: ()=>{ return {  } }
			},
			type: {
				type: String,
				default: ''
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* flex: 1; */
		height: 100%;
		width: 100%;
	}
	.line{
		position: absolute;
		bottom: 24rpx;
		left: 50%;
		transform: translateX(-50%);
		height: 2px;
		width: 80%;
		background-color: #BC9D6F;
		z-index: 20;
	}
	.tab-item-title {
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		z-index: 30;
	}
</style>
