<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view id="test" class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<QS-P height="60rpx"></QS-P>
				<view class="flex_row_c_c">
					<text class="QS-text">id: #test</text>
				</view>
				<QS-P height="60rpx"></QS-P>
			</view>
				<QS-P height="50rpx"></QS-P>
			<QS-Button theme="primary" @click="query">获取#test布局信息</QS-Button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			query() {
				this.getQuery('#test')
					.then(res=>{
						console.log(res);
						uni.$qs.modal({
							content: '布局信息: ' + JSON.stringify(res)
						})
					})
			}
		}
	}
</script>

<style>

</style>
