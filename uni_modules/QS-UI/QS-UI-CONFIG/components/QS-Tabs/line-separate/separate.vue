<template>
	<view 
	class="tab-line" 
	:style="{
		top: getLineInfo.top,
		left: getLineInfo.left,
		height: getLineInfo.height,
		width: getLineInfo.width,
		backgroundColor: getLineInfo.backgroundColor
	}"></view>
</template>

<script>
	export default {
		props: {
			currentTabInfo: {
				type: Object,
				default: () => null
			},
			theme: {
				type: String,
			},
			lineColor: {
				type: String,
			}
		},
		computed: {
			getCurrentTabInfo() {
				return this.currentTabInfo || {height: 0, width: 0, left: 0, right: 0};
			},
			getLineInfo() {
				return {
					top: (this.getCurrentTabInfo.height * (0.1)) + 'px',
					left: (this.getCurrentTabInfo.left + (this.getCurrentTabInfo.width * (0.1))) + 'px',
					height: (this.getCurrentTabInfo.height * (0.8)) + 'px',
					width: (this.getCurrentTabInfo.width * (0.8)) + 'px',
					backgroundColor: this.lineColor
				}
			}
		}
	}
</script>

<style scoped>
	.tab-line {
		position: absolute;
		border-radius: 5px;
		transition-property: left;
		transition-duration: .3s;
	}
</style>
