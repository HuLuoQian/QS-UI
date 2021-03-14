<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="bgColor_ffffff border-radius-rpx_10 padding-rpx_25">
				<view class="flex_column_c_c">
					<text class="QS-text large weight">演示示例</text>
					<QS-Sticky></QS-Sticky>
				</view>
				<QS-P height="40rpx"></QS-P>
				
				
			</view>
		</view>
		<QS-BackTop ref="QSBackTop"></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.tab-line{
	position: absolute;
	border-radius: 10rpx;
	transition: left .3s;
}
</style>
