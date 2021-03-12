<template>
	<view
	class="tab-line" 
	:style="{ 
		top: currentTabInfo.height * .1 + 'px',
		left: (currentTabInfo.left + (currentTabInfo.width * .1)) + 'px',
		height: currentTabInfo.height * .8 + 'px',
		width: currentTabInfo.width * .8 + 'px',
		backgroundColor: getLineColor
	}">
	</view>
</template>

<script>
	import theme from '../../../css/theme.scss';
	export default {
		props: {
			currentTabInfo: {
				type: Object,
				default: ()=>({})
			},
			theme: {
				type: String,
				default: 'primary'
			},
			lineColor: {
				type: String,
				default: ''
			}
		},
		computed: {
			getLineColor() {
				return this.lineColor || theme[this.theme];
			}
		}
	}
</script>

<style scoped lang="scss">
	.tab-line{
		position: absolute;
		border-radius: 10rpx;
		transition: left .3s;
	}
</style>
