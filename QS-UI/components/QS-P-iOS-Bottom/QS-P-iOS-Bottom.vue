<template>
	<view :style="{
		height: getHeight,
		width: width
	}">
	</view>
</template>

<script>
	export default {
		props: {
			height: {
				type: [String, Number],
				default: '30px'
			},
			width: {
				type: [String, Number],
				default: '1px'
			}
		},
		data() {
			return {
				nheight: '',
				isiOS: uni.getSystemInfoSync().platform === 'ios'
			}
		},
		computed: {
			getHeight() {
				return this.isiOS ? this.height : '';
			}
		}
	}
</script>
