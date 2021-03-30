<template>
	<view class="QS-P" :class="getClass" :style="getStyle">
		<slot></slot>
	</view>
</template>

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-P/js/props.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-P' });
	export default {
		mixins: [QSComponentMixinRes.mixin],
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			height: {
				type: [Number, String],
				default: '12.5px'
			},
			width: {
				type: [Number, String],
				default: '12.5px'
			},
			size: {
				type: [Number, String],
				default: ''
			},
			borderRadius: {
				type: [Number, String],
				default: ''
			},
			backgroundColor: {
				type: String,
				default: ''
			},
			...props
		},
		computed: {
			QS_nCompStyle() {
				const style = {
					height: this.getHeight,
					width: this.getWidth,
					// #ifndef APP-NVUE
					minHeight: this.getHeight,
					minWidth: this.getWidth,
					// #endif
					borderRadius: this.borderRadius
				};
				return style;
			},
			getHeight() {
				if(this.size) return this.size;
				return this.height;
			},
			getWidth() {
				if(this.size) return this.size;
				return this.width;
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
