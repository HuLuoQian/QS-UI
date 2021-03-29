<template>
	<view class="QS container" :id="id">
		<view id="logo" class="logo" style="height: 200px;"></view>
		<view class="bg" :style="{ opacity: bgOpacity, height: bgHeight }"></view>
		<image class="QS-LOGO" src="/static/QS-LOGO.jpg" mode="aspectFill" :style="{
			height: imageObj.height + 'px',
			width: imageObj.width + 'px',
			top: imageObj.top + 'px',
			left: imageObj.left + 'px',
		}"></image>
		<!-- #ifndef APP-NVUE -->
		<text class="text-des" :style="{
			top: textObj.top + 'px',
			left: textObj.left + 'px',
		}">{{$qst('qs-des')}}</text>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<text class="text-des" :style="{
			top: textObj.top + 'px',
			left: textObj.left + 'px',
		}">{{'qs-des' | qst}}</text>
		<!-- #endif -->
	</view>
</template>

<script>
	const Sys = uni.$qs.getSys();
	const halfWidth = Sys.windowWidth / 2;
	const padding = uni.upx2px(25);
	const textWidth = 220;
	const targetImageObj = {
		height: 35,
		width: 35,
		top: padding,
		left: padding
	}
	const targetTextObj = {
		top: padding + targetImageObj.height / 2 - 14 / 2 - 2,
		left: padding + 35 + 5
	}
	const originImageObj = {
		height: 128,
		width: 128,
		top: 21,
		left: halfWidth - 128 / 2
	}
	const originTextObj = {
		top: 21 + 128 + 10,
		left: halfWidth - textWidth / 2
	}
	// #ifdef H5
	targetImageObj.top += 44;
	targetTextObj.top += 44;
	originImageObj.top += 44;
	originTextObj.top += 44;
	// #endif
	var _this;
	export default {
		// #ifdef APP-NVUE
		mixins: [uni.$qs.mixin(true)],
		// #endif
		data() {
			return {
				id: `q_${uni.$qs.uuid()}`,
				imageObj: {
					...originImageObj
				},
				textObj: {
					...originTextObj
				},
				bgOpacity: 0,
				bgHeight: (35 + uni.upx2px(50)) + 'px'
			}
		},
		created() {
			_this = this;
		},
		// #ifndef APP-NVUE
		beforeDestroy() {
			uni.$qs.obsDisconnect(this.obs);
		},
		// #endif
		async mounted() {
			// #ifndef MP-BAIDU
			await new Promise(rs => this.$nextTick(() => {
				setTimeout(() => {
					rs()
				}, 0)
			}));
			// #endif
			this.obs = uni.$qs.intersectionObserver({
				vm: this,
				nodes: '#logo',
				options: {
					thresholds: Array(1001).fill('').map((ite, index) => (index / 1000))
				},
				viewportHeight: Sys.windowHeight
			}, (res) => {
				const size = targetImageObj.height + (originImageObj.height - targetImageObj.height) * res.intersectionRatio;
				const imgdiffw = (halfWidth - size / 2);
				this.imageObj.height = size;
				this.imageObj.width = size;
				this.imageObj.top  = targetImageObj.top   + (originImageObj.top  - targetImageObj.top)  * res.intersectionRatio;
				this.imageObj.left = targetImageObj.left  + (originImageObj.left - targetImageObj.left) * res.intersectionRatio;
				this.textObj.top   = targetTextObj.top    + (originTextObj.top   - targetTextObj.top)   * res.intersectionRatio;
				this.textObj.left  = targetTextObj.left   + (originTextObj.left  - targetTextObj.left)  * res.intersectionRatio;
				this.bgOpacity = 1 - res.intersectionRatio;
			})
		}
	}
</script>

<style scoped>
	.QS-LOGO {
		border-radius: 500px;
		position: fixed;
	}

	.text-des {
		/* transform: translateX(-50%); */
		position: fixed;
		flex-wrap: wrap;
		width: 220px;
		/* height: 100rpx; */
		/* #ifndef APP-NVUE */
		word-break: keep-all;
		/* #endif */
		text-align: center;
		font-size: 14px;
		font-weight: bold;
	}

	.container {
		position: relative;
	}

	.bg {
		width: 750rpx;
		background-color: #EEEEEE;
		position: fixed;
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		left: 0;
	}
</style>
