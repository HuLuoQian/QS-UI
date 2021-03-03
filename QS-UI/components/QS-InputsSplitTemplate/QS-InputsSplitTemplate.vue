<template>
	<view 
	class="position_relative inputs-split-container" 
	:class="getClass" 
	:style="getStyle">
		<text 
		class="marginRight5 text_nowrap padding-rpx_10_15" 
		:class="[getTitleLayout, getWidthMode]"
		:style="'flex:' + (titleFlex||1) + ';color:' + (titleColor||'#999') + ';' + (titleStyle||'')"
		v-if="title&&!titleHide">
			<text 
			class="fontColorF1505C" 
			v-if="required">
				{{requiredSign || '*'}}
			</text> 
			{{title}}
		</text>
		<view class="inputs-split-content-container" :class="itemDisabled?'pe_none': 'pe_auto'" :style="'flex:' + (contentFlex||4) + ';' + (contentStyle||'')">
			<slot></slot>
		</view>
		<view 
		class="flex_row_c_c itemDisabled" 
		:class="itemDisabled?'show': ''" />
	</view>
</template>

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-InputsSplitTemplate/js/props.js';
	const QSComponentMixinRes = QSComponentMixin();
	export default {
		mixins: [QSComponentMixinRes.mixin],
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			title: {
				type: String,
				default: ''
			},
			titleHide: {
				type: Boolean,
				default: false
			},
			fontSize: {
				type: Number,
				default: 30
			},
			width: {
				type: String,
				default: '100%'
			},
			titleLayout: {
				type: String,
				default: 'default'
			},
			titleFlex: {
				type: Number,
				default: 1
			},
			contentFlex: {
				type: Number,
				default: 4
			},
			titleStyle: {
				type: String,
				default: ''
			},
			contentStyle: {
				type: String,
				default: ''
			},
			layout: {
				type: String,
				default: 'row'
			},
			required: {
				type: Boolean,
				default: false
			},
			requiredSign: {
				type: String,
				default: '*'
			},
			itemDisabled: {
				type: Boolean,
				default: false
			},
			titleColor: {
				type: String,
				default: '#999'
			},
			...props
		},
		computed: {
			QS_nCompClass() {
				return this.getLayout;
			},
			QS_nCompStyle() {
				const style = {
					'font-size': this.fontSize + 'rpx',
					'width': this.width,
				}
				return style;
			},
			getLayout() {
				if(this.layout === 'column') {
					return 'flex_column';
				}else {
					return 'flex_row';
				}
			},
			getTitleLayout() {
				switch (this.titleLayout){
					case 'left':
						return 'flex_row_none_c';
						break;
					case 'center':
						return 'flex_row_c_c';
						break;
					case 'right':
						return 'flex_row_e_c';
						break;
					default:
						if(this.layout === 'column') {
							return 'flex_row_none_c';
						}else{
							return 'flex_row_e_c';
						}
						break;
				}
			},
			getWidthMode() {
				if(this.layout === 'column') {
					return 'width100';
				}else{
					return 'maxWidth40';
				}
			}
		},
		methods: {
			voidFc() {}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../css/QS-inputs-split/inputs.css";
	@import "@/QS-UI-CONFIG/components/QS-inputs-split/css/index.css";
</style>
