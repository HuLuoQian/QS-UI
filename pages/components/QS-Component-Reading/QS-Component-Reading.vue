<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text weight large">QS组件须知</text>
				</view>
				<QS-P height="25px"></QS-P>
				<text class="QS-text flex-wrap_wrap">· 若是uni-modules模式, 组件的使用不需要在page.json的easycom中配置, 页面上可直接写标签, 若不是则需要配置</text>
				<QS-P></QS-P>
				<text class="QS-text flex-wrap_wrap">· 所有的组件都支持compClass与compSylte属性, 用于控制组件内部的样式, compClass为组件内部特定位置添加class类名, compStyle为组件内部特定位置添加内联样式, 这两个属性都是Object类型，并且都包含container属性, container的意思是组件的最外层view, 其余属性则不同组件有不同的特定值, 目前还未完善的整理</text>
				<QS-P></QS-P>
				<text class="QS-text flex-wrap_wrap">· 所有的组件都支持fontSize属性, 用于控制该组件的文字大小, 默认在QS-UI-CONFIG/index.js->baseFontSize 设置默认的字体大小, 在特殊情况下可以传fontSize属性控制</text>
				<QS-P></QS-P>
				<text class="QS-text flex-wrap_wrap">· 所有组件都在QS-UI-CONFIG/components下有单独的配置文件, 目前常用的是 xxx组件/js/props.js 配置组件的公共props值, 会覆盖默认的props值</text>
				<QS-P></QS-P>
				<text class="QS-text flex-wrap_wrap">· 所有的组件都支持pageContext模式, 但是不是所有的组件都有必要, 目前例如QS-BackTop组件有必要, 你只要在页面中放置QS-BackTop标签即可, 不用设置ref属性, 但是目前只支持一个, 多个中只有一个有效</text>
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
		methods: {
			
		}
	}
</script>

<style>

</style>
