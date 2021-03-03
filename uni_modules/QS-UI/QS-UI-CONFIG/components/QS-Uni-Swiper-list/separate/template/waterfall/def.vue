<template>
	<view ref="item" class="list-item">
		<view class="image-box">
			<image 
			src="http://imgsrc.baidu.com/forum/w%3D580/sign=3792b3922da446237ecaa56aa8237246/c4be73094b36acaf746d5f1471d98d1000e99c1e.jpg" 
			mode="aspectFill" 
			class="image" 
			:style="{
				height: imageHieght + 'rpx',
				width: imageWidth + 'rpx'
			}"
			@load="imageLoaded"></image>
			<text class="image-box-text">距您2.5km</text>
		</view>
		<view class="content">
			<view class="content-line1">
				<text class="text content-line1-title">同城</text>
				<text class="text content-line1-content">这是标题内容，这是标题内容，这是标题内容，这...</text>
			</view>
			<text class="text content-line2">这是标题内容，这是标题内容，这是标题内容，这...</text>
			<view class="content-line3">
				<view class="content-line3-left">
					<text class="active-price-symbol">￥</text>
					<text class="active-price">250</text>
					<text class="def-price">￥1340</text>
				</view>
				<text class="text content-line3-right">金华</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			itemObj: {
				type: [Object, String, Number],
				default: () => {
					return {}
				}
			},
			customData: {
				type: [Object,Array,String,Boolean,Number]
			}
		},
		data() {
			return {
				loaded: false,
				imageHieght: 330,
				imageWidth: 330
			}
		},
		methods: {
			viewLoad(e) {
				console.log(e);
			},
			imageLoaded(e) {
				if(!this.loaded) {
					this.loaded = true;
					const imageInfo = e.detail;
					this.imageHieght = this.imageWidth/imageInfo.width*imageInfo.height;
				}
			}
		}
	}
</script>

<style scoped>
	.list-item {
		width: 330rpx;
		margin-left: 12px;
		margin-right: 12px;
		margin-top: 12px;
		/* padding: 20px; */
		background-color: #fff;
		border-radius: 5px;
		flex-direction: column;
		border-radius: 20rpx;
		overflow: hidden;
	}
	
	.image-box{
		position: relative;
	}
	
	.image {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}
	
	.image-box-text{
		position: absolute;
		left: 10rpx;
		bottom: 10rpx;
		font-size: 28rpx;
		color: white;
		padding: 10rpx;
		background-color: rgba(0,0,0,.6);
	}

	.content {
		padding: 15rpx;
		flex-direction: column;
	}
	.text-title{
		background-color: #F0AD4E;
		padding: 5rpx;
		border-radius: 5rpx;
		
	}
	.text{
		font-size: 24rpx;
	}
	.content-line1{
		flex-direction: row;
		align-items: center;
	}
	.content-line1-title{
		padding: 5rpx;
		width: 70rpx;
		border-radius: 5rpx;
		text-align: center;
		background-image: linear-gradient(to right, #FE9B26, #F46400);
		/* linear-gradient(-90deg,rgba(0,129,250,1) 0%,rgba(66,168,252,1) 100%); */
		color: white;
	}
	.content-line1-content{
		margin-left: 10rpx;
	}
	.content-line2{
		line-height: 34rpx;
	}
	.content-line3{
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
	}
	.active-price-symbol{
		color: #f1505c;
		font-size: 28rpx;
	}
	.active-price{
		color: #f1505c;
		font-size: 32rpx;
	}
	.def-price{
		font-size: 30rpx;
		color: #adadad;
		text-decoration: line-through;
		margin-left: 10rpx;
	}
	.content-line3-left{
		flex-direction: row;
		align-items: flex-end;
	}
	.content-line3-right{
		font-size: 30rpx;
		color: #adadad;
	}
</style>
