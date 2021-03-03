<template>
	<QStemplate :title="title" :titleHide="titleHide" :fontSize="fontSize" :width="width" :titleFlex="titleFlex"
	 :contentFlex="contentFlex" :titleStyle="titleStyle" :contentStyle="contentStyle" :required="required" :requiredSign="requiredSign"
	 :layout="layout" :titleLayout="titleLayout" :itemDisabled="itemDisabled">
		<view class="flex_row_none_c width100 padding-rpx_10_15">
			
			
		</view>
	</QStemplate>
</template>

<script>
	import _app from '../../js/QS-inputs-split/app.js';
	import QStemplate from '../../template/QS-inputs-split/template.vue';
	import QSInputsMixin from '../../js/QS-inputs-split/QSInputsMixin.js';

	export default {
		components: {
			QStemplate
		},
		props: {
			
		},
		methods: {
			
		},
		mixins: [QSInputsMixin({
			QSInputsType: _app.typeObj.radio
		})]
	};
</script>

<style lang="scss" scoped>
	@import "../../css/QS-inputs-split/inputs.css";
</style>
