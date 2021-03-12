<template>
	<QStemplate :compClass="compClass" :compStyle="compStyle" :title="title" :titleHide="titleHide" :fontSize="fontSize" :width="width" :titleFlex="titleFlex"
	 :contentFlex="contentFlex" :titleStyle="titleStyle" :contentStyle="contentStyle" :required="required" :requiredSign="requiredSign"
	 :layout="layout" :titleLayout="titleLayout" :itemDisabled="itemDisabled" :titleColor="titleColor">
		<view 
		class="QS flex_row_none_c transition_point6s width100 padding-rpx_10_15" 
		:style="{
			'border-radius': borderRadius,
			'background-color': backgroundColor,
			'border-bottom': botLine?('1px solid ' + (focusBl?(focusBorderColor||'#999'):(blurBorderColor||'#f2f2f2'))): 'none'
		}">
			<view class="flex_row_none_c Flex5">
				<view class="Flex1" v-if="leftIcon">
					<view class="flex_row_c_c width100">
						<QSIcons :type="leftIcon" :size="iconSize" :color="leftIconColor||'#999'"></QSIcons>
					</view>
				</view>
				<view class="Flex5 position_relative">
					<input 
					:type="inputType||'text'" 
					:value="value" 
					@input="inputs_change($event)" 
					:placeholder="placeholder||('请输入' + title)"
					 :password="passwordBl" 
					 :disabled="disabled"
					 :placeholder-style="placeholder_style" 
					 :placeholder-class="placeholder_class"
					 :maxlength="getMaxlength" 
					 :cursor-spacing="getCursor_spacing"
					 :confirm-type="confirm_type"
					 :confirm-hold="confirm_hold" 
					 :selection-start="getSelection_start" 
					 :selection-end="getSelection_end"
					 :cursor="getCursor" 
					 :adjust-position="getAdjust_position"
					 :style="{'textAlign': textAlign, 'font-size': fontSize + 'rpx', 'opacity': itemDisabled?0:1, color: fontColor}"
					 :focus="focusBl" 
					 class="width100"
					  @focus="focusChange()" 
					  @blur="blurChange()">
					 </input>
					 <view class="inputItemDis flex_row_none_c" :style="{'font-size': fontSize + 'rpx', color: fontColor}" v-if="itemDisabled">
						{{value || placeholder || ('请输入' + title)}}
					 </view>
				</view>
			</view>
			<view class="Flex1_5" v-if="tapClear">
				<view class="flex_row_c_c width100" v-if="value" @tap.prevent.stop="inputTap('clear')">
					<QSIcons type="clear" :size="iconSize" color="#999999"></QSIcons>
				</view>
			</view>
			<view class="Flex1_5" v-if="password">
				<view class="flex_row_c_c width100" @tap.prevent.stop="inputTap('password')">
					<QSIcons type="eye" :size="iconSize" :color="passwordBl?'#999999':passwordIconColor||'#33cc33'"></QSIcons>
				</view>
			</view>
			<view class="Flex1_5" v-if="customTapIcon">
				<view class="flex_row_c_c width100" @tap.prevent.stop="inputTap('custom')">
					<QSIcons :type="customTapIcon" :size="iconSize" :color="customTapIconColor||'#999'"></QSIcons>
				</view>
			</view>
			<view class="Flex2 flex_row_c_c" v-if="rightButtonTex">
				<button type="primary" size="mini" class="width100 text_nowrap margin_10rpx" :style="'font-size:' + btnSize + 'rpx;' + rightButtonStyle"
				 @tap="inputTap('button')">
					{{rightButtonTex}}
				</button>
			</view>
			<view class="Flex2 flex_row_c_c" v-if="ifCode">
				<button type="primary" size="mini" class="width100 text_nowrap margin_10rpx" :disabled="startCodeBl" :style="'font-size:' + btnSize + 'rpx;' + codeButtonStyle"
				 @tap="getCode()">
					{{startCodeBl?codeCount + 's':'获取验证码'}}
				</button>
			</view>
		</view>
	</QStemplate>
</template>

