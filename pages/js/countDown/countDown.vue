<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">演示示例</text>
				</view>
				<QS-P height="100rpx"></QS-P>
				<view class="flex_row_c_c">
					<text class="QS-text large-xx weight">{{countDownObj && countDownObj.text || '请点击开始'}}</text>
				</view>
				<QS-P height="100rpx"></QS-P>
				<QS-Button @click="start">{{getBtnName}}</QS-Button>
			</view>
			<QS-P height="25rpx"></QS-P>
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">uni.$qs.countDown 参数说明(默认值):</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<showProps :prop="prop"></showProps>
				<text class="QS-text color_666666 flex-wrap_wrap"></text>
			</view>
		</view>
		
		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countDownObj: null,
				prop: [
					{ 
						name: 'id',
						value: 'uuid()',
						des: '对于相同id多次生成倒计时对象时不会生成多个, 建议传入'
					},
					{
						name: 'beginDate',
						value: '',
						des: '距离开始时间'
					},
					{
						name: 'endDate',
						value: '',
						des: '距离结束时间'
					},
					{
						name: 'text',
						value: '确定',
						des: '到达开始时间后的文字'
					},
					{
						name: 'aboutToBeginText',
						value: '距离开始还有',
						des: '开始时间前的文字'
					},
					{
						name: 'aboutToEndText',
						value: '距离结束还有',
						des: '结束时间前的文字'
					},
					{
						name: 'endedText',
						value: '已结束',
						des: '已结束的文字'
					},
					{
						name: 'showEndThreshold',
						value: true,
						des: '是否在结束前显示aboutToEndText'
					},
					{
						name: 'showEndThresholdTime',
						value: '1000 * 60 * 60 * 24 * 1',
						des: '是否在结束前显示aboutToEndText的阈值'
					},
					{
						name: 'intervalTime',
						value: 1000,
						des: '倒计时精度, 越小越精准'
					}
				]
			}
		},
		computed: {
			getBtnName() {
				if(!this.countDownObj) return '开始倒计时';
				switch(this.countDownObj.status) {
					case 1:
						return '活动未开始';
						break;
					case 2:
						return '活动已开始';
						break;
					case 3:
						return '活动已结束';
						break;
				}
				return '开始倒计时';
			}
		},
		beforeDestroy() {
			if(this.countDownObj) this.countDownObj.stop();
		},
		methods: {
			start() {
				this.countDownObj = uni.$qs.countDown({
					id: 'testId', //需传入id， 多次生成会重置, 建议传入
					beginDate: +new Date() + 1000*10,
					endDate: +new Date() + 1000*20,
					text: '已开始活动',
					aboutToBeginText: '距离开始还有',
					aboutToEndText: '距离结束还有',
					endedText: '已结束',
					showEndThreshold: true,
					showEndThresholdTime: 1000 * 8,
					intervalTime: 100	//默认为1000毫秒, 该数值越小精度越高
				})
			}
		}
	}
</script>

<style>

</style>
