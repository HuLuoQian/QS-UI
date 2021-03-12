<template>
	<QSPickerTemplate :compClass="compClass" :compStyle="compStyle" ref="QSPickerTem" :height="height" :lineHeight="lineHeight" :fontScale="fontScale" :buttonSet="buttonSet"
	 :title="title" :mode="mode" :zIndex="zIndex" :bgColor_title="bgColor_title" :autoHide="autoHide" :titleColor="titleColor"
	 @confirm="confirm">
		<picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)">
			<picker-view-column>
				<view class="flex_row_c_c pickerDefault" :class="((value[0] || 0) === picker_index?'selectColor':'defaultColor')"
				 v-for="(picker_item,picker_index) in provinceDataList" :key="picker_index">{{picker_item.label}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="flex_row_c_c pickerDefault" :class="((value[1] || 0) === picker_index?'selectColor':'defaultColor')"
				 v-for="(picker_item,picker_index) in cityDataList" :key="picker_index">{{picker_item.label}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="flex_row_c_c pickerDefault" :class="((value[2] || 0) === picker_index?'selectColor':'defaultColor')"
				 v-for="(picker_item,picker_index) in areaDataList" :key="picker_index">{{picker_item.label}}</view>
			</picker-view-column>
		</picker-view>
	</QSPickerTemplate>
</template>

<script>
	import QSPickerTemplate from '../../template/QS-picker/elements/QS-pickerTemplate.vue';
	import QSPickerMixin from '../../template/QS-picker/js/QS-picker-mixin.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-PickerCity-select/js/props.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-PickerCity-select' });
	const QSPickerMixinRes = QSPickerMixin();
	
	var provinceData = [];
	var cityData = [];
	var areaData = [];
	export default {
		mixins: [QSPickerMixinRes.mixin],
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			...QSPickerMixinRes.props,
			// #endif
			...props
		},
		components: {
			QSPickerTemplate
		},
		data() {
			return {
				provinceDataList: [],
				cityDataList: [],
				areaDataList: [],
				inited: false,
				getCityData_bl: false
			};
		},
		mounted() {
			if (this.dataSet.showDefaultValue) {
				this.init();
				this.confirm({
					showDefaultValue: true
				});
			}
		},
		watch: {
			value(n, o) {
				console.log('value n:' + JSON.stringify(n));
				console.log('value o:' + JSON.stringify(o));
			}
		},
		methods: {
			checkInited() {
				return this.inited;
			},
			getCityData() {
				if (!this.getCityData_bl) {
					this.getCityData_bl = true;
					provinceData = require('../../data/city-data/province.js').default;
					cityData = require('../../data/city-data/city.js').default;
					areaData = require('../../data/city-data/area.js').default;
				}
			},
			init(cb, value) {
				console.log('init:' + JSON.stringify(value));
				if (!this.inited) this.inited = true;
				console.log('this.value:' + JSON.stringify(this.value));
				value = this.value && this.value.length > 0 ? this.value : (value || this.dataSet.defaultValue || [0, 0, 0]);
				console.log('value：' + JSON.stringify(value));
				this.getCityData();
				//city、provincialStreet
				this.provinceDataList = provinceData;
				this.cityDataList = cityData[value[0]];
				this.areaDataList = areaData[value[0]][value[1]];
				setTimeout(() => {
					this.value = [...value];
					if (cb && typeof cb === 'function') cb();
				}, 0)
				this.defaultValue = [...value];
				console.log('init完毕');
			},
			bindChange({
				detail: {
					value
				}
			}) {
				console.log('发生滚动: ' + JSON.stringify(value));
				if (this.value[0] !== value[0]) {
					// 第一级发生滚动
					this.cityDataList = cityData[value[0]];
					this.areaDataList = areaData[value[0]][0];
					value[1] = 0;
					value[2] = 0;
				} else if (this.value[1] !== value[1]) {
					// 第二级滚动
					this.areaDataList = areaData[value[0]][value[1]];
					value[2] = 0;
				}
				this.value = value;
				this.$emit('pickerChange', {
					value
				});
			},
			confirm({
				showDefaultValue
			} = {}) {
				console.log('内部confirm:' + JSON.stringify(this.value));
				const obj = {
					data: this._getLabel(),
					value: this.value,
					cityCode: this._getCityCode()
				};
				console.log('confirm结果:' + JSON.stringify(obj));
				this.$emit('confirm', obj);
				if (this.autoHide && !showDefaultValue) this.hide();
			},
			_getLabel() {
				console.log('获取label:' + JSON.stringify(this.value));
				let pcikerLabel =
					provinceData[this.value[0]].label +
					'-' +
					cityData[this.value[0]][this.value[1]].label +
					'-' +
					areaData[this.value[0]][this.value[1]][this.value[2]].label;
				console.log('获取label:' + pcikerLabel);
				return pcikerLabel;
			},
			_getCityCode() {
				console.log('准备获取citycode');
				const data = areaData[this.value[0]][this.value[1]][this.value[2]].value;
				console.log('获取完毕:' + JSON.stringify(data));
				return data;
			},
			setParseValue(value, parseChar) {
				this.getCityData();
				try {
					const arr = value.split(parseChar || '-');
					const v1 = provinceData.findIndex(item => item.label === arr[0] || item.value === arr[0]);
					const v2 = cityData[v1].findIndex(item => item.label === arr[1] || item.value === arr[1]);
					const v3 = areaData[v1][v2].findIndex(item => item.label === arr[2] || item.value === arr[2]);
					const val = [v1, v2, v3];
					this.value = [...val];
					console.log(JSON.stringify(val));
					// this.init(false, val);
					return val;
				} catch (e) {
					//TODO handle the exception
					console.log('setParseValue error:' + JSON.stringify(e));
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../template/QS-picker/css/QS-picker.css";
	@import "@/QS-UI-CONFIG/components/QS-inputs-split/css/picker.css";
</style>
