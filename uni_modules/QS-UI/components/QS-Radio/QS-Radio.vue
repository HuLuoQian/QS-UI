<template>
	<QStemplate :compClass="compClass" :compStyle="compStyle" :title="title" :titleHide="titleHide" :fontSize="fontSize" :width="width" :titleFlex="titleFlex"
	 :contentFlex="contentFlex" :titleStyle="titleStyle" :contentStyle="contentStyle" :required="required" :requiredSign="requiredSign"
	 :layout="layout" :titleLayout="titleLayout" :itemDisabled="itemDisabled" :titleColor="titleColor">
		<view class="flex_row_none_c width100 padding-rpx_10_15">
			<radio-group @change="radioChange" class="width100 wrap" :class="itemLayout_computed">
				<label class="fontColor666666 flex_row_none_c marginRight_15rpx padding_10rpx" v-for="(radioItem, radioIndex) in itemArray||[]"
				 :key="radioIndex">
					<radio :value="radioItem.value" :checked="value==String(radioItem.value)" :disabled="disabled" :color="radioItem.color||color"
					 :style="'transform: scale(' + (scale||'.8') + ');'" />
					<view class="flex_row_none_c">{{radioItem.name}}</view>
				</label>
			</radio-group>
		</view>
	</QStemplate>
</template>

<script>
	import _app from '../../js/QS-inputs-split/app.js';
	import QSInputsMixin from '../../js/QS-inputs-split/QSInputsMixin.js';
	import QStemplate from '../QS-InputsSplitTemplate/QS-InputsSplitTemplate.vue';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Radio/js/props.js';
	const QSComponentMixinRes = QSComponentMixin();

	export default {
		components: {
			QStemplate
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			itemArray: {
				type: Array,
				default () {
					return []
				}
			},
			color: {
				type: String,
				default: '#33cc33'
			},
			scale: {
				type: String,
				default: '.8'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			...props
		},
		methods: {
			radioChange({
				detail: {
					value
				}
			}) {
				this.setValue(value);
			}
		},
		mixins: [QSInputsMixin({
			QSInputsType: _app.typeObj.radio
		})]
	};
</script>

<style lang="scss" scoped>
	@import "../../css/QS-inputs-split/inputs.css";
</style>
