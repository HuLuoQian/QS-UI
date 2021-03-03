<template>
	<view :class="getClass"  @tap.stop.prevent="show">
		<QStemplate 
		:title="title" 
		:titleHide="titleHide" :fontSize="fontSize" :width="width" :titleFlex="titleFlex"
		 :contentFlex="contentFlex" :titleStyle="titleStyle" :contentStyle="contentStyle" :required="required" :requiredSign="requiredSign"
		 :layout="layout" :titleLayout="titleLayout" :itemDisabled="itemDisabled" :titleColor="titleColor">
			<view class="flex_row width100">
						<block v-if="linkage">
							<block v-if="linkageNum == 2">
								<view class="flex_row_e_c padding-rpx_10_15 Flex8" :class="nValue.data && nValue.data.steps1 && nValue.data.steps2?'':'fontColorADADAD'">
									{{
										nValue.data && nValue.data.steps1 && nValue.data.steps2?
										(nValue.data.steps1[steps.step_1_value] + '-' + 
										(steps.step_2_value?nValue.data.steps2[steps.step_2_value]:nValue.data.steps2)):
										placherhold
									}}
								</view>
							</block>
							<block v-if="linkageNum == 3">
								<view class="flex_row_e_c padding-rpx_10_15 Flex8" :class="nValue.data && nValue.data.steps1 && nValue.data.steps2 && nValue.data.steps3?'':'fontColorADADAD'">
									{{
										nValue.data && nValue.data.steps1 && nValue.data.steps2 && nValue.data.steps3?
										(nValue.data.steps1[steps.step_1_value] + '-' + 
										(steps.step_2_value?nValue.data.steps2[steps.step_2_value]:nValue.data.steps2) + '-' + 
										(steps.step_3_value?nValue.data.steps3[steps.step_3_value]:nValue.data.steps3)):
										placherhold
									}}
								</view>
							</block>
						</block>
						<block v-else>
							<block v-if="nValue.data && nValue.data.length > 0">
								<view class="flex_row_e_c padding-rpx_10_15 Flex8">
									<view
									v-for="(i, d) in nValue.data" 
									:key="d">
										{{
											d==0?
											(steps?
											steps.step_1_value?
											i[steps.step_1_value]:
											i:
											i):
											'-' + 
											(steps?
											steps.step_1_value?
											i[steps.step_1_value]:
											i:
											i)
										}}
									</view>
								</view>
							</block>
							<block v-else>
								<view class="flex_row_e_c padding-rpx_10_15 Flex8 fontColorADADAD">
									{{placherhold}}
								</view>
							</block>
						</block>
				<view class="Flex1 flex_row_c_c">
					<QSIcons type="forward" :size="fontSize" color="#666"></QSIcons>
				</view>
			</view>
		</QStemplate>
		<pickerCustom2 
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
		@hideQSPicker="hideQSPicker"
		
		:linkage="linkage"
		:linkageNum="linkageNum"
		:steps="steps"
		:async="async"
		:customId="customId"></pickerCustom2>
	</view>
</template>

<script>
	import _app from '../../js/QS-inputs-split/app.js';
	import QStemplate from '../../template/QS-inputs-split/template.vue';
	import QSInputsMixin from '../../js/QS-inputs-split/QSInputsMixin.js';
	import pickerCustom2 from '../QS-PickerCustom2-select/QS-PickerCustom2-select.vue';
	import QSIcons from '../QS-Icons/QS-Icons.vue';
	import QSInputsPickerMixin from '../../js/QS-inputs-split/QSInputsPickerMixin.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-PickerCustom2/js/props.js';
	const QSComponentMixinRes = QSComponentMixin();
	const QSInputsPickerMixinRes = QSInputsPickerMixin();

	export default {
		mixins: [QSInputsMixin({
			QSInputsType: _app.typeObj.picker_custom2
		}), QSInputsPickerMixinRes.mixin, QSComponentMixinRes.mixin],
		components: {
			QStemplate,
			pickerCustom2,
			QSIcons
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			...QSInputsPickerMixinRes.props,
			// #endif
			linkage: {
				type: Boolean,
				default: false
			},
			linkageNum: {
				type: [Number, String],
				default: 2
			},
			steps: Object,
			async: {
				type: Boolean,
				default: false
			},
			...props
		},
		computed: {
			QS_nCompClass() {
				return 'QS width100';
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../css/QS-inputs-split/inputs.css";
</style>
