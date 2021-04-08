<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view id="test" class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<QS-P height="60rpx"></QS-P>
				<view class="flex_row_c_c">
					<text class="QS-text">id: test</text>
				</view>
				<QS-P height="60rpx"></QS-P>
			</view>
			<QS-P height="50rpx"></QS-P>
			<QS-Button theme="primary" @click="query($event, '#test')">获取#test布局信息</QS-Button>
			<QS-P height="60rpx"></QS-P>
			<view class="test padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<QS-P height="60rpx"></QS-P>
				<view class="flex_row_c_c">
					<text class="QS-text">class: test</text>
				</view>
				<QS-P height="60rpx"></QS-P>
			</view>
			<QS-P height="50rpx"></QS-P>
			<QS-Button theme="primary" @click="query($event, '.test')">获取.test布局信息</QS-Button>
			
			<QS-P height="60rpx"></QS-P>
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<QS-P height="60rpx"></QS-P>
				<view class="flex_row">
					<view class="flex_1 flex_row_c_c test2" v-for="(item, index) in 3" :key="index">
						<text class="QS-text">class: test2</text>
					</view>
				</view>
				<QS-P height="60rpx"></QS-P>
			</view>
			<QS-P height="50rpx"></QS-P>
			<QS-Button theme="primary" @click="query($event, '.test2', { size: true, rect: true }, 'selectAll')">获取所有.test2布局信息</QS-Button>
			
			<QS-P height="60rpx"></QS-P>
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<QS-P height="60rpx"></QS-P>
				<view class="flex_row">
					<view class="flex_1 flex_row_c_c" :id="'test2_' + index" v-for="(item, index) in 3" :key="index">
						<text class="QS-text">id: test2_{{index}}</text>
					</view>
				</view>
				<QS-P height="60rpx"></QS-P>
			</view>
			<QS-P height="50rpx"></QS-P>
			<QS-Button theme="primary" @click="query($event, ['#test2_0', '#test2_1', '#test2_2'], { size: true, rect: true })">获取#test2_[0-2]布局信息</QS-Button>
		</view>
		
		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			query(e, ...args) {
				uni.$qs.getQuery(...args)
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
