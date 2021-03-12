<template>
	<QStemplate :compClass="compClass" :compStyle="compStyle" :title="title" :titleHide="titleHide" :fontSize="fontSize" :width="width" :titleFlex="titleFlex"
	 :contentFlex="contentFlex" :titleStyle="titleStyle" :contentStyle="contentStyle" :required="required" :requiredSign="requiredSign"
	 :layout="layout" :titleLayout="titleLayout" :itemDisabled="itemDisabled" :titleColor="titleColor">
		<view class="flex_row_none_c width100 padding-rpx_10_15">
			<view class="Flex5 position_relative" :class="itemLayout_computed">
				<textarea 
				:value="value"
				:placeholder="placeholder||('请输入' + title)"
				:placeholder-style="placeholder_style" 
				:placeholder-class="placeholder_class"
				:disabled="disabled"
				:maxlength="Number(maxlength)" 
				:focus="focusBl"
				:auto-height="autoHeight"
				:cursor-spacing="Number(cursor_spacing)" 
				:cursor="Number(cursor)"
				:show-confirm-bar="Boolean(show_confirm_bar)"
				:selection-start="Number(selection_start)"
				:selection-end="Number(selection_end)"
				:adjust-position="Boolean(adjust_position)"
				@focus="focusChange()"
				@blur="blurChange()"
				@linechange="linechange()"
				@input="inputs_change($event)" 
				v-show="!itemDisabled"
				:style="{
					'font-size': fontSize + 'rpx', 
					'opacity': itemDisabled?0:1, 
					'height': getHeight + 'px', 
					'width': textareaWidth + '%', 
					'background-color': textareaBackgroundColor,
					'border': String(border) === 'true'?'1px solid ' + (focusBl?focusBorderColor:blurBorderColor):''
				}"
				class="fontColor666666 border_radius_12rpx textarea" >
				</textarea>
				<view 
				class="fontColor666666 textareaItemDis flex_row border_radius_12rpx textarea" 
				:style="{
					'font-size': fontSize + 'rpx', 
					'height': getHeight + 'px', 
					'width': textareaWidth + '%', 
					'background-color': textareaBackgroundColor,
					'border': String(border) === 'true'?'1px solid ' + (focusBl?focusBorderColor:blurBorderColor):''
				}" 
				v-if="itemDisabled">
					{{value || placeholder || ('请输入' + title)}}
				</view>
			</view>
		</view>
	</QStemplate>
</template>

<script>
	import _app from '../../js/QS-inputs-split/app.js';
	import QSInputsMixin from '../../js/QS-inputs-split/QSInputsMixin.js';
	import QStemplate from '../QS-InputsSplitTemplate/QS-InputsSplitTemplate.vue';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Textarea/js/props.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-Textarea' });

	export default {
		components: {
			QStemplate
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			textareaSet: {
				type: Object,
				default () {
					return {};
				}
			},
			placeholder_style: {
				type: String,
				default: ''
			},
			placeholder_class: {
				type: String,
				default: 'textarea-placeholder'
			},
			maxlength: {
				type: [Number, String],
				default: 140
			},
			cursor_spacing: {
				type: [Number, String],
				default: 0
			},
			cursor: {
				type: [Number, String],
				default: 0
			},
			show_confirm_bar: {
				type: [Boolean, String],
				default: true
			},
			selection_start: {
				type: [Number, String],
				default: 0
			},
			selection_end: {
				type: [Number, String],
				default: 0
			},
			adjust_position: {
				type: [Boolean, String],
				default: true
			},
			focus: {
				type: Boolean,
				default: false
			},
			focusBorderColor: {
				type: String,
				default: '#999'
			},
			blurBorderColor: {
				type: String,
				default: '#f2f2f2'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			autoHeight: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			filterFc: {
				type: Function,
				default: null
			},
			filterType: {
				type: String,
				default: ''
			},
			verifyFc: {
				type: Function,
				default: null
			},
			verifyType: {
				type: String,
				default: ''
			},
			inputDebounceSet: {
				type: Object,
				default () {
					return {
						openInputDebounce: true,
						delay: 500
					};
				}
			},
			textareaHeight: {
				type: [String, Number],
				default: 12
			},
			textareaWidth: {
				type: [String, Number],
				default: 80
			},
			textareaBackgroundColor: {
				type: String,
				default: '#f8f8f8'
			},
			border: {
				type: [String,Boolean],
				default: true
			},
			...props
		},
		computed: {
			getHeight() {
				return Number(this.textareaHeight)/100*_app.Sys.screenHeight;
			}
		},
		data() {
			return {
				focusBl: this.focus,
				inputDebounce: {}
			}
		},
		watch: {
			itemDisabled(n, o) {
				if (n && this.focusBl) {
					uni.hideKeyboard();
					this.blurChange();
				}
			},
			value(n, o) {
				console.log('value改变了， 改变之前:' + o + ',改变之后:' + n)
			}
		},
		methods: {
			inputs_change({
				detail: {
					value
				}
			} = {}) { // 用户输入时，根据index赋值
				//_app.log(e.detail.value);
				// _app.log(index);
				const inputDebounce = this.inputDebounce;
				if (this.inputDebounceSet.openInputDebounce) {
					if (inputDebounce.debounce) clearTimeout(inputDebounce.debounce);
					if (inputDebounce.debounceTime && new Date().getTime() - inputDebounce.debounceTime < (
							this.inputDebounceSet.delay || 500)) {
						_app.log('防抖冲突,立即执行')
						this.inputs_changeFc(value, true);
					} else {
						inputDebounce.debounce = setTimeout(() => {
							_app.log('防抖')
							this.inputs_changeFc(value);
						}, this.inputDebounceSet.delay || 500);
					}
				} else {
					_app.log('无防抖')
					this.inputs_changeFc(value);
				}
			},
			inputs_changeFc(value, clash) {
				const inputDebounce = this.inputDebounce;
				if (this.inputDebounceSet.openInputDebounce) {
					if (clash) inputDebounce.debounceTime = 0;
					else inputDebounce.debounceTime = new Date().getTime();
				}
				if (this.filterFc && typeof(this.filterFc) == 'function') { //有filterFc则过滤
					this.input_filter_change(value, this.filterFc);
				} else if (this.filterType && _app.filterTypeObj[this.filterType] && typeof(_app.filterTypeObj[this.filterType]) ==
					'function') {
					this.input_filter_change(value, _app.filterTypeObj[this.filterType]);
				} else {
					this.setValue(value);
				}
			},
			input_filter_change(value, filterFc) {
				const val = filterFc(value);
				if(val != value) {
					new Promise((reslove,reject)=>{
						this.setValue(' ');
						reslove();
					})
					.then(()=>{
						// setTimeout(()=>{
							this.setValue(val);
						// }, 10)
					})
				}else{
					this.setValue(val);
				}
			},
			focusChange(e) {
				if (!this.itemDisabled) this.focusBl = true;
				this.$emit('focus', e);
			},
			blurChange(e) {
				this.focusBl = false;
				this.$emit('blur', e);
			},
			linechange(e) {
				this.$emit('linechange', e);
			}
		},
		mixins: [QSInputsMixin({
			QSInputsType: _app.typeObj.textarea
		})]
	};
</script>

<style lang="scss" scoped>
	@import "../../css/QS-inputs-split/inputs.css";
	.textarea{
		transition: border-color .6s;
		padding: 20rpx;
	}
</style>
