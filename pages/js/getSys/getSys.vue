<template>
	<view class="QS">
		<view class="padding_25rpx">
			<view class="padding_25rpx bgColor_ffffff border-radius_10rpx">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">演示示例</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<showProps :prop="prop" :showDes="false"></showProps>
			</view>
			<QS-P height="25rpx"></QS-P>
			<view class="padding_25rpx bgColor_ffffff border-radius_10rpx">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">说明</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text color_666666 flex-wrap_wrap">使用方式: uni.$qs.getSys() , 在uni.getSystemInfoSync的基础上增加了H5BrowserType 字段， 该字段为H5环境时判断浏览器类型，如支付宝或者微信环境, 其值可以在QS-UI-CONFIG/config/values.js-->H5BrowserType字段配置</text>
			</view>
		</view>
		
		<QS-BackTop ref="QSBackTop"></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prop: []
			}
		},
		onReady() {
			const Sys = uni.$qs.getSys()
			this.prop = Object.keys(Sys).map(ite=>({ name: ite, value: Sys[ite] }));
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
