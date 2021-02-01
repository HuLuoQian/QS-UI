<template>
	<QSPickerTemplate :compClass="compClass" :compStyle="compStyle" ref="QSPickerTem" :height="height" :fontScale="fontScale" :buttonSet="buttonSet" :title="title"
	 :mode="mode" :zIndex="zIndex" :bgColor_title="bgColor_title" :autoHide="autoHide" :titleColor="titleColor" @confirm="confirm">
		<block v-if="linkage">
			<block v-if="linkageNum==2">
				<picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)">
					<picker-view-column>
						<view class="flex_row_c_c pickerDefault" :class="((value[0] || 0) === index?'selectColor':'defaultColor')" v-for="(item,index) in itemArray"
						 :key="index">{{item[steps.step_1_value]}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="flex_row_c_c pickerDefault" :class="((value[1] || 0) === index?'selectColor':'defaultColor')" v-for="(item,index) in getItem2"
						 :key="index">{{item[steps.step_2_value]||item}}</view>
					</picker-view-column>
				</picker-view>
			</block>

			<block v-else-if="linkageNum==3">
				<picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)">
					<picker-view-column>
						<view class="flex_row_c_c pickerDefault" :class="((value[0] || 0) === index?'selectColor':'defaultColor')" v-for="(item,index) in itemArray"
						 :key="index">{{item[steps.step_1_value]}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="flex_row_c_c pickerDefault" :class="((value[1] || 0) === index?'selectColor':'defaultColor')" v-for="(item,index) in getItem2"
						 :key="index">{{item[steps.step_2_value]}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="flex_row_c_c pickerDefault" :class="((value[2] || 0) === index?'selectColor':'defaultColor')" v-for="(item,index) in getItem3"
						 :key="index">{{item[steps.step_3_value]||item}}</view>
					</picker-view-column>
				</picker-view>

			</block>
		</block>
		<block v-else>
			<picker-view @touchmove.prevent.stop="voidFc()" indicator-style="height: 60px;" :value="value" @change="bindChange($event)">
				<picker-view-column v-for="(items, indexs) in itemArray" :key="indexs">
					<view class="flex_row_c_c pickerDefault" :class="((value[indexs] || 0) === index?'selectColor':'defaultColor')"
					 v-for="(item, index) in items" :key="index">{{steps?steps.step_1_value?item[steps.step_1_value]:item:item}}</view>
				</picker-view-column>
			</picker-view>
		</block>
	</QSPickerTemplate>
</template>

<script>
	import _app from '../../js/QS-inputs-split/app.js';
	import QSPickerTemplate from '../../template/QS-picker/elements/QS-pickerTemplate.vue';
	import QSPickerMixin from '../../template/QS-picker/js/QS-picker-mixin.js';
	import QSPicker from '../../template/QS-picker/js/QS-picker.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-PickerCustom-select/js/props.js';
	const QSComponentMixinRes = QSComponentMixin();
	const QSPickerMixinRes = QSPickerMixin();

	export default {
		mixins: [QSPickerMixinRes.mixin],
		components: {
			QSPickerTemplate
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			...QSPickerMixinRes.props,
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
			customId: {
				type: [String, Object],
				deault: ''
			},
			...props
		},
		data() {
			return {
				itemArray: [],
				async_1: [],
				async_2: [],
				oldValue: [],
				memoryData_1: [],
				memoryData_2: [],
				waiting: false,
				inited: false
			};
		},
		computed: {
			getItem2() {
				if (this.async) {
					return this.async_1 || [];
				} else {
					return (this.steps && this.steps.step_2_item && this.itemArray[this.value[0] || 0]) ? this.itemArray[this.value[0] ||
						0][this.steps.step_2_item] : [];
				}
			},
			getItem3() {
				if (this.async) {
					return this.async_2 || [];
				} else {
					if (this.steps && this.steps.step_2_item && this.steps.step_3_item && this.itemArray[this.value[0] || 0] && this.itemArray[
							this.value[0] || 0][this.steps.step_2_item] && this.itemArray[this.value[0] || 0][this.steps.step_2_item][this.value[
							1] || 0]) {
						return this.itemArray[this.value[0] || 0][this.steps.step_2_item][this.value[1] || 0][this.steps.step_3_item];
					} else {
						return [];
					}
				}
			}
		},
		mounted() {
			if (this.dataSet.showDefaultValue) {
				this.init();
				this.confirm({
					showDefaultValue: true
				});
			}
		},
		methods: {
			checkInited() {
				return this.inited;
			},
			init(cb) {
				if (!this.inited) this.inited = true;

				this.$nextTick(() => {
					this.value = QSPicker.getCustomDefaultValue({
						defaultValue: this.dataSet.defaultValue,
						linkage: this.linkage,
						linkageNum: this.linkageNum,
						itemArrayLen: this.itemArray.length
					});
					this.checkAsync();
					if (cb && typeof cb === 'function') cb();
				})
			},
			checkAsync() {
				if (this.async && this.itemArray.length > 0) {
					if (this.linkageNum == 2) {
						if (this.async_1.length !== 0)
							return;
					} else if (this.linkageNum == 3) {
						if (this.async_2 !== 0)
							return;
					}
					this.getAsyncData({
						value: this.value,
						launch: true
					});
				}
			},
			bindChange({
				detail: {
					value
				}
			}) { //解构 赋值
				console.log('custom value:' + JSON.stringify(value));
				this.value = value;
				const oldValue = [...this.oldValue];
				if (this.async && this.linkage) {
					switch (Number(this.linkageNum)) {
						case 2:
							if (oldValue[0] !== value[0]) {
								this.getAsyncData({
									value,
									index: 0
								});
							}
							break;
						case 3:
							if (oldValue[0] !== value[0]) {
								this.getAsyncData({
									value,
									index: 0
								});
							} else if (oldValue[1] !== value[1]) {
								this.getAsyncData({
									value,
									index: 1
								});
							}
							break;
						default:
							break;
					}
				}
				this.$emit('pickerChange', {
					value
				});
			},
			getAsyncData(obj) { // 逐级获取
				let oldValue = [];
				if (this.oldValue.length && this.oldValue.length > 0) oldValue = [...this.oldValue];
				if (obj.value.length === 0) {
					switch (Number(this.linkageNum)) {
						case 2:
							obj.value = [0, 0];
							break;
						case 3:
							obj.value = [0, 0, 0];
							break;
						default:
							break;
					}
					this.value = [...obj.value];
				}
				obj = {
					...obj,
					datas: {
						data_0: [...this.itemArray],
						data_1: this.async_1.length && this.async_1.length > 0 ? [...this.async_1] : []
					},
					linkageNum: this.linkageNum,
					customId: this.customId,
					type: 'picker-custom',
					oldValue
				};
				_app.getPickerAsyncData.call(this, obj);
			},
			confirm({
				showDefaultValue
			} = {}) {
				let _this = this;
				if (_this.waiting) {
					_app.showToast('正在获取数据, 请稍候');
					return;
				}
				const async = _this.async;
				let datas = _this.itemArray;
				let v = _this.value;
				let data = {};
				let steps = _this.steps;
				if (_this.linkage) {
					for (let i = 0; i < _this.linkageNum; i++) {
						if (!v[i]) v[i] = 0;
					}
					if (_this.linkageNum == 2) { //二级联动
						data.steps1 = datas[v[0]]
						data.steps2 = async ?_this.async_1[v[1]]: datas[v[0]][steps.step_2_item][v[1]];
					} else if (_this.linkageNum == 3) { //三级联动
						data.steps1 = datas[v[0]];
						if (!data.steps1)
							_app.showToast('第一列中不存在第' + v[0] + '项');
						data.steps2 = async ?_this.async_1[v[1]]: data.steps1[steps.step_2_item][v[1]];
						if (!data.steps2)
							_app.showToast('第二列中不存在第' + v[1] + '项');
						data.steps3 = async ?_this.async_2[v[2]]: data.steps2[steps.step_3_item][v[2]];
						if (!data.steps3)
							_app.showToast('第三列中不存在第' + v[2] + '项');
					} else {
						_app.showToast('不在指定范围中');
					}
				} else { //无联动
					data = [];
					for (let i = 0; i < datas.length; i++) {
						let d = datas[i];
						data.push(d[(v[i] || 0)]);
					}
				}
				const obj = {
					data,
					value: v
				}
				_this.$emit('confirm', obj);
				if (this.autoHide && !showDefaultValue) this.hide();
			},
			setData(data) {
				this.itemArray = data;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../template/QS-picker/css/QS-picker.css";
	@import "@/QS-UI-CONFIG/components/QS-inputs-split/css/picker.css";
</style>
