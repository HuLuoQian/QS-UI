<template>
	<text class="QS-Badge" v-if="text" :class="getClass" :style="getStyle" @tap="click">{{ text }}</text>
</template>

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Badge/js/props.js';
	const QSComponentMixinRes = QSComponentMixin();
	export default {
		mixins: [QSComponentMixinRes.mixin],
		name: 'QS-Badge',
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			text: {
				type: [String, Number],
				default: ''
			},
			position: {
				type: String,
				default: 'static'
			},
			top: {
				type: [String, Number],
				default: ''
			},
			bottom: {
				type: [String, Number],
				default: ''
			},
			left: {
				type: [String, Number],
				default: ''
			},
			right: {
				type: [String, Number],
				default: ''
			},
			color: {
				type: String,
				default: '#ffffff'
			},
			backgroundColor: {
				type: String,
				default: '#f1505c'
			},
			size: {
				type: [String, Number],
				default: 22
			},
			cssUnit: {
				type: String,
				default: 'rpx'
			},
			...props
		},
		computed: {
			QS_nCompStyle() {
				const style =  {
					width: this.getWidth,
					height: this.getSize * 1.6 + this.cssUnit,
					lineHeight: this.getSize * 1.6 + this.cssUnit,
					borderRadius: this.getSize * 10 + this.cssUnit,
					position: this.position,
					top: this.top,
					bottom: this.bottom,
					left: this.left,
					right: this.right,
					color: this.color,
					backgroundColor: this.backgroundColor,
					fontSize: this.getSize + this.cssUnit,
					padding: '0' + this.cssUnit + ' ' + this.getSize * .5 + this.cssUnit
				};
				return style;
			},
			getSize() {
				return Number(this.size);
			},
			getWidth() {
				return (String(this.text).length * this.getSize * .75 + this.getSize) + this.cssUnit
			}
		},
		methods: {
			click() {
				this.$emit('click');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.QS-Badge {
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		justify-content: center;
		flex-direction: row;
		text-align: center;
	}
</style>
