<template>
	<view :class="getClass"  @tap.stop.prevent="show">
		<QStemplate :title="title" :titleHide="titleHide" :fontSize="fontSize" :width="width" :titleFlex="titleFlex"
		 :contentFlex="contentFlex" :titleStyle="titleStyle" :contentStyle="contentStyle" :required="required" :requiredSign="requiredSign"
		 :layout="layout" :titleLayout="titleLayout" :itemDisabled="itemDisabled" :titleColor="titleColor">
			<view class="flex_row width100">
				<view class="flex_row_e_c padding-rpx_10_15 Flex8" :class="nValue.data?'':'fontColorADADAD'">
					{{nValue.data||placherhold}}
				</view>
				<view class="Flex1 flex_row_c_c">
					<QSIcons type="forward" :size="fontSize" color="#666"></QSIcons>
				</view>
			</view>
		</QStemplate>
		<pickerDate 
		ref="inputsRef" 
		:height="height" 
		:fontScale="fontScale"
		:buttonSet="buttonSet"
		:dataSet="dataSet"
		:showReset="showReset"
		:title="pickerTitle"
		:mode="mode"
		:zIndex="zIndex"
		:bgColor_title="bgColor_title"
		:titleColor="pickerTitleColor"
		:autoHide="autoHide"
		@confirm="confirm"
		@pickerChange="pickerChange"
		@showQSPicker="showQSPicker"
		@hideQSPicker="hideQSPicker"></pickerDate>
	</view>
</template>

<script>
	import _app from '../../js/QS-inputs-split/app.js';
	import QStemplate from '../../template/QS-inputs-split/template.vue';
	import QSInputsMixin from '../../js/QS-inputs-split/QSInputsMixin.js';
	import pickerDate from '../QS-PickerDate-select/QS-PickerDate-select.vue';
	import QSIcons from '../QS-Icons/QS-Icons.vue';
	import QSInputsPickerMixin from '../../js/QS-inputs-split/QSInputsPickerMixin.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-PickerDate/js/props.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-PickerDate' });
	const QSInputsPickerMixinRes = QSInputsPickerMixin();

	export default {
		mixins: [QSInputsMixin({
			QSInputsType: _app.typeObj.picker_date
		}), QSInputsPickerMixinRes.mixin, QSComponentMixinRes.mixin],
		components: {
			QStemplate,
			pickerDate,
			QSIcons
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			...QSInputsPickerMixinRes.props,
			// #endif
			...props
		},
		computed: {
			QS_nCompClass() {
				return 'QS width100 borderBottom1pxf2f2f2';
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../css/QS-inputs-split/inputs.css";
</style>
