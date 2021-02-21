<template>
	<view 
	:class="getClass" 
	:style="getStyle">
		<text class="icon-box" :style="{
			fontSize: size + cssUnit,
			height: getSize*getBoxHeightScale + cssUnit,
			lineHeight: getSize*getBoxHeightScale + cssUnit,
			width: getSize*getBoxWidthScale + cssUnit,
			backgroundColor: subtractBackgroundColor,
			color: (getnValue <= Number(min))?'#c8c9cc':subtractDefColor,
			'border-top-left-radius': borderRadius,
			'border-bottom-left-radius': borderRadius
		}" @tap="sub">-</text>
		<view class="input-box" :style="{
			fontSize: size + cssUnit,
			height: 40 + cssUnit,
			width: getInputBoxWidth,
			backgroundColor: inputBoxBackgroundColor
		}">
			<input class="input" :style="{
				width: getInputWidth,
				fontSize: size + cssUnit,
				lineHeight: size + cssUnit,
				height: getSize*getBoxHeightScale + cssUnit,
				color: inputDefColor
			}" type="number" v-model="nValue" @input="change" @blur="blur"/>
		</view>
		<text class="icon-box" :style="{
			fontSize: size + cssUnit,
			height: getSize*getBoxHeightScale + cssUnit,
			lineHeight: getSize*getBoxHeightScale + cssUnit,
			width: getSize*getBoxWidthScale + cssUnit,
			backgroundColor: addBackgroundColor,
			color: (getnValue >= Number(max))?'#c8c9cc':addDefColor,
			'border-bottom-right-radius': borderRadius,
			'border-top-right-radius': borderRadius
		}" @tap="add">+</text>
	</view>
</template>

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-NumberBox/js/props.js';
	import MP_styleObj2String from '../../js/functions/MP_styleObj2String.js';
	const QSComponentMixinRes = QSComponentMixin();
	
	var _this;
	export default {
		mixins: [QSComponentMixinRes.mixin],
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			size: {
				type: [String, Number],
				default: 36
			},
			cssUnit: {
				type: String,
				default: 'rpx'
			},
			value: {
				type: [String, Number],
				default: 0
			},
			min: {
				type: [String, Number],
				default: 0
			},
			max: {
				type: [String, Number],
				default: 1
			},
			boxHeightScale: {
				type: [String, Number],
				default: 1
			},
			boxWidthScale: {
				type: [String, Number],
				default: 1.8
			},
			subtractBackgroundColor: {
				type: String,
				default: '#f8f8f8'
			},
			subtractDefColor: {
				type: String,
				default: '#000000'
			},
			addBackgroundColor: {
				type: String,
				default: '#f8f8f8'
			},
			addDefColor: {
				type: String,
				default: '#000000'
			},
			inputBoxBackgroundColor: {
				type: String,
				default: '#ffffff'
			},
			inputDefColor: {
				type: String,
				default: '#000000'
			},
			borderRadius: {
				type: [String, Number],
				default: '10rpx'
			},
			step: {
				type: [String, Number],
				default: 1
			},
			...props
		},
		computed: {
			QS_nCompClass() {
				return 'QS QS-NumberBox';
			},
			QS_nCompStyle() {
				const style = {
					'border-radius': this.borderRadius
				};
				return MP_styleObj2String(style);
			},
			getInputBoxWidth() {
				let l = String(this.nValue).length + .3;
				l = l < 2?2:l;
				return (this.getSize*.33*l*this.getBoxWidthScale + 10) + this.cssUnit;
			},
			getInputWidth() {
				let l = String(this.nValue).length;
				l = l < 2?2:l;
				return (this.getSize*l*this.getBoxWidthScale) + this.cssUnit;
			},
			getSize() {
				return Number(this.size);
			},
			getBoxHeightScale() {
				return Number(this.boxHeightScale);
			},
			getBoxWidthScale() {
				return Number(this.boxWidthScale);
			},
			getStep() {
				return Number(this.step);
			},
			getnValue() {
				return Number(this.nValue);
			}
		},
		data() {
			return {
				nValue: Number(this.filterValue(Number(this.value)))
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		created() {
			_this = this;
		},
		mounted() {
			if(this.value != this.nValue) this._emit(this.nValue);
		},
		watch: {
			value(n) {
				console.log('watch value n', n)
				this.nValue = this.filterValue(n);
			},
			nValue(n) {
				console.log('watch nValue n', n)
				this._emit(n);
			}
		},
		methods: {
			_emit(val) {
				this.$emit('input', val);
				this.$emit('change', val);
			},
			change({ detail: { value } }) {
				console.log('change val', value);
				this.nValue = value;
			},
			filterValue(val) {
				let min = Number(this.min);
				let max = Number(this.max);
				val = Number(val);
				console.log('min', min);
				console.log('val', val);
				console.log('val < min', val < min);
				console.log('val > max', val > max);
				if(val < min) return min;
				if(val > max) return max;
				return val;
			},
			blur(e) {
				console.log('blur e', e.detail.value);
				const val = this.filterValue(e.detail.value);
				console.log('blur val', val);
				_this.nValue = val;
			},
			sub() {
				console.log('getStep', this.getStep);
				this.nValue = this.filterValue(this.getnValue - this.getStep);
			},
			add() {
				console.log('getStep', this.getStep);
				this.nValue = this.filterValue(this.getnValue + this.getStep);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.QS-NumberBox{
		/* #ifndef APP-NVUE */
		display: flex;
		white-space: nowrap;
		/* #endif */
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		overflow: hidden;
	}
	.icon-box{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.input-box{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.input{
		text-align: center;
	}
</style>
