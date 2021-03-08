<template>
	<view class="QS page">
		<view class="padding-rpx_25">
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text large-xx weight">演示示例</text>
				</view>
				<QS-P height="80rpx"></QS-P>
				<view class="flex_row_c_c" style="height: 50px;">
					<QS-Button>按钮</QS-Button>
				</view>
				<QS-P height="80rpx"></QS-P>
				<titleLeftLine title="字体颜色"></titleLeftLine>
				<QS-Tabs mode="scroll" height="66rpx" :tabs="colors" :tabIndex="colorTabIndex" width="700rpx" @click="colorTabIndex = $event"></QS-Tabs>
				<QS-P></QS-P>
				<titleLeftLine title="背景颜色"></titleLeftLine>
				<QS-Tabs mode="scroll" height="66rpx" :tabs="bgColors" :tabIndex="bgColorTabIndex" width="700rpx" @click="bgColorTabIndex = $event"></QS-Tabs>
				<QS-P></QS-P>
				<titleLeftLine title="大小"></titleLeftLine>
				<QS-Tabs mode="scroll" height="66rpx" :tabs="sizes" :tabIndex="sizeTabIndex" width="700rpx" @click="sizeTabIndex = $event"></QS-Tabs>
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
				prop: [
					{ name: 'waves', value: true, des: '是否开启波纹效果' },
					{ name: 'wavesColor', value: '', des: '波纹颜色' },
					{ name: 'borderRadius', value: '10rpx', des: '圆角值' },
					{ name: 'height', value: '', des: '高度' },
					{ name: 'width', value: '', des: '宽度' },
					{ name: 'backgroundColor', value: '', des: '背景颜色' },
					{ name: 'txt', value: '', des: '按钮文字' },
					{ name: 'type', value: 'default', des: '按钮类型' },
					{ name: 'size', value: 'default', des: '按钮大小' },
					{ name: 'fontSize', value: '', des: '字体大小' },
					{ name: 'disabled', value: false, des: '是否禁用' },
					{ name: 'loading', value: false, des: '是否开启loading动画' },
					{ name: 'plain', value: false, des: '是否镂空' },
					{ name: 'openType', value: '', des: '开放能力' },
					{ name: 'hoverStartTime', value: 20, des: 'hover效果延时时间' },
					{ name: 'hoverStayTime', value: 70, des: 'hover效果延时时间' },
					{ name: 'hoverClass', value: 'button-hover', des: 'hover效果延时时间' },
					{ name: 'preIconType', value: '', des: '前置图标' },
					{ name: 'preIconColor', value: '#ffffff', des: '前置图标颜色' },
					{ name: 'preIconSize', value: '30rpx', des: '前置图标大小' },
					{ name: 'setTimeoutClick', value: false, des: '是否波纹动画后触发点击事件' },
					{ name: 'padding', value: '', des: 'css padding值' },
					{ name: 'background', value: '', des: 'css background值' },
					{ name: 'border', value: '', des: 'css border值' },
					{ name: 'iconAnimationType', value: '', des: '图标动画类型' },
					{ name: 'color', value: '', des: '按钮文字颜色' },
					{ name: 'fontWeight', value: '', des: '按钮文字字重' },
				],
				
				colors: [ {name: '#ffffff'}, {name: '#000000'} ],
				colorTabIndex: 0,
				
				bgColors: [ {name: '#f1505c'}, {name: '#000000'}, {name: '#2498c2'}, {name: '#ffff7f'} ],
				bgColorTabIndex: 0,
				
				sizes: [ {name: 22}, {name: 30}, {name: 36} ],
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