<script>
	import _app from '../../js/QS-inputs-split/app.js';
	import QSInputsMixin from '../../js/QS-inputs-split/QSInputsMixin.js';
	import QSIcons from '../QS-Icons/QS-Icons.vue';
	import QStemplate from '../QS-InputsSplitTemplate/QS-InputsSplitTemplate.vue';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Input/js/props.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-Input' });

	export default {
		mixins: [
			QSInputsMixin({
				QSInputsType: _app.typeObj.input
			})
		],
		components: {
			QSIcons,
			QStemplate
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			textAlign: {
				type: String,
				default: 'right'
			},
			placeholder_style: {
				type: String,
				default: ''
			},
			placeholder_class: {
				type: String,
				default: 'input-placeholder'
			},
			maxlength: {
				type: [String,Number],
				default: 140
			},
			cursor_spacing: {
				type: [String,Number],
				default: 0
			},
			confirm_type: {
				type: String,
				default: 'done'
			},
			confirm_hold: {
				type: Boolean,
				default: false
			},
			selection_start: {
				type: [String,Number],
				default: -1
			},
			selection_end: {
				type: [String,Number],
				default: -1
			},
			cursor: {
				type: [String,Number],
				default: ''
			},
			adjust_position: {
				type: [Boolean, String],
				default: true
			},
			tapClear: {
				type: Boolean,
				default: false
			},
			inputType: {
				type: String,
				default: 'text'
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
			password: {
				type: Boolean,
				default: false
			},
			passwordIconColor: {
				type: String,
				default: '#33cc33'
			},
			leftIcon: {
				type: String,
				default: ''
			},
			leftIconColor: {
				type: String,
				default: '#999'
			},
			customTapIcon: {
				type: String,
				default: ''
			},
			customTapIconColor: {
				type: String,
				default: '#999'
			},
			rightButtonTex: {
				type: String,
				default: ''
			},
			rightButtonStyle: {
				type: String,
				default: ''
			},
			ifCode: {
				type: Boolean,
				default: false
			},
			codeCountDown: {
				type: [String, Number],
				default: 60
			},
			codeButtonStyle: {
				type: String,
				default: ''
			},
			phoneNum: {
				type: String,
				default: ''
			},
			checkPhoneNum: {
				type: Boolean,
				default: false
			},
			disabled: {
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
			fontColor: {
				type: String,
				default: '#000000'
			},
			botLine: {
				type: Boolean,
				default: false
			},
			backgroundColor: {
				type: String,
				default: ''
			},
			borderRadius: {
				type: String,
				default: ''
			},
			...props
		},
		computed: {
			iconSize() {
				return (this.fontSize + 8) + 'rpx';
			},
			btnSize() {
				return (this.fontSize - 8) + 'rpx';
			},
			getMaxlength() {
				return Number(this.maxlength);
			},
			getCursor_spacing() {
				return Number(this.cursor_spacing);
			},
			getSelection_start() {
				return Number(this.selection_start);
			},
			getSelection_end() {
				return Number(this.selection_end);
			},
			getCursor() {
				return Number(this.cursor);
			},
			getAdjust_position() {
				return Boolean(this.adjust_position);
			}
			
		},
		data() {
			return {
				passwordBl: !!this.password,
				focusBl: this.focus,
				inputDebounce: {},
				userCode: '', //用户输入的验证码
				codeCount: this.codeCountDown || 60, //获取验证码后倒计时时间
				code: '',
				startCodeBl: false //获取验证码状态
			}
		},
		watch: {
			itemDisabled(n, o) {
				if(n && this.focusBl) {
					uni.hideKeyboard();
					this.blurChange();
				}
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
			focusChange() {
				if(!this.itemDisabled) this.focusBl = true;
			},
			blurChange() {
				this.focusBl = false;
			},
			inputTap(type) { //input点击事件
				switch (type) {
					case 'password': //密码显隐
						this.passwordBl = !this.passwordBl
						break;
					case 'clear': //一键清除
						this.setValue('');
						break;
					case 'custom':
						this.inputCustomTapFc();
						break;
					case 'button':
						this.inputCustomTapFc();
						break;
					default:
						_app.showToast('inputTap类型错误');
						break;
				}
			},
			async inputCustomTapFc() {
				try {
					const data = await _app.inputCustomTapFc(this.customId);
					if (data !== undefined && data !== null) {
						this.setValue(data);
					}
				} catch (e) {
					//TODO handle the exception
					const data = await _app.inputCustomTapCatchFc(this.customId, e);
					if (data !== undefined && data !== null) {
						this.setValue(data);
					}
				}
			},
			getCode() { // 判断是否正确输入手机号后发送验证码并倒计时
				let _this = this;
				if (_this.startCodeBl) return;
				if(this.checkPhoneNum) {
					const phone = this.phoneNum;
					if (_app.regTest('Tel', phone)) { //正则判断
						_this.$emit('getCode');
						// _this.code = _app.sendSMS(this.customId, phone);
					} else {
						_app.showToast('请正确输入11位手机号');
						return;
					}
				}else{
					_this.$emit('getCode');
				}

				/* let setInterValFunc = setInterval(() => { //定时器
					if (_this.codeCount > 0)
						--_this.codeCount;
					else {
						_this.startCodeBl = false;
						clearInterval(setInterValFunc);
						_this.code = '';
						_this.codeCount = this.codeCountDown;
					}
				}, 1000)
				_this.startCodeBl = true; */
			},
			startCode() {
				let _this = this;
				if(_this.startCodeBl) return;
				let setInterValFunc = setInterval(() => { //定时器
					if (_this.codeCount > 0)
						--_this.codeCount;
					else {
						_this.startCodeBl = false;
						clearInterval(setInterValFunc);
						_this.code = '';
						_this.codeCount = this.codeCountDown;
					}
				}, 1000)
				_this.startCodeBl = true;
			},
			/* checkCode(cb) {
				let result = false;
				let msg = '';
				if (this.ifCode) {
					if (!this.code) {
						msg = '请先获取验证码';
					} else if (!this.value) {
						msg = '请填写验证码';
					} else if (this.value !== this.code) {
						msg = '验证码不正确';
						this.code = '';
						this.setValue('');
					} else {
						result = true;
						msg = '验证通过';
					}
				} else {
					result = true;
					msg = '未启用验证码功能';
				}

				const obj = {
					result,
					msg
				};
				if (cb && typeof(cb) === 'function') {
					cb(obj);
				} else {
					return obj;
				}
			} */
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../css/QS-inputs-split/inputs.css";
</style>
