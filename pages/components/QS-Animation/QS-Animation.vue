<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="flex_column_c_c">
				<text class="QS-text large weight">演示示例</text>
				<QS-P></QS-P>
				<text class="QS-text mini color_666666">请尝试点击按钮或点击图片</text>
			</view>
			<QS-P height="40rpx"></QS-P>
			<view class="flex_row_c_c">
				<QS-Animation ref="ani" :animationType="getAnimationType">
					<image src="/static/logo.png" mode="widthFix" style="width: 300rpx;"></image>
				</QS-Animation>
			</view>
			<QS-P height="40rpx"></QS-P>
			<QS-Button @click="startAni">js调用动画</QS-Button>
			<QS-P height="40rpx"></QS-P>
			<QS-Tabs mode="center" :tabs="tabs" space="50rpx" width="700rpx" :tabIndex="tabIndex" @click="tabIndex = $event"></QS-Tabs>
			<QS-P height="40rpx"></QS-P>
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
		data() {
			return {
				prop: [
					{ name: 'startAnimationType', value: 'tap', des: '触发动画时机, 目前有 tap-点击、create-组件挂载完毕 两个值, 若传多个 这么写："tap,create"' },
					{ name: 'animationType', value: 'jump', des: '动画类型, 值有: jump-跳跃、pendant-挂件、shook-摇晃、elasticity_Y-弹性Y' },
					{ name: 'animationFinishClick', value: true, des: '是否在动画完成后触发点击事件' },
					{ name: 'animationFinishClickDurationScale', value: .75, des: 'subsection为true时，触发点击事件时间为动画总时长乘以该系数' },
					{ name: 'animationFinishClickMoveThreshold', value: 0, des: 'subsection为true时，手指点击后离开时-距离点击时的距离若在该阈值内则触发点击事件' },
					{ name: 'subsection', value: true, des: '分段式动画(手指点击时与离开后)' },
					{ name: 'disabled', value: false, des: '是否禁止emit点击事件' },
				],
				tabIndex: 0,
				tabs: [
					{ name: '跳跃', value: 'jump' },
					{ name: '挂件', value: 'pendant' },
					{ name: '摇晃', value: 'shook' },
					{ name: '弹性Y', value: 'elasticity_Y' },
				]
			}
		},
		computed: {
			getAnimationType() {
				return this.tabs[this.tabIndex].value;
			}
		},
		methods: {
			startAni() {
				this.$refs.ani.startAnimation();
			}
		}
	}
</script>

<style>

</style>
