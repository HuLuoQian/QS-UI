<template>
   <view class="list-item">
	   <view class="top">
		   <view class="top-left-view">
			<image class="leftImage" src="http://imgsrc.baidu.com/forum/w%3D580/sign=3792b3922da446237ecaa56aa8237246/c4be73094b36acaf746d5f1471d98d1000e99c1e.jpg" mode="aspectFill"></image>
		   </view>
		   <view class="top-right-view">
				<view class="top-right-view-item">
					<text class="title">不老神鸡</text>
				</view>
				<view class="top-right-view-item">
					<QSProgress ref="QSProgress" type="index_list" iconSize="30rpx" :percent="3.8" maxPercent="5"></QSProgress>
				</view>
				<view class="top-right-view-item">
					<view class="info-box">
						<text class="info">蛋糕 双溪西路</text>
						<text class="info">780m</text>
					</view>
				</view>
				<view class="top-right-view-item">
					<view class="address-box">
						<text class="address qs-icons">不老神鸡双溪西路店·离你最近{{QSIconsJs['arrow-down']}}</text>
					</view>
				</view>
		   </view>
	   </view>
	   <view class="bottom">
		   <view class="bottom-item">
				<image src="/static/city-wide.png" mode="scaleToFill" class="bottom-left-image-city-wide"></image>
				<image src="/static/shopping.png" mode="scaleToFill" class="bottom-left-image-shopping"></image>
				<text class="bottom-text">￥45</text>
				<text class="bottom-text bottom-text-child line-through">￥250</text>
				<text class="bottom-text bottom-text-child elipsis">新西兰进口纽仕兰牧场部分脱</text>
		   </view>
		   <view class="bottom-item">
				<image src="/static/city-wide.png" mode="scaleToFill" class="bottom-left-image-city-wide"></image>
				<image src="/static/shopping.png" mode="scaleToFill" class="bottom-left-image-shopping"></image>
				<text class="bottom-text">￥45</text>
				<text class="bottom-text bottom-text-child line-through">￥250</text>
				<text class="bottom-text bottom-text-child elipsis">新西兰进口纽仕兰牧场部分脱</text>
		   </view>
		   <view class="bottom-more">
				<text class="bottom-text qs-icons">更多{{QSIconsJs['arrow-right']}}</text>
		   </view>
	   </view>
   </view>
</template>

<script>
	import QSProgress from '@/QS-UI/components/QS-Progress/QS-Progress.vue';
	import QSIconsJs from '@/QS-UI/components/QS-Icons/icons.js';
    export default {
		components: {QSProgress},
		props: {
			itemObj: {
				type: [Object, String, Number],
				default: ()=>{ return {} }
			},
			customData: {
				type: [Object,Array,String,Boolean,Number]
			}
		},
		data() {
			return {
				QSIconsJs: QSIconsJs
			}
		},
		methods: {
			
		}
    }
</script>

<style scoped>
    .list-item {
        margin-left: 20rpx;
        margin-right: 20rpx;
        margin-top: 20rpx;
        padding: 30rpx;
        background-color: #fff;
        border-radius: 5px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
    }
	.top{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
	.top-left-view{
		/* flex: 2; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		height: 160rpx;
		width: 160rpx;
		margin-right: 30rpx;
	}
	.leftImage{
		height: 160rpx;
		width: 160rpx;
		border-radius: 10rpx;
	}
	.top-right-view{
		/* flex: 5; */
		width: 460rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		/* background-color: #007AFF; */
	}
	.top-right-view-item{
		height: 36.25rpx;
	}
	.title{
		font-size: 32rpx;
		font-weight: bold;
		color: #000000;
	}
	.info{
		font-size: 28rpx;
		color: #999999;
	}
	.address-box{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		height: 36.25rpx;
	}
	.address{
		font-size: 24rpx;
		background-color: #FFEFDF;
		height: 36.25rpx;
		padding: 6.125rpx;
	}
	.info-box{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
	}
	.bottom{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}
	.bottom-item{
		margin-top: 15rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		
	}
	.bottom-left-image-city-wide{
		height: 32rpx;
		width: 121rpx;
	}
	.bottom-left-image-shopping {
		height: 32rpx;
		width: 32rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}
	.bottom-text {
		font-size: 24rpx;
		color: #999999;
	}
	.bottom-text-child{
		margin-left: 8rpx;
	}
	.line-through{
		text-decoration: line-through;
	}
	.elipsis{
		/* #ifndef APP-NVUE */
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		text-overflow: ellipsis;
		/* #endif */
		width: 320rpx;
	}
	.bottom-more{
		margin-top: 15rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
