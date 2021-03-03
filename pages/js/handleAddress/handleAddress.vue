<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">演示示例</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="handleAddress">解析地址</QS-Button>
			</view>
			<QS-P height="25rpx"></QS-P>
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">说明</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text color_666666 flex-wrap_wrap">使用方式: uni.$qs.handleAddress('需解析的文本'), 目前为中国内地址解析</text>
			</view>
		</view>
		
		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	export default {
		methods: {
			handleAddress() {
				const res = `结果: ${JSON.stringify(uni.$qs.handleAddress('浙江省金华市婺城区'))}`;
				console.log(res)
				uni.$qs.modal({ content: res });
			}
		}
	}
</script>

<style>

</style>
