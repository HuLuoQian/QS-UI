<template>
	<view class="container" :style="{ height: height }">
		<view class="line" v-if="index !== 0"></view>
		<view class="text-item">
			<text class="text1" :style="{
			'font-size': fontSize,
			'font-weight': fontWeight,
			'color': isActive?color:'#000000'
		}">{{tab[props.nameField] || tab}}</text>
		</view>
		<view class="text-item text-item2">
			<text class="text2" :class="isActive?'text2-active':''" :style="{
			'color': isActive?(props.columnBetweenActiveTextColor || '#ffffff'):(props.columnBetweenDefTextColor || '#999999'),
			backgroundColor: isActive?color:''
		}">{{tab.botTitle}}</text>
		</view>
	</view>
</template>
r
<script>
	export default {
		props: {
			tab: {
				type: [String, Number, Object, Array, Boolean]
			},
			height: {
				type: [String, Number]
			},
			fontSize: {
				type: [String, Number]
			},
			fontWeight: {
				type: [String, Number]
			},
			color: {
				type: String
			},
			activeColor: {
				type: String,
				default: ''
			},
			defColor: {
				type: String,
				default: ''
			},
			index: {
				type: [String, Number],
				default: null
			},
			tabsLen: {
				type: [String, Number],
				default: null
			},
			props: {
				type: Object
			},
			type: {
				type: String
			},
			isActive: {
				type: Boolean
			}
		}
	}
</script>

<style scoped>
	.text-item{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.text-item2{
		/* #ifdef APP-NVUE */
		margin-top: 6rpx;
		/* #endif */
	}

	.container {
		position: relative;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	
	.line{
		position: absolute;
		left: 0;
		top: 50%;
		transform: translate(-50%,-50%);
		height: 70%;
		width: 1px;
		background-color: #DDDDDD;
	}

	.text1 {
		transition-property: font-size, font-weight, height, width;
		transition-duration: .3s;
		/* #ifndef APP-NVUE */
		white-space: nowrap;
		text-align: center;
		width: 100%;
		/* #endif */
	}

	.text2 {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		/* #endif */
		padding: 3rpx 8rpx;
		border-radius: 30rpx;
		font-size: 22rpx;
		transition-property: padding, font-size, background-color, height, width;
		transition-duration: .3s;
		background-color: rgba(255, 255, 255, 0);
	}

	.text2-active {
		background-color: #4ABC00;
	}
</style>
