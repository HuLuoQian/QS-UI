<template>
	<swiper :class="getClass" :style="getStyle" :indicatorDots="getIndicatorDots" :indicatorColor="indicatorColor"
	 :indicatorActiveColor="indicatorActiveColor" :activeClass="activeClass" :changingClass="changingClass" :autoplay="getAutoplay"
	 :current="getCurrent" :currentItemId="currentItemId" :interval="getInterval" :duration="getDuration" :circular="getCircular"
	 :vertical="getVertical" :previousMargin="previousMargin" :nextMargin="nextMargin" :acceleration="getAcceleration"
	 :disableProgrammaticAnimation="getDisableProgrammaticAnimation" :displayMultipleItems="getDisplayMultipleItems"
	 :skipHiddenItemLayout="getSkipHiddenItemLayout" :disableTouch="getDisableTouch" :touchable="getTouchable"
	 :easingFunction="easingFunction">
		<swiper-item class="flex_column" :class="swiperItemClass" :style="getSwiperItemStyle" v-for="(item, index) in items"
		 :key="index">
			<image class="image" :style="getImageStyle" :src="item.path || item" mode="aspectFill"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import swiperPropsMixin from '../../mixins/swiperPropsMixin.js';
	const QSComponentMixinRes = QSComponentMixin();
	const swiperPropsMixinRes = swiperPropsMixin();
	export default {
		mixins: [QSComponentMixinRes.mixin, swiperPropsMixinRes.mixin],
		props: {
			items: {
				type: Array,
				default: () => []
			},
			swiperItemClass: {
				type: [String, Array, Object],
				default: ''
			},
			swiperItemStyle: {
				type: [String, Array, Object],
				default: ''
			},
			imageStyle: {
				type: [Array, Object, String],
				default: () => {}
			},
			defHeight: {
				type: [String, Number],
				default: 200
			},
			// #ifdef MP-ALIPAY
			...swiperPropsMixinRes.props,
			...QSComponentMixinRes.props,
			// #endif
		},
		data() {
			return {
				height: this.defHeight
			}
		},
		computed: {
			getSwiperItemStyle() {
				return this.swiperItemStyle;
			},
			getImageStyle() {
				return this.imageStyle;
			},
			QS_nCompClass() {
				return 'QS-CountHeightSwiper';
			},
			QS_nCompStyle() {
				return {
					height: this.height + 'px'
				}
			}
		},
		watch: {
			items(n) {
				this.countHeight(n);
			}
		},
		mounted() {
			this.countHeight();
		},
		methods: {
			countHeight(n) {
				const items = n || this.items;
				if(!items.length) return;
				this.$nextTick(() => {
					if (!items || !items[0]) return;
					let view;
					// #ifdef MP-ALIPAY
					view = uni.createSelectorQuery();
					// #endif
					// #ifndef MP-ALIPAY
					view = uni.createSelectorQuery().in(this);
					// #endif
					view.select('.image').fields({
						size: true
					});
					view.exec(data => {
						console.log('QS-CountHeightSwiper : 获取布局信息成功', data)
						const compWidth = data[0].width;
						uni.getImageInfo({
							src: items[0].path || items[0],
							success: (res) => {
								console.log('QS-CountHeightSwiper : 获取图片信息成功', res);
								this.height = compWidth / res.width * res.height;
							},
							fail: (err) => {
								console.log('QS-CountHeightSwiper : 获取图片信息失败', err);
							}
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.QS-CountHeightSwiper {
		.image {
			/* #ifndef APP-NVUE */
			width: 100%;
			height: 100%;
			/* #endif */
			/* #ifdef APP-NVUE */
			flex: 1
				/* #endif */
		}
	}
</style>
