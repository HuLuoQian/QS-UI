<template>
	<view class="QS">
		<view class="min-height_100vh flex_column_c_c">
			<text class="QS-text large color_808080">此页面为测试路由跳转页面(需登录)</text>
		</view>
		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				a: ''
			}
		},
		onLoad(options = {}) {
			this.a = options.a || '';
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
