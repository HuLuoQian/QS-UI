<template>
	<view class="QS">
		<QS-BackTop></QS-BackTop>
		<view class="padding-rpx_25">
			<QS-Sticky>
				<view class="bgColor_ffffff border-radius-rpx_10 padding-rpx_25">
					<view class="flex_column_c_c">
						<text class="QS-text large weight">演示示例</text>
					</view>
					<QS-P height="40rpx"></QS-P>
					<QS-Tabs ref="tabs" :tabs="tabs" :theme="themes[themeTabIndex].value" width="650rpx"
						:tabIndex="tabIndex" @click="tabIndex = $event">
					</QS-Tabs>
				</view>
			</QS-Sticky>
			<QS-P></QS-P>
			<view class="bgColor_ffffff border-radius-rpx_10 padding-rpx_25">
				<titleLeftLine title="主题颜色"></titleLeftLine>
				<QS-Tabs :tabs="themes" :tabIndex="themeTabIndex" width="650rpx"
					@click="themeTabIndex = $event"></QS-Tabs>
				<QS-P></QS-P>
			</view>
			<QS-P></QS-P>
			<view class="bgColor_ffffff border-radius-rpx_10 padding-rpx_25">
				<view class="flex_row_c_c">
					<text class="QS-text large weight">说明</text>
				</view>
				<QS-P></QS-P>
				<showProps :prop="prop"></showProps>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		mixins: [uni.$qs.mixin(true)],
		data() {
			return {
				tabIndex: 0,
				tabs: [{
						name: 'Tab 1'
					},
					{
						name: 'Tab 2'
					},
					{
						name: 'Tab 3'
					},
					{
						name: 'Tab 4'
					},
				],

				themeTabIndex: 0,
				themes: [{
					name: '默认',
					value: 'default'
				}, {
					name: '主色',
					value: 'primary'
				}, {
					name: '成功',
					value: 'success'
				}, {
					name: '警告',
					value: 'warning'
				}, {
					name: '危险',
					value: 'danger'
				}],
				
				prop: [
					{ name: 'width', value: '750rpx', des: 'tabs宽度' },
					{ name: 'height', value: '88rpx', des: 'tabs高度' },
					{ name: 'tabs', value: [], des: '需展示的tabs数组' },
					{ name: 'space', value: '50rpx', des: 'tab间隔' },
					{ name: 'autoScrollInto', value: true, des: '切换tab时自动使用scrollview的scroll-into-view移动至当前tab项' },
					{ name: 'activeFontSize', value: '30rpx', des: '当前项字体大小' },
					{ name: 'defFontSize', value: '30rpx', des: '默认字体大小' },
					{ name: 'activeFontBold', value: true, des: '当前项字体加粗' },
					{ name: 'activeColor', value: '', des: '当前项字体颜色，默认跟随theme主题色' },
					{ name: 'defColor', value: '#999999', des: '默认字体颜色' },
					{ name: 'tabIndex', value: 0, des: '当前项index' },
					{ name: 'props', value: {nameField: 'name'}, des: '配置项, {nameField: "展示文字的字段"}' },
					{ name: 'type', value: '', des: '模板分流type标识' },
					{ name: 'backgroundColor', value: '', des: '背景颜色' },
					{ name: 'mode', value: 'auto', des: 'tabs布局类型, 值有 auto、center、scroll 三种, center为居中、scroll为从左往右可滑动，auto则在tabs内容超过组件时从center自动切换为scroll' },
					{ name: 'hasLine', value: true, des: '是否启用tab线条' },
					{ name: 'lineType', value: '', des: 'tab线条模板分流标识' },
					{ name: 'lineUseSlot', value: false, des: 'tab线条是否使用slot内容, 若为false则为模板分流组件内容' },
					{ name: 'lineColor', value: '', des: 'tab线条颜色, 默认为theme主题色' },
					{ name: 'theme', value: 'default', des: '主题' },
					{ name: 'itemFull', value: true, des: '若为true则在每个tab的style都会加上flex: 1' },
				],
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.tab-line {
		position: absolute;
		border-radius: 10rpx;
		transition: left .3s;
	}
</style>
