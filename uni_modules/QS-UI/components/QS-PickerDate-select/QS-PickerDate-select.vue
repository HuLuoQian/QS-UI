<template>
	<QSPickerTemplate :compClass="compClass" :compStyle="compStyle" ref="QSPickerTem" :height="height" :lineHeight="lineHeight" :fontScale="fontScale"
	  :buttonSet="buttonSet" :title="title" :mode="mode" :zIndex="zIndex" :bgColor_title="bgColor_title"
	 :autoHide="autoHide" :titleColor="titleColor" @confirm="confirm" @showQSPicker="showQSPicker" @hideQSPicker="hideQSPicker">
		<!-- #ifndef MP-ALIPAY -->
		<picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)">
			<picker-view-column v-if="setObj.dateMode>=1">
				<view class="flex_row_c_c pickerDefault" :class="((value[0] || 0) === picker_index?'selectColor':'defaultColor')"
				 v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view>
			</picker-view-column>
			<picker-view-column v-if="setObj.dateMode>=2">
				<view class="flex_row_c_c pickerDefault" :class="((value[1] || 0) === picker_index?'selectColor':'defaultColor')"
				 v-for="(picker_item,picker_index) in months" :key="picker_index">{{picker_item}}月</view>
			</picker-view-column>
			<picker-view-column v-if="setObj.dateMode>=3">
				<view class="flex_row_c_c pickerDefault" :class="((value[2] || 0) === picker_index?'selectColor':'defaultColor')"
				 v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item}}日</view>
			</picker-view-column>
			<picker-view-column v-if="setObj.dateMode>=4">
				<view class="flex_row_c_c pickerDefault" :class="((value[3] || 0) === picker_index?'selectColor':'defaultColor')"
				 v-for="(picker_item,picker_index) in hours" :key="picker_index">{{picker_item}}时</view>
			</picker-view-column>
			<picker-view-column v-if="setObj.dateMode>=5">
				<view class="flex_row_c_c pickerDefault" :class="((value[4] || 0) === picker_index?'selectColor':'defaultColor')"
				 v-for="(picker_item,picker_index) in ms" :key="picker_index">{{picker_item}}分</view>
			</picker-view-column>
			<picker-view-column v-if="setObj.dateMode>=6">
				<view class="flex_row_c_c pickerDefault" :class="((value[5] || 0) === picker_index?'selectColor':'defaultColor')"
				 v-for="(picker_item,picker_index) in ms" :key="picker_index">{{picker_item}}秒</view>
			</picker-view-column>
		</picker-view>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<!-- 支付宝奇葩一点的，别的平台都可以 但是他不行，， 郁闷 -->
		<block v-if="setObj.dateMode==1"><picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)"><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[0] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view></picker-view-column></picker-view></block>
		<block v-if="setObj.dateMode==2"><picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)"><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[0] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[1] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in months" :key="picker_index">{{picker_item}}月</view></picker-view-column></picker-view></block>
		<block v-if="setObj.dateMode==3"><picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)"><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[0] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[1] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in months" :key="picker_index">{{picker_item}}月</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[2] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item}}日</view></picker-view-column></picker-view></block>
		<block v-if="setObj.dateMode==4"><picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)"><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[0] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[1] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in months" :key="picker_index">{{picker_item}}月</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[2] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item}}日</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[3] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in hours" :key="picker_index">{{picker_item}}时</view></picker-view-column></picker-view></block>
		<block v-if="setObj.dateMode==5"><picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)"><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[0] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[1] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in months" :key="picker_index">{{picker_item}}月</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[2] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item}}日</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[3] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in hours" :key="picker_index">{{picker_item}}时</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[4] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in ms" :key="picker_index">{{picker_item}}分</view></picker-view-column></picker-view></block>
		<block v-if="setObj.dateMode==6"><picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)"><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[0] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[1] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in months" :key="picker_index">{{picker_item}}月</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[2] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item}}日</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[3] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in hours" :key="picker_index">{{picker_item}}时</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[4] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in ms" :key="picker_index">{{picker_item}}分</view></picker-view-column><picker-view-column><view class="flex_row_c_c pickerDefault" :class="((value[5] || 0) === picker_index?'selectColor':'defaultColor')" v-for="(picker_item,picker_index) in ms" :key="picker_index">{{picker_item}}秒</view></picker-view-column></picker-view></block>
		<!-- #endif -->
	</QSPickerTemplate>
</template>

