<template>
	<view class="QS">
		<view class="padding_25rpx">
			<view class="padding_25rpx bgColor_ffffff border-radius_10rpx">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">演示示例</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<view class="flex_row_c_c">
					<text class="QS-text large-xxx">{{countDownObj && countDownObj.text || '请点击开始'}}</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="start">开始倒计时</QS-Button>
			</view>
			<QS-P height="25rpx"></QS-P>
			<view class="padding_25rpx bgColor_ffffff border-radius_10rpx">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">说明</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text color_666666 flex-wrap_wrap">使用方式: uni.$qs.handleAddress('需解析的文本'), 目前为中国内地址解析</text>
			</view>
		</view>
		
		<QS-BackTop ref="QSBackTop"></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countDownObj: null
			}
		},
		methods: {
			start() {
				this.countDownObj = uni.$qs.countDown({
					id: 'testId', //需传入id， 多次生成会重置
					beginDate: +new Date() + 1000*10,
					endDate: +new Date() + 1000*20,
					text: '已开始活动',
					aboutToBeginText: '距离开始还有',
					aboutToEndText: '距离结束还有',
					endedText: '已结束',
					showEnd: true,
					showEndThreshold: 1000 * 5
				})
			}
		}
	}
</script>

<style>

</style>
