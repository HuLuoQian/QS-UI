<template>
	<view class="tab-line" :style="{
					top: currentTabInfo.height * .1 + 'px',
					left: (currentTabInfo.left + (currentTabInfo.width * .1)) + 'px',
					height: currentTabInfo.height * .8 + 'px',
					width: currentTabInfo.width * .8 + 'px',
					backgroundColor: lineColor
				}">
	</view>
</template>

<script>
	export default {
		props: {
			currentTabInfo: {
				type: Object,
				default: () => ({})
			},
			theme: {
				type: String,
			},
			lineColor: {
				type: String,
			}
		},
	}
</script>

<style scoped>
	.tab-line {
		position: absolute;
		border-radius: 10rpx;
		transition-property: left;
		transition-duration: .3s;
	}
</style>
