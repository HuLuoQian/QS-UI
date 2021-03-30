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
				default: () => ({})
			},
			theme: {
				type: String,
			},
			lineColor: {
				type: String,
			}
		},
		computed: {
			getLineInfo() {
				return {
					top: (this.currentTabInfo.height * (0.1)) + 'px',
					left: (this.currentTabInfo.left + (this.currentTabInfo.width * (0.1))) + 'px',
					height: (this.currentTabInfo.height * (0.8)) + 'px',
					width: (this.currentTabInfo.width * (0.8)) + 'px',
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
