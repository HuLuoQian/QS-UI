<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="bgColor_ffffff padding-rpx_25 border-radius-rpx_10">
				<view class="flex_column_c_c">
					<text class="QS-text large weight">演示示例</text>
				</view>
				<QS-P height="100rpx"></QS-P>
				<view class="flex_row_c_c">
					<view class="block" :style="{
							backgroundColor: getThemes.primary
						}">

					</view>
				</view>
				<QS-P height="100rpx"></QS-P>
				<QS-Button theme="primary" @click="changeTheme">改变颜色</QS-Button>
			</view>
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
		computed: {
			getThemes() {
				return uni.$qs.store.getters['theme/theme'];
			}
		},
		methods: {
			changeTheme() {
				uni.$qs.store.dispatch('theme/setTheme', {
					name: 'primary',
					color: '#55aaff'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.block{
		height: 150rpx;
		width: 150rpx;
		transition: .3s;
	}
</style>
