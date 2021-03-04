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
	:hover-start-time="hoverStartTime||20" 
	:hover-stay-time="hoverStayTime||70" 
	:hover-class="hoverClass||'button-hover'"
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
	const QSComponentMixinRes = QSComponentMixin();
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
			type: {
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
				default: 'button-hover'
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
				return [
					'QS_Button--' + this.type,
					'QS_Button-size-' + this.size,
					this.plain ? 'QS_Button--' + this.type + '--plain' : 'not-plain',
					this.plain ? 'QS_Button--border' : '',
					this.disabled ? 'QS_Button--' + this.type + '--disabled' : '',
				];
			},
			QS_nCompStyle() {
				let style = {};
				if (this.borderRadius) style.borderRadius = this.borderRadius;
				if (this.height) style.height = this.height;
				if (this.width) style.width = this.width;
				if (this.backgroundColor) style.backgroundColor = this.backgroundColor;
				if (this.fontSize) style.fontSize = this.fontSize;
				if (this.padding) style.padding = this.padding;
				if (this.background) style.background = this.background;
				if (this.border) style.border = this.border;
				if (this.color) style.color = this.color;
				if (this.fontWeight) style.fontWeight = this.fontWeight;
				return style;
			}
		},
		methods: {
			handleClick(e) {
				this.active = false;
				if (this.disabled && this.iconAnimationType) {
					this.$refs.icon.shook();
					this.$emit('disabledClick');
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
	.QS_Button {
		position: relative;
		overflow: hidden;
		border: none;
		margin: 0;
		// padding: 15rpx 20rpx;
		font-size: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		white-space: nowrap;
		line-height: 1;
		// ios overflow 在父级设置圆角、定位、子元素使用transform时 hidden失效问题
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		&.not-plain{
			&:after{
				border: none;
			}
		}
		&--border {
			border: 1px solid #ffffff;
		}
		&--default {
			background-color: $qs-btn-type-default;
		}

		&--main {
			color: #FFFFFF;
			background-color: $qs-btn-type-main;
		}

		&--primary {
			color: #FFFFFF;
			background-color: $qs-btn-type-primary;
		}

		&--warning {
			color: #FFFFFF;
			background-color: $qs-btn-type-warning;
		}

		&--default--disabled {
			color: #ffffff;
			background-color: $qs-btn-type-default-disabled;
		}

		&--main--disabled {
			color: #ffffff;
			background-color: $qs-btn-type-main-disabled;
		}

		&--primary--disabled {
			color: #ffffff;
			background-color: $qs-btn-type-primary-disabled;
		}

		&--warning--disabled {
			color: #ffffff;
			background-color: $qs-btn-type-warning-disabled;
		}

		&--default--plain {
			color: $qs-btn-type-default;
			background-color: $qs-btn-type-default-plain;
			border-color: $qs-btn-type-default;
		}

		&--main--plain {
			color: $qs-btn-type-main;
			background-color: $qs-btn-type-default-plain;
			border-color: $qs-btn-type-main;
		}

		&--primary--plain {
			color: $qs-btn-type-primary;
			background-color: $qs-btn-type-default-plain;
			border-color: $qs-btn-type-primary;
		}

		&--warning--plain {
			color: $qs-btn-type-main;
			background-color: $qs-btn-type-default-plain;
			border-color: $qs-btn-type-main;
		}

		&.QS_Button-size-default {
			font-size: 30rpx;
			padding: 20rpx 30rpx;
			display: block;
		}

		&.QS_Button-size-mini {
			font-size: 26rpx;
			padding: 10rpx 25rpx;
			display: inline-block;
		}

		&.QS_Button-size-large {
			font-size: 34rpx;
			height: 75rpx;
			padding: 30rpx 60rpx;
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
</style>
