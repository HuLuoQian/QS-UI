<template>
	<text class="QS-Badge" v-if="text" :class="getClass" :style="getStyle" @tap="click">{{ text }}</text>
</template>

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Badge/js/props.js';
	import styleObj2String from '../../js/functions/styleObj2String.js';
	import classObj2String from '../../js/functions/classObj2String.js';
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-Badge' });
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
			...props
		},
		computed: {
			QS_nCompClass() {
				return classObj2String(this.compClass.badge);
			},
			QS_nCompStyle() {
				const style =  {
					width: this.getWidth,
					height: this.getFontSize * 1.6 + 'px',
					lineHeight: this.getFontSize * 1.6 + 'px',
					borderRadius: this.getFontSize * 10 + 'px',
					position: this.position,
					top: this.top,
					bottom: this.bottom,
					left: this.left,
					right: this.right,
					color: this.color,
					backgroundColor: this.backgroundColor,
					fontSize: this.getFontSize + 'px',
					padding: '0 ' + this.getFontSize * .5 + 'px'
				};
				return `${styleObj2String(style)};${styleObj2String(this.compStyle.badge)};`;
			},
			getWidth() {
				return (String(this.text).length * this.getFontSize * .75 + this.getFontSize) + 'px'
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