<script>
	import QSPickerTemplate from '../../template/QS-picker/elements/QS-pickerTemplate.vue';
	import QSPickerMixin from '../../template/QS-picker/js/QS-picker-mixin.js';
	import QSPicker from '../../template/QS-picker/js/QS-picker.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-PickerDate-select/js/props.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-PickerDate-select' });
	const QSPickerMixinRes = QSPickerMixin();

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
				years: [],
				days: [],
				months: QSPicker.num2Array(12),
				hours: QSPicker.num2Array(24, true),
				ms: QSPicker.num2Array(60, true),
				inited: false
			};
		},
		created() {
			this.setObj = QSPicker.creatDateObj(this.dataSet);
		},
		mounted() {
			const setObj = this.setObj;
			if(setObj.showDefaultValue) {
				this.init();
				this.confirm({showDefaultValue: true});
			}
		},
		methods: {
			checkInited() {
				return this.inited;
			},
			init(cb) {
				if(!this.inited) this.inited = true;
				let value = [];
				const setObj = this.setObj;
				//date
				let years = [];
				let days = [];
				let defaultDate = setObj.defaultValue;
				years = QSPicker.countYears(setObj.startYear || (new Date().getFullYear() - 5), setObj.endYear || (new Date().getFullYear() +
					5));
				let endYear = years[years.length - 1];
				let defaultYear = defaultDate.getFullYear(),
					defaultMonth = defaultDate.getMonth(),
					defaultDay = defaultDate.getDate(),
					defaultHour = defaultDate.getHours(),
					defaultMinute = defaultDate.getMinutes(),
					defaultSecond = defaultDate.getSeconds();
				let compareY = defaultYear > endYear;
				let year = compareY ? endYear : defaultYear;
				let month = compareY ? 11 : defaultMonth;
				defaultDate[1] = month;
				days = QSPicker.countDays(year, defaultDate).days;
				this.years = years;
				this.days = days;
				
				// this.$nextTick(()=>{
					let dm = Number(setObj.dateMode);
					if (dm >= 1) {
						if (compareY) {
							value.push(years.length - 1);
						}else {
							const cY = years.findIndex(item=>item === year);
							if(cY >= 0) {
								value.push(cY);
							}else{
								value.push(0);
							}
						}
					}
					if (dm >= 2) value.push(compareY ? 11 : month);
					if (dm >= 3) value.push(compareY ? days : defaultDay - 1);
					if (dm >= 4) value.push(defaultHour);
					if (dm >= 5) value.push(defaultMinute);
					if (dm >= 6) value.push(defaultSecond);
					//date

					setTimeout(()=>{
						this.$nextTick(()=>{
							this.value = [...value];
							if(cb && typeof cb === 'function') cb();
						})
					},0)
				// })
				let defaultValue = [...value];
				this.defaultValue = defaultValue;
			},
			bindChange({
				detail: {
					value
				}
			}) {
				let data = QSPicker.countDays(this.years[value[0]], value);
				this.days = data.days;
				this.value = data.val;
				this.$emit('pickerChange', {value});
			},
			async setParseValue(val) {
				if(!this.inited) {
					await new Promise(rs=>{
						this.init(()=>{ rs() });
					})
				}
				const dm = Number(this.setObj.dateMode);
				const date = new Date(val);
				let value = [];
				if (dm >= 1) value.push(this.years.findIndex(item=>Number(item)===date.getFullYear()));
				if (dm >= 2) value.push(this.months.findIndex(item=>Number(item)===(date.getMonth() + 1)));
				if (dm >= 3) value.push(this.days.findIndex(item=>Number(item)===date.getDate()));
				if (dm >= 4) value.push(this.hours.findIndex(item=>Number(item)===date.getHours()));
				if (dm >= 5) value.push(this.ms.findIndex(item=>Number(item)===date.getMinutes()));
				if (dm >= 6) value.push(this.ms.findIndex(item=>Number(item)===date.getSeconds()));
				console.log('picker-date-select setParseValue value:' + JSON.stringify(value));
				this.value = value;
			},
			confirm({ showDefaultValue } = {}) {
				const value = this.value;
				const obj = {
					value
				}
				let setObj = this.setObj;
				let data = '';
				let dateFormatArray = setObj.dateFormatArray;
				
				for (let i = 1; i <= Number(this.setObj.dateMode); i++) {
					if (i <= 6) {
						let j = i - 1;
						const f = i - 2;
						let arr;
						switch (i) {
							case 1:
								arr = this.years;
								break;
							case 2:
								arr = this.months;
								break;
							case 3:
								arr = this.days;
								break;
							case 4: 
								arr = this.hours;
								break;
							default:
								arr = this.ms;
								break;
						}
						let d = String(arr[value[j]]);
						if(d === undefined) d = ''
						data += (f>=0?(dateFormatArray[f] || ''):'') + d;
					}
				}
				if(this.setObj.includeNext) {
					const formatIndex = Number(this.setObj.dateMode)-1;
					if(dateFormatArray[formatIndex]) data += dateFormatArray[formatIndex];
				}

				obj.data = data;
				this.$emit('confirm', obj);
				if (this.autoHide && !showDefaultValue) this.hide();
			},
			showQSPicker() {
				this.$emit('showQSPicker');
			},
			hideQSPicker() {
				this.$emit('hideQSPicker');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../template/QS-picker/css/QS-picker.css";
	@import "@/QS-UI-CONFIG/components/QS-inputs-split/css/picker.css";
</style>
