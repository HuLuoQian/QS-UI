<template>
	<view class="QS-FixedBottom" :class="getClass" :style="getStyle">
		<slot></slot>
	</view>
</template>

<script>
	import getH5TabbarHeight from '../../js/functions/getH5TabbarHeight.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-BackTop/js/props.js';
	const QSComponentMixinRes = QSComponentMixin();
	const Sys = uni.getSystemInfoSync();
	export default {
		mixins: [QSComponentMixinRes.mixin],
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			paddingTop: {
				type: String,
				default: '20rpx'
			},
			paddingBottom: {
				type: String,
				default: '20rpx'
			},
			bottom: {
				type: String,
				default: '20px'
			},
			iosBottom: {
				type: String,
				default: '40px'
			},
			tabbar: {
				type: [String, Boolean],
				default: false
			}
		},
		computed: {
			getTabbar () {
				return String(this.tabbar) === 'true';
			},
			getBottom() {
				// #ifdef H5
				if(this.getTabbar) return getH5TabbarHeight() + 'px';
				// #endif
				// #ifndef H5
				if(this.getTabbar) return this.bottom;
				if(Sys.platform.toLowerCase() === 'ios') return this.iosBottom;
				// #endif
				return this.bottom;
			},
			QS_nCompStyle() {
				return { bottom: this.getBottom };
			}
		}
	}
</script>

<style lang="scss" scoped>
	.QS-FixedBottom {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
