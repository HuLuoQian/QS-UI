<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">演示示例</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_808080">template模板中使用</text>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="navigateTo('js.testRouterOpen')">直接跳转</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="navigateTo('js.testRouterOpen', { a: 1 })">携带参数</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="navigateTo('js.testRouterLogin')">校验登录</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_808080">js中使用</text>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="go('js.testRouterOpen')">直接跳转</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="go('js.testRouterOpen', { a: 1 })">携带参数</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="go('js.testRouterLogin')">校验登录</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_808080">关闭页面</text>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="back">关闭页面</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button setTimeoutClick @click="back(2)">关闭2个页面，reLaunch至首页</QS-Button>
			</view>
			<QS-P height="25rpx"></QS-P>
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">详细说明</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_666666 weight">uni.$qs.navigateTo 参数说明(默认值):</text>
				<QS-P height="25rpx"></QS-P>
				<showProps :prop="prop" merge></showProps>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_666666 weight">uni.$qs.navigateBack 参数说明(默认值):</text>
				<QS-P height="25rpx"></QS-P>
				<showProps :prop="navigateBackProp" :wrap="['(',')']"></showProps>
				<QS-P height="50rpx"></QS-P>
				<text class="QS-text large color_666666 weight">template模板中使用说明</text>
				<QS-P height="25rpx"></QS-P>
				<view class="flex_row">
					<QS-P width="25rpx">·</QS-P>
					<text class="QS-text color_808080 flex-wrap_wrap">template模板中使用的navigateTo方法是Vue.mixins所继承的一个方法,
						可以在QS-UI-CONFIG/config/index.js-->mixins.useNavigateTo 来决定是否开启</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<view class="flex_row">
					<QS-P width="25rpx">·</QS-P>
					<text class="QS-text color_808080 flex-wrap_wrap">并可以在QS-UI-CONFIG/config/values.js-->mixinsName.navigateTo 修改方法名称</text>
				</view>
			</view>
		</view>
		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prop: [
					{
						name: 'url',
						value: '',
						des: `路由的地址，推荐写config中的Pages.js中点链式字符串, 路由配置文件在QS-UI-CONFIG/config/Pages.js, 例如示例项目中的 js.testRouterOpen, 这样写可以在路由拦截时读取配置文件中的属性，比如login, 也可以 直接写 /pages/xxx/xxx`
					},
					{
						name: 'data',
						value: {},
						des: `路由携带数据`
					},
					{
						name: 'animationType',
						value: '',
						des: `动画类型, 支持度见uni路由文档`
					},
					{
						name: 'debounce',
						value: false,
						des: `是否开启防抖，若传true则在相隔400毫秒内调用不成功(数值在QS-UI-CONFIG/config/QSDebounceKeys.js中配置)`
					},
					{
						name: 'success',
						value: undefined,
						des: `成功回调`
					},
					{
						name: 'fail',
						value: undefined,
						des: `失败回调`
					},
					{
						name: 'complete',
						value: undefined,
						des: `完成回调`
					},
					{
						name: 'type',
						value: 'navigateTo',
						des: `跳转类型, 有 navigateTo(直接跳转, 简写: ngt)、redirectTo(关闭当前页面跳转, 简写: rdt)、reLaunch(关闭所有页面，打开到应用内的某个页面，简写: rl)`
					},
				],
				navigateBackProp: [
					{
						name: 'delta',
						value: 1,
						des: '需关闭的页面数量'
					},
					{
						name: 'finalToLaunch',
						value: true,
						des: '当关闭的页面数量大于或等于现有页面数量时, 是否直接reLaunch至QS-UI-CONFIG/config/index.js-->launchPath 中所配置的页面路径'
					}
				]
			}
		},
		methods: {
			go(target, data) {
				uni.$qs.navigateTo(target, data);
			},
			back(delta) {
				uni.$qs.navigateBack(delta);
			}
		}
	}
</script>

<style>

</style>
