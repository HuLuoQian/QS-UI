<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="bgColor_ffffff border-radius-rpx_10">
				<QS-P height="500rpx"></QS-P>
				<view class="flex_row_c_c">
					<text class="QS-text large weight color_333333">请上滑页面</text>
				</view>
				<QS-P :height="`${pageHeight + 100}px`"></QS-P>
			</view>
		</view>
		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageHeight: uni.$qs.getSys().screenHeight
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
