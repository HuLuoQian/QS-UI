<template>
	<view class="QS-Backtop" :class="getClass" :style="getStyle" @tap="active">
		<image v-if="type==='image'" class="backtop-container" :src="image" mode="aspectFill"></image>
		<view class="backtop-container" v-else-if="type==='text'">
			<text>{{text}}</text>
		</view>
		<slot v-else-if="type==='slot'"></slot>
	</view>
</template>

<script>
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-BackTop/js/props.js';
	import getH5TabbarHeight from '../../js/functions/getH5TabbarHeight.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-BackTop', setContext: true });
	const defHeight = rpxUnit2px('80rpx');
	var _this;
	export default {
		mixins: [QSComponentMixinRes.mixin],
		// name: 'QS-Backtop',
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			type: {
				type: String,
				default: 'image'
			},
			image: {
				type: String,
				default: ''
			},
			text: {
				type: String,
				default: ''
			},
			right: {
				type: String,
				default: '30rpx'
			},
			bottom: {
				type: String,
				default: '30rpx'
			},
			duration: {
				type: [String, Number],
				default: '.3s'
			},
			zIndex: {
				type: [String, Number],
				default: 990
			},
			backTopType: {
				type: String,
				default: 'page'
			},
			tabbar: {
				type: [String, Boolean],
				default: false
			},
			offsetBottom: {
				type: [String, Number],
				default: 0
			},
			...props
		},
		data() {
			return {
				showBl: false,
				tabbarHeight: 0
			}
		},
		created() {
			_this = this;
		},
		computed: {
			isTabbar() {
				return String(this.tabbar) === 'true';
			},
			QS_nCompStyle() {
				const style =  {
					right: this.right,
					bottom: this.getBottom,
					transitionDuration: this.duration,
					zIndex: this.zIndex
				};
				return style;
			},
			getBottom() {
				const pxValue = rpxUnit2px(this.bottom);
				let value = 0;
				if (this.showBl) {
					if (this.type === 'image' || this.type === 'text') {
						value = pxValue;
					}

					// #ifdef H5
					if (this.isTabbar) value += this.tabbarHeight;
					// #endif
					
					value += rpxUnit2px(this.offsetBottom);
				} else {
					if (this.type === 'image' || this.type === 'text') {
						value = 0 - pxValue - defHeight;
					}

					// #ifdef H5
					if (this.isTabbar) value -= this.tabbarHeight;
					// #endif
					value -= rpxUnit2px(this.offsetBottom);
				}
				return value + 'px';
			}
		},
		methods: {
			
			setShow(bl) {
				if(_this.isTabbar) _this.tabbarHeight = getH5TabbarHeight();
				if (_this.showBl !== bl) _this.showBl = bl;
			},
			show() {
				_this.setShow(true);
			},
			hide() {
				_this.setShow(false);
			},
			active() {
				if (_this.backTopType === 'page') {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					})
				} else {
					_this.$emit('backTop');
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	/* #ifndef APP-NVUE */
	.QS-Backtop {
		display: flex;
		flex-direction: column;
		position: fixed;
		transition-property: bottom;

		.backtop-container {
			height: 80rpx;
			width: 80rpx;
			border-radius: 50%;
			// background-color: #ffffff;
			overflow: hidden;
		}
	}
	/* #endif */
	/* #ifdef APP-NVUE */
	.QS-Backtop {
		flex-direction: column;
		position: fixed;
		transition-property: bottom;

	}
	.backtop-container {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	/* #endif */
</style>
