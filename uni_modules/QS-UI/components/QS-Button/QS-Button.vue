<template>
	<button 
	:id="preId" 
	class="QS_Button" 
	:class="getClass" 
	:style="getStyle" 
	:loading="loading" 
	:plain="plain" 
	:form-type="formType"
	:open-type="openType" 
	:hover-start-time="hoverStartTime" 
	:hover-stay-time="hoverStayTime" 
	:hover-class="getHoverClass"
	@getuserinfo="getuserinfo($event)" 
	@getphonenumber="getphonenumber($event)" 
	@tap.prevent.stop="handleClick($event)"
	v-show="getClass && getStyle">
		<block v-if="preIconType">
			<QSIcons ref="icon" :hasAnimation="!!iconAnimationType" :animationType="iconAnimationType" :type="preIconType"
			 :color="preIconColor" :size="preIconSize"></QSIcons>
			<view style="width: 15rpx;"></view>
		</block>
		<block v-if="txt">
			{{txt}}
		</block>
		<block v-else>
			<slot></slot>
		</block>
		<view v-if="getWaves" class="waves-ripple" :class="{'z-active':active}" :style="{
			'top': rippleTop + 'px',
			'left': rippleLeft + 'px',
			'width': fields.finalWidth + 'px',
			'height': fields.finalWidth + 'px',
			'background-color':(wavesColor||'rgba(0, 0, 0, .15)')
		}">
		</view>
	</button>
