<template>
	<QStemplate :compClass="compClass" :compStyle="compStyle" :title="title" :titleHide="titleHide" :fontSize="fontSize"
		:width="width" :titleFlex="titleFlex" :contentFlex="contentFlex" :titleStyle="titleStyle"
		:contentStyle="contentStyle" :required="required" :requiredSign="requiredSign" :layout="layout"
		:titleLayout="titleLayout" :itemDisabled="itemDisabled" :titleColor="titleColor">
		<view class="QS flex_row_none_c width100 padding-rpx_10_15">
			<checkbox-group @change="checkboxChange" class="width100 wrap" :class="itemLayout_computed">
				<label class="fontColor666666 flex_row_none_c marginRight_15rpx padding_10rpx"
					v-for="(checkboxItem, checkboxIndex) in itemArray||[]" :key="checkboxIndex">
					<checkbox :value="checkboxItem.value" :checked="getStatus[checkboxIndex]" :disabled="disabled"
						:color="checkboxItem.color||color" :style="'transform: scale(' + (scale||'.8') + ');'" />
					<view class="flex_row_none_c">{{checkboxItem.name}}</view>
				</label>
			</checkbox-group>
		</view>
	</QStemplate>
</template>

<script>
	import _app from '../../js/QS-inputs-split/app.js';
	import QSInputsMixin from '../../js/QS-inputs-split/QSInputsMixin.js';
	import QStemplate from '../QS-InputsSplitTemplate/QS-InputsSplitTemplate.vue';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Checkbox/js/props.js';
	const QSComponentMixinRes = QSComponentMixin({
		componentType: 'QS-Checkbox'
	});

	export default {
		mixins: [
			QSComponentMixinRes.mixin,
			QSInputsMixin({
				QSInputsType: _app.typeObj.checkbox
			})
		],
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
		computed: {
			getStatus() {
				const status = [];
				const value = this.value;
				const itemArray = this.itemArray;
				if (value instanceof Array && value.length > 0) {
					for (let i = 0; i < itemArray.length; i++) {
						const j = value.findIndex(item => item === itemArray[i].value)
						if (j >= 0) {
							status.push(true);
						} else {
							status.push(false);
						}
					}
				} else {
					itemArray.forEach(() => {
						status.push(false);
					})
				}
				return status;
			}
		},
		methods: {
			checkboxChange({
				detail: {
					value
				}
			}) {
				this.setValue(value);
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../css/QS-inputs-split/inputs.css";
</style>
