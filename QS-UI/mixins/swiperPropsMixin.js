module.exports = function() {
	const props = {
			indicatorDots: {
				type: [String, Boolean],
				default: false
			},
			indicatorColor: {
				type: String,
				default: 'rgba(0, 0, 0, .3)'
			},
			indicatorActiveColor: {
				type: String,
				default: '#000000'
			},
			activeClass: {
				type: String,
				default: ''
			},
			changingClass: {
				type: String,
				default: ''
			},
			autoplay: {
				type: [String, Boolean],
				default: false
			},
			current: {
				type: [String, Number],
				default: 0
			},
			currentItemId: {
				type: String,
				default: ''
			},
			interval: {
				type: [String, Number],
				default: 5000
			},
			duration: {
				type: [String, Number],
				default: 500
			},
			circular: {
				type: [String, Boolean],
				default: false
			},
			vertical: {
				type: [String, Boolean],
				default: false
			},
			previousMargin: {
				type: String,
				default: '0px'
			},
			nextMargin: {
				type: String,
				default: '0px'
			},
			acceleration: {
				type: [String, Boolean],
				default: false
			},
			disableProgrammaticAnimation: {
				type: [String, Boolean],
				default: false
			},
			displayMultipleItems: {
				type: [String, Number],
				default: 1
			},
			skipHiddenItemLayout: {
				type: [String, Boolean],
				default: false
			},
			disableTouch: {
				type: [String, Boolean],
				default: false
			},
			touchable: {
				type: [String, Boolean],
				default: true
			},
			easingFunction: {
				type: String,
				default: 'default'
			}
		}
	return {
		props: props,
		mixin: {
			// #ifndef MP-ALIPAY
			props: props,
			// #endif
			computed: {
				getIndicatorDots() {
					return String(this.indicatorDots) === 'true';
				},
				getAutoplay() {
					return String(this.autoplay) === 'true';
				},
				getCurrent() {
					return Number(this.current);
				},
				getInterval() {
					return Number(this.interval);
				},
				getDuration() {
					return Number(this.duration);
				},
				getCircular() {
					return String(this.circular) === 'true';
				},
				getVertical() {
					return String(this.vertical) === 'true';
				},
				getAcceleration() {
					return String(this.acceleration) === 'true';
				},
				getDisableProgrammaticAnimation() {
					return String(this.disableProgrammaticAnimation) === 'true';
				},
				getDisplayMultipleItems() {
					return Number(this.displayMultipleItems);
				},
				getSkipHiddenItemLayout() {
					return String(this.skipHiddenItemLayout) === 'true';
				},
				getDisableTouch() {
					return String(this.disableTouch) === 'true';
				},
				getTouchable() {
					return String(this.touchable) === 'true';
				}
			}
		}
	}
}