</template>

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-BackTop/js/props.js';
	import QSIcons from '../QS-Icons/QS-Icons.vue';
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-Button' });
	var QSButton_preId = 0;
	export default {
		mixins: [QSComponentMixinRes.mixin],
		components: {
			QSIcons
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			waves: {
				type: [String, Boolean],
				default: true
			},
			borderRadius: {
				type: [String, Number],
				default: '10rpx'
			},
			height: {
				type: [String, Number],
				default: ''
			},
			width: {
				type: [String, Number],
				default: ''
			},
			backgroundColor: {
				type: String,
				default: ''
			},
			txt: {
				type: String,
				default: ''
			},
			wavesColor: {
				type: String,
				default: ''
			},
			theme: {
				type: String,
				default: 'default'
			},
			size: {
				type: String,
				default: 'default'
			},
			fontSize: {
				type: [String, Number],
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			plain: {
				type: Boolean,
				default: false
			},
			formType: {
				type: String,
				default: ''
			},
			openType: {
				type: String,
				default: ''
			},
			hoverStartTime: {
				type: Number,
				default: 20
			},
			hoverStayTime: {
				type: Number,
				default: 70
			},
			hoverClass: {
				type: String,
				default: ''
			},
			preIconType: {
				type: String,
				default: ''
			},
			preIconColor: {
				type: String,
				default: '#ffffff'
			},
			preIconSize: {
				type: String,
				default: '30rpx'
			},
			setTimeoutClick: {
				type: [String, Boolean],
				default: false
			},
			padding: {
				type: String,
				default: ''
			},
			background: {
				type: String,
				default: ''
			},
			border: {
				type: String,
				default: ''
			},
			iconAnimationType: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
			fontWeight: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				preId: 'QS_Button' + QSButton_preId++,
				rippleTop: 0,
				rippleLeft: 0,
				fields: {},
				active: Boolean,
				query: null,
			}
		},
		computed: {
			getWaves() {
				return String(this.waves) === 'true';
			},
			QS_nCompClass() {
				return Object.freeze([
					'QS_Button--' + this.theme,
					'QS_Button-size-' + this.size,
					this.plain ? 'QS_Button--' + this.theme + '--plain' : 'not-plain',
					// this.plain ? 'QS_Button--border' : '',
					this.disabled ? 'QS_Button--' + this.theme + '--disabled' : '',
				]);
			},
			getFontSize() {
				if(this.fontSize) return this.fontSize;
				let size;
				switch(this.size) {
					case 'large':
						size = '34rpx';
						break;
					case 'mini':
						size = '26rpx';
						break;
					default:
						size = '30rpx';
						break;
				}
				return size;
			},
			getHeight() {
				if(this.height) return this.height;
				let addHeight;
				switch(this.size) {
					case 'large':
						addHeight = '35rpx';
						break;
					case 'mini':
						addHeight = '26rpx';
						break;
					default:
						addHeight = '30rpx';
						break;
				}
				return (rpxUnit2px(this.getFontSize) + rpxUnit2px(addHeight) + 'px')
			},
			QS_nCompStyle() {
				let style = {};
				if (this.borderRadius) style.borderRadius = this.borderRadius;
				if (this.width) style.width = this.width;
				if (this.backgroundColor) style.backgroundColor = this.backgroundColor;
				if (this.padding) style.padding = this.padding;
				if (this.background) style.background = this.background;
				if (this.border) style.border = this.border;
				if (this.color) style.color = this.color;
				if (this.fontWeight) style.fontWeight = this.fontWeight;
				style.fontSize = this.getFontSize;
				// style.height = this.getHeight;
				style.lineHeight = this.getHeight;
				return Object.freeze(style);
			},
			getHoverClass() {
				if(this.getWaves) return '';
				if(this.hoverClass) return this.hoverClass;
				return `QS-hover-${this.theme}${this.plain?'-plain':''}`
			}
		},
		methods: {
			handleClick(e) {
				this.active = false;
				if (this.disabled) {
					if(this.iconAnimationType) {
						this.$refs.icon.shook();
					}
					return;
				}
				if (this.iconAnimationType) this.$refs.icon[this.iconAnimationType]();
				this.$nextTick(() => {
					if (this.getWaves) this.activeFc(e);
					if (String(this.setTimeoutClick) === 'true') {
						setTimeout(() => {
							this.$emit('click');
						}, 500);
					} else {
						this.$emit('click');
					}
				})
			},
			activeFc(e) {
				// console.log('点击事件:' + JSON.stringify(e));
				this.getFields().then(res => {
					// console.log('得到数据:' + JSON.stringify(data));
					let data = res[0]
					if (!data.height) return;
					data.finalWidth = (data.height > data.width ? data.height : data.width);
					if (!data.finalWidth) return;
					this.fields = data;
					let touchesX;
					let touchesY;
					// #ifdef MP-BAIDU
					touchesX = e.changedTouches[0].clientX;
					touchesY = e.changedTouches[0].clientY;
					// #endif
					// #ifdef MP-ALIPAY
					touchesX = e.detail.clientX;
					touchesY = e.detail.clientY;
					// #endif
					// #ifndef MP-BAIDU || MP-ALIPAY
					touchesX = e.touches[0].clientX;
					touchesY = e.touches[0].clientY;
					// #endif
					this.rippleTop = (touchesY - data.top - (data.finalWidth / 2));
					this.rippleLeft = (touchesX - data.left - (data.finalWidth / 2));
					this.$nextTick(() => {
						// setTimeout(()=>{	//若不能生成波纹请把setTimeout的注释打开
						this.active = true;
						// }, 10)
					})
				})
			},
			getFields() {
				return new Promise(rs => {
					let Query;
					let id;
					// #ifdef MP-ALIPAY
					Query = uni.createSelectorQuery();
					id = '#' + this.preId;
					// #endif
					// #ifndef MP-ALIPAY
					Query = uni.createSelectorQuery().in(this);
					id = '.QS_Button';
					// #endif
					Query.select(id).fields({
						size: true,
						rect: true
					});
					Query.exec((data) => {
						// console.log(data);
						if (data[0] === null) {
							this.retryGetFields().then(res => {
								if (data[0] === null) {
									rs([{}]);
									return;
								}
								rs(res)
							});
							return;
						}
						rs(data)
					});
				})
			},
			retryGetFields() { // 目前应该不用
				return new Promise(rs => {
					let Query = uni.createSelectorQuery();
					Query.select('#QS_Button').fields({
						size: true,
						rect: true
					});
					Query.exec((data) => {
						// console.log('返回节点信息:' + JSON.stringify(data))
						rs(data)
					});
				})
			},
			getuserinfo(e) {
				this.$emit('getuserinfo', e)
			},
			getphonenumber(e) {
				this.$emit('getphonenumber', e)
			}
		}

	}
</script>

