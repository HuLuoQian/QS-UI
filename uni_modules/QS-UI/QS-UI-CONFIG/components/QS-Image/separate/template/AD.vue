<template>
	<view class="QS container">
		<view class="AD-tag">
			<text class="text">广告</text>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
.container{
	// #ifndef APP-NVUE
	height: 100%;
	width: 100%;
	display: block;
	// #endif
	// #ifdef APP-NVUE
	flex: 1;
	// #endif
	.AD-tag{
		position: absolute;
		right: 0;
		top: 0;
		padding: 10rpx;
		border-bottom-left-radius: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: rgba(0,0,0,.5);
		.text{
			font-size: 24rpx;
			color: #ffffff;
		}
	}
}
</style>
