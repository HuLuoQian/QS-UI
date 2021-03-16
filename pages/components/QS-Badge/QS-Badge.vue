<template>
	<view class="QS page">
		<view class="padding-rpx_25">
			<QS-Sticky>
				<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
					<view class="flex_row_c_c">
						<text class="QS-text large-xx weight">演示示例</text>
					</view>
					<QS-P height="80rpx"></QS-P>
					<view class="flex_row_c_c" style="height: 50px;">
						<QS-Badge 
						text="99+" 
						:color="colors[colorTabIndex].name"
						:backgroundColor="bgColors[bgColorTabIndex].name"
						:size="sizes[sizeTabIndex].name"
						@click="click"></QS-Badge>
					</view>
				</view>
			</QS-Sticky>
			<QS-P height="25rpx"></QS-P>
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<titleLeftLine title="字体颜色"></titleLeftLine>
				<QS-Tabs mode="scroll" :tabs="colors" :tabIndex="colorTabIndex" width="650rpx" @click="colorTabIndex = $event"></QS-Tabs>
				<QS-P></QS-P>
				<titleLeftLine title="背景颜色"></titleLeftLine>
				<QS-Tabs mode="scroll" :tabs="bgColors" :tabIndex="bgColorTabIndex" width="650rpx" @click="bgColorTabIndex = $event"></QS-Tabs>
				<QS-P></QS-P>
				<titleLeftLine title="大小"></titleLeftLine>
				<QS-Tabs mode="scroll" :tabs="sizes" :tabIndex="sizeTabIndex" width="650rpx" @click="sizeTabIndex = $event"></QS-Tabs>
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
					{ name: 'text', value: '', des: '文本内容' },
					{ name: 'position', value: 'static', des: 'css position属性' },
					{ name: 'top', value: '', des: 'css top属性' },
					{ name: 'bottom', value: '30rpx', des: 'css bottom属性' },
					{ name: 'left', value: '30rpx', des: 'css left属性' },
					{ name: 'right', value: '.3s', des: 'css right属性' },
					{ name: 'color', value: '#ffffff', des: '字体颜色' },
					{ name: 'backgroundColor', value: '#f1505c', des: '背景颜色' },
					{ name: 'size', value: 22, des: '整体大小' },
					{ name: 'cssUnit', value: 'rpx', des: 'css单位' },
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