<style scoped lang="scss">
	@import "@/QS-UI-CONFIG/css/theme.scss";
	.QS_Button {
		position: relative;
		overflow: hidden;
		border: none;
		margin: 0;
		text-align: center;
		border-radius: 10rpx;
		white-space: nowrap;
		padding-top: 0;
		padding-bottom: 0;
		padding-left: 30rpx;
		padding-right: 30rpx;
		border-width: 1px;
		border-style: solid;
		// ios overflow 在父级设置圆角、定位、子元素使用transform时 hidden失效问题
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		&.not-plain{
			&:after{
				border: none;
			}
		}
		// &--border {
		// 	border: 1px solid #ffffff;
		// }
		
		
		&--default {
			color: $qs-theme-default-color;
			background-color: $qs-theme-default;
			border-color: $qs-theme-default;
		}
		&--default--disabled {
			color: $qs-theme-default-color;
			background-color: $qs-theme-default-disabled;
			border-color: $qs-theme-default-disabled;
		}
		&--default--plain {
			color: $qs-theme-default-color-plain;
			background-color: rgba(255,255,255,0);
			border-color: $qs-theme-default;
		}

		&--primary {
			color: $qs-theme-primary-color;
			background-color: $qs-theme-primary;
			border-color: $qs-theme-primary;
		}
		&--primary--disabled {
			color: $qs-theme-primary-color;
			background-color: $qs-theme-primary-disabled;
			border-color: $qs-theme-primary-disabled;
		}
		&--primary--plain {
			color: $qs-theme-primary-color-plain;
			background-color: rgba(255,255,255,0);
			border-color: $qs-theme-primary;
		}

		&--success {
			color: $qs-theme-success-color;
			background-color: $qs-theme-success;
			border-color: $qs-theme-success;
		}
		&--success--disabled {
			color: $qs-theme-success-color;
			background-color: $qs-theme-success-disabled;
			border-color: $qs-theme-success-disabled;
		}
		&--success--plain {
			color: $qs-theme-success-color-plain;
			background-color: rgba(255,255,255,0);
			border-color: $qs-theme-success;
		}

		&--warning {
			color: $qs-theme-warning-color;
			background-color: $qs-theme-warning;
			border-color: $qs-theme-warning;
		}
		&--warning--disabled {
			color: $qs-theme-warning-color;
			background-color: $qs-theme-warning-disabled;
			border-color: $qs-theme-warning-disabled;
		}
		&--warning--plain {
			color: $qs-theme-warning-color-plain;
			background-color: rgba(255,255,255,0);
			border-color: $qs-theme-warning;
		}
		
		&--danger {
			color: $qs-theme-danger-color;
			background-color: $qs-theme-danger;
			border-color: $qs-theme-danger;
		}
		&--danger--disabled {
			color: $qs-theme-danger-color;
			background-color: $qs-theme-danger-disabled;
			border-color: $qs-theme-danger-disabled;
		}
		&--danger--plain {
			color: $qs-theme-danger-color-plain;
			background-color: rgba(255,255,255,0);
			border-color: $qs-theme-danger;
		}

		&.QS_Button-size-mini {
			display: inline-block;
		}
	}

	.waves-ripple {
		position: absolute;
		border-radius: 100%;
		background-clip: padding-box;
		pointer-events: none;
		user-select: none;
		transform: scale(0);
		opacity: 1;
	}

	.waves-ripple.z-active {
		opacity: 0;
		transform: scale(2);
		transition: opacity 1.2s ease-out, transform 0.6s ease-out;
	}

	.btn_icon {
		margin: 5px;
	}
	
	.QS-hover-default{
		background-color: $qs-theme-default-hover !important;
	}
	.QS-hover-default-plain {
		border-color: $qs-theme-default-plain-hover !important;
	}
	
	.QS-hover-primary{
		background-color: $qs-theme-primary-hover !important;
	}
	.QS-hover-primary-plain {
		border-color: $qs-theme-primary-plain-hover !important;
	}
	
	.QS-hover-success{
		background-color: $qs-theme-success-hover !important;
	}
	.QS-hover-success-plain {
		border-color: $qs-theme-success-plain-hover !important;
	}
	
	.QS-hover-warning{
		background-color: $qs-theme-warning-hover !important;
	}
	.QS-hover-warning-plain {
		border-color: $qs-theme-warning-plain-hover !important;
	}
	
	.QS-hover-danger{
		background-color: $qs-theme-danger-hover !important;
	}
	.QS-hover-danger-plain {
		border-color: $qs-theme-danger-plain-hover !important;
	}
</style>
