<template>
	<view class="QS padding-rpx_25">
		<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
			<QS-P height="20vh"></QS-P>
			<view class="flex_column_c_c">
				<text class="QS-text weight">请下拉页面触发刷新</text>
				<QS-P height="20px"></QS-P>
				<text class="QS-text color_808080">为优化用户体验, 若接口访问很快, 则在固定时间后停止刷新动画</text>
			</view>
			<QS-P height="20vh"></QS-P>
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
			pullDownRefreshFn() {	//名字为 values.js - mixins - pullDownRefreshFnName 配置
				return new Promise(rs=>{
					uni.$qs.toast('刷新成功, 为了用户体验, 最低刷新动画时长:' + uni.$qs.config.stopPullDownRefreshDuration + '毫秒')
					rs();
				}) 
			}
		}
	}
</script>

<style>

</style>
