<template>
	<view class="QS container" @tap="_click">
		<view class="image-box">
			<image 
			:src="listItem.img"
			 mode="aspectFill" 
			 class="image" 
			 :class="{
				 show: imgShow
			 }" 
			 @load="imageLoaded"></image>
			<!-- <text class="image-box-text">距您2.5km</text> -->
		</view>
		<view class="content">
			<!-- <view class="flex_row">
				<image class="title-image" :src="listItem.img" mode="aspectFill"></image>
				<text class="QS-text mini-xx color_888888 margin-left-rpx_15">帝壹城总服务台</text>
			</view> -->
			<text class="QS-text mini-x color_000000 weight_500">{{listItem.title || ''}}</text>
			<view class="flex_row_between_c margin-top-rpx_15">
				<view class="flex_row_none_c">
					<image class="image-dollar-small" src="/static/image/dollar.png" mode="aspectFill"></image>
					<QS-P width="12rpx"></QS-P>
					<text class="QS-text large weight_600 color_F30000">{{listItem.point || 0}}</text>
				</view>
				<!-- <text class="QS-text mini color_999999">已兑{{listItem.sales || 0}}</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			listItem: {
				type: [Object, String, Number, Array],
				default: () => {
					return {}
				}
			},
			type: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				imgShow: false
			}
		},
		methods: {
			_click() {
				// uni.showToast({
				// 	title: `点击了${this.listItem.index}`,
				// 	icon: 'none',
				// 	position: 'center'
				// })
				this.navigateTo('integralMall.integralProductDetail', {
					id: this.listItem.id
				});
			},
			imageLoaded(e) {
				console.log('图片加载完成', e)
				this.$nextTick(()=>{
					this.imgShow = true;
				})
				this.$emit('imgLoaded')
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		flex-direction: column;
		border-radius: 10rpx;
		overflow: hidden;
		// padding: 15rpx;
		background-color: #fff;
	}

	.list-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
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

	.image-box {
		// position: relative;
		// width: 100%;
		width: 100%;
		position: relative;
		height: 0;
		padding-top: 100%;
	}

	.image {
		// border-top-left-radius: 10rpx;
		// border-top-right-radius: 10rpx;
		// width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		opacity: 0;
		transition: opacity .3s;

		&.show {
			opacity: 1;
		}
	}

	.image-box-text {
		position: absolute;
		left: 10rpx;
		bottom: 10rpx;
		font-size: 28rpx;
		color: white;
		padding: 10rpx;
		background-color: rgba(0, 0, 0, .6);
	}

	.content {
		padding: 18rpx 20rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.title-image {
		height: 40rpx;
		width: 40rpx;
		border-radius: 50%;
	}
</style>
