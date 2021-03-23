<template>
	<view class="QS page">
		<view class="padding-rpx_25">
			<QS-Sticky>
				<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
					<view class="flex_row_c_c">
						<text class="QS-text large-xx weight">演示示例</text>
					</view>
					<QS-P height="80rpx"></QS-P>
					<view :class="sizes[sizeTabIndex].value=='mini'?'flex_row_c_c':''">
						<QS-Button 
						:size="sizes[sizeTabIndex].value"
						:theme="types[typeTabIndex].value"
						:disabled="disabledArr[disabledTabIndex].value"
						:loading="loadingdArr[loadingTabIndex].value"
						:plain="plainArr[plainTabIndex].value"
						@click="click">按钮</QS-Button>
					</view>
				</view>
			</QS-Sticky>
			<QS-P></QS-P>
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<QS-P height="80rpx"></QS-P>
				<titleLeftLine title="主题颜色"></titleLeftLine>
				<QS-Tabs mode="scroll" :tabs="types" :tabIndex="typeTabIndex" width="650rpx"
					@click="typeTabIndex = $event"></QS-Tabs>
				<QS-P></QS-P>
				<titleLeftLine title="是否禁用"></titleLeftLine>
				<QS-Tabs mode="scroll" :tabs="disabledArr" :tabIndex="disabledTabIndex" width="650rpx"
					@click="disabledTabIndex = $event"></QS-Tabs>
				<QS-P></QS-P>
				<titleLeftLine title="是否启用loading"></titleLeftLine>
				<QS-Tabs mode="scroll" :tabs="loadingdArr" :tabIndex="loadingTabIndex" width="650rpx"
					@click="loadingTabIndex = $event"></QS-Tabs>
				<QS-P></QS-P>
				<titleLeftLine title="是否镂空"></titleLeftLine>
				<QS-Tabs mode="scroll" :tabs="plainArr" :tabIndex="plainTabIndex" width="650rpx"
					@click="plainTabIndex = $event"></QS-Tabs>
				<QS-P></QS-P>
				<titleLeftLine title="大小"></titleLeftLine>
				<QS-Tabs mode="scroll" :tabs="sizes" :tabIndex="sizeTabIndex" width="650rpx"
					@click="sizeTabIndex = $event"></QS-Tabs>
			</view>
			<QS-P></QS-P>
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text large-xx weight">说明</text>
				</view>
				<QS-P></QS-P>
				<showProps :prop="prop"></showProps>
			</view>
		</view>

		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prop: [{
						name: 'waves',
						value: true,
						des: '是否开启波纹效果'
					},
					{
						name: 'wavesColor',
						value: '',
						des: '波纹颜色'
					},
					{
						name: 'borderRadius',
						value: '10rpx',
						des: '圆角值'
					},
					{
						name: 'height',
						value: '',
						des: '高度'
					},
					{
						name: 'width',
						value: '',
						des: '宽度'
					},
					{
						name: 'backgroundColor',
						value: '',
						des: '背景颜色'
					},
					{
						name: 'txt',
						value: '',
						des: '按钮文字'
					},
					{
						name: 'type',
						value: 'default',
						des: '按钮类型'
					},
					{
						name: 'size',
						value: 'default',
						des: '按钮大小'
					},
					{
						name: 'disabled',
						value: false,
						des: '是否禁用'
					},
					{
						name: 'loading',
						value: false,
						des: '是否开启loading动画'
					},
					{
						name: 'plain',
						value: false,
						des: '是否镂空'
					},
					{
						name: 'openType',
						value: '',
						des: '开放能力'
					},
					{
						name: 'hoverStartTime',
						value: 20,
						des: 'hover效果延时时间'
					},
					{
						name: 'hoverStayTime',
						value: 70,
						des: 'hover效果延时时间'
					},
					{
						name: 'hoverClass',
						value: 'button-hover',
						des: 'hover效果延时时间'
					},
					{
						name: 'preIconType',
						value: '',
						des: '前置图标'
					},
					{
						name: 'preIconColor',
						value: '#ffffff',
						des: '前置图标颜色'
					},
					{
						name: 'preIconSize',
						value: '30rpx',
						des: '前置图标大小'
					},
					{
						name: 'setTimeoutClick',
						value: false,
						des: '是否波纹动画后触发点击事件'
					},
					{
						name: 'padding',
						value: '',
						des: 'css padding值'
					},
					{
						name: 'background',
						value: '',
						des: 'css background值'
					},
					{
						name: 'border',
						value: '',
						des: 'css border值'
					},
					{
						name: 'iconAnimationType',
						value: '',
						des: '图标动画类型'
					},
					{
						name: 'color',
						value: '',
						des: '按钮文字颜色'
					},
					{
						name: 'fontWeight',
						value: '',
						des: '按钮文字字重'
					},
				],

				types: [{
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
				typeTabIndex: 0,
				
				disabledArr: [{
					name: '不禁用',
					value: false
				}, {
					name: '禁用',
					value: true
				}],
				disabledTabIndex: 0,
				
				plainArr: [{
					name: '不镂空',
					value: false
				}, {
					name: '镂空',
					value: true
				}],
				plainTabIndex: 0,
				
				loadingdArr: [{
					name: '不启用loading',
					value: false
				}, {
					name: '启用loading',
					value: true
				}],
				loadingTabIndex: 0,
				
				sizes: [{
					name: '默认',
					value: 'default'
				}, {
					name: '大',
					value: 'large'
				}, {
					name: '小',
					value: 'mini'
				}],
				sizeTabIndex: 0
			}
		},
		methods: {
			click() {
				uni.$qs.toast('点击了')
			}
		}
	}
</script>

<style>

</style>
