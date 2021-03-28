<template>
	<view class="tab-line" :style="{top: (currentTabInfo.height * 0.1) + 'px',
					left: (currentTabInfo.left + (currentTabInfo.width * 0.1)) + 'px',
					height: (currentTabInfo.height * 0.8) + 'px',
					width: (currentTabInfo.width * 0.8) + 'px',
					backgroundColor: lineColor
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
