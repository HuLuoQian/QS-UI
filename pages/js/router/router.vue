<template>
	<view class="QS">
		<view class="padding_25rpx">
			<view class="padding_25rpx bgColor_ffffff border-radius_10rpx">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">演示示例</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_808080">template模板中使用</text>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="QS_navigateTo('js.testRouterOpen')">直接跳转</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="QS_navigateTo('js.testRouterOpen', { a: 1 })">携带参数</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="QS_navigateTo('js.testRouterLogin')">校验登录</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_808080">js中使用</text>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="go('js.testRouterOpen')">直接跳转</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="go('js.testRouterOpen', { a: 1 })">携带参数</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="go('js.testRouterLogin')">校验登录</QS-Button>
			</view>
		</view>
		<view class="padding_25rpx">
			<view class="padding_25rpx bgColor_ffffff border-radius_10rpx">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">详细说明</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_666666 weight">参数说明(默认值):</text>
				<QS-P height="25rpx"></QS-P>
				<showProps :prop="prop"></showProps>
				<QS-P height="50rpx"></QS-P>
				<text class="QS-text large color_666666 weight">template模板中使用说明</text>
				<QS-P height="25rpx"></QS-P>
				<view class="flex_row">
					<QS-P width="25rpx">·</QS-P>
					<text class="QS-text color_808080 flex-wrap_wrap">template模板中使用的QS_navigateTo方法是Vue.mixins所继承的一个方法, 可以在QS-UI-CONFIG/config/index.js-->mixins.useNavigateTo 来决定是否开启</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<view class="flex_row">
					<QS-P width="25rpx">·</QS-P>
					<text class="QS-text color_808080 flex-wrap_wrap">并可以在QS-UI-CONFIG/config/values.js-->mixinsName.navigateTo 修改方法名称</text>
				</view>
			</view>
		</view>
		<QS-BackTop ref="QSBackTop"></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prop: [
					{ name: 'url', default: '""' },
					{ name: 'data', default: '{}' },
					{ name: 'animationType', default: '""' },
					{ name: 'debounce', default: 'false' },
					{ name: 'success', default: 'undefined' },
					{ name: 'fail', default: 'undefined' },
					{ name: 'complete', default: 'undefined' },
					{ name: 'type', default: '"navigateTo"' },
				]
			}
		},
		methods: {
			go(target, data) {
				uni.$qs.navigateTo(target, data);
			}
		}
	}
</script>

<style>

</style>
