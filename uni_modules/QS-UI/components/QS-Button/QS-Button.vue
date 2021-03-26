<template>
	<!-- #ifndef APP-NVUE -->
	<button 
	:id="componentId" 
	class="QS_Button" 
	ref="QSButton"
	:class="getClass" 
	:style="getStyle" 
	:loading="loading" 
	:plain="plain" 
	:open-type="openType" 
	:hover-start-time="hoverStartTime" 
	:hover-stay-time="hoverStayTime" 
	:hover-class="getHoverClass"
	@getuserinfo="getuserinfo($event)" 
	@getphonenumber="getphonenumber($event)" 
	@tap.prevent.stop="handleClick($event)"
	v-if="getClass && getStyle">
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<view 
	:id="componentId" 
	class="QS_Button" 
	ref="QSButton"
	:class="getClass" 
	:style="getStyle"
	:hover-class="getHoverClass"
	@touchstart="touchstart"
	@touchend="touchend"
	@tap.prevent.stop="handleClick($event)"
	v-if="getClass && getStyle">
	<!-- #endif -->
		<block v-if="preIconType">
			<view class="icon">
				<QSIcons ref="icon" :hasAnimation="!!iconAnimationType" :animationType="iconAnimationType" :type="preIconType"
				 :color="getPreIconColor" :fontSize="getCurFontSize"></QSIcons>
			</view>
		</block>
		<!-- #ifdef APP-NVUE -->
		<text :style="textStyle">{{txt || $slots.default[0].children[0].text || ''}}</text>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<block v-if="txt">
			<text :style="textStyle">
				{{txt}}
			</text>
		</block>
		<block v-else>
			<text :style="textStyle">
				<slot></slot>
			</text>
		</block>
		<view v-if="getWaves" class="waves-ripple" :class="{'z-active':active}" :style="{
			'top': rippleTop + 'px',
			'left': rippleLeft + 'px',
			'width': fields.finalWidth + 'px',
			'height': fields.finalWidth + 'px',
			'background-color':(wavesColor||'rgba(0, 0, 0, .15)')
		}">
		</view>
		<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	</button>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	</view>
	<!-- #endif -->
</template>

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Button/js/props.js';
	import QSIcons from '../QS-Icons/QS-Icons.vue';
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	import styleObj2String from '../../js/functions/styleObj2String.js';
	import classObj2String from '../../js/functions/classObj2String.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-Button' });
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
				default: ''
			},
			setTimeoutClick: {
				type: [String, Boolean],
				default: false
			},
			iconAnimationType: {
				type: String,
				default: ''
			},
			height: {
				type: [String, Number],
				default: ''
			},
			...props
		},
		data() {
			return {
				rippleTop: 0,
				rippleLeft: 0,
				fields: {},
				active: Boolean,
				query: null,
				touch: false
			}
		},
		computed: {
			getWaves() {
				return String(this.waves) === 'true';
			},
			QS_nCompClass() {
				return `${classObj2String([
					this.plain?'':'no-plain',
					'QS_Button-size-' + this.size,
				])} ${classObj2String(this.compClass.button)}`;
			},
			getCurFontSize() {
				let size;
				switch(this.size) {
					case 'large':
						size = `${this.getFontSize + 2}px`;
						break;
					case 'mini':
						size = `${this.getFontSize - 2}px`;
						break;
					default:
						size = `${this.getFontSize}px`;
						break;
				}
				return size;
			},
			getHeight() {
				if(this.height) return this.height;
				let addHeight;
				switch(this.size) {
					case 'large':
						addHeight = `${this.getFontSize + 4}px`;
						break;
					case 'mini':
						addHeight = `${this.getFontSize}px`;
						break;
					default:
						addHeight = `${this.getFontSize + 2}px`;
						break;
				}
				return (this.getFontSize + rpxUnit2px(addHeight) + 'px')
			},
			QS_nCompStyle() {
				const style =  {};
				// #ifdef MP-ALIPAY || APP-NVUE
				style.height = this.getHeight;
				// #endif
				style.lineHeight = this.getHeight;
				if(this.plain) {
					// #ifndef APP-NVUE
					style.border = `1px solid ${this.themes[`${this.theme}${this.disabled?'Disabled':''}`]}`;
					style.background = 'rgba(0,0,0,0)';
					// #endif
					// #ifdef APP-NVUE
					style['border-style'] = 'solid';
					style['border-width'] = '1px';
					// style['border-color'] = this.themes[`${this.theme}${this.disabled?'Disabled':''}`];
					style['background-color'] = 'rgba(0,0,0,0)';
					if(this.disabled) {
						style['border-color'] = this.themes[`${this.theme}Disabled`]
					}else if(this.touch) {
						style['border-color'] = this.themes[`${this.theme}Hover`]
					}else{
						style['border-color'] = this.themes[this.theme]
					}
					// #endif
				}else{
					// #ifndef APP-NVUE
					style.background = this.background || this.themes[`${this.theme}${this.disabled?'Disabled':''}`];
					style.border = `none`;
					// #endif
					// #ifdef APP-NVUE
					style['border-width'] = '1px';
					style['border-style'] = 'solid';
					style['border-color'] = 'rgba(0,0,0,0)';
					if(this.background) {
						style['background-color'] = this.background
					}else{
						if(this.disabled) {
							style['background-color'] = this.themes[`${this.theme}Disabled`]
						}else if(this.touch) {
							style['background-color'] = this.themes[`${this.theme}Hover`]
						}else{
							style['background-color'] = this.themes[this.theme]
						}
					}
					// #endif
				}
				return `${styleObj2String(style)};${styleObj2String(this.compStyle.button)}`
			},
			textStyle() {
				const style =  {};
				style.fontSize = this.getCurFontSize;
				style.lineHeight = this.getHeight;
				if(this.plain) {
					style.color = this.themes[`${this.theme}ColorPlain`];
				}else{
					style.color = this.themes[`${this.theme}Color`];
				}
				return `${styleObj2String(style)}`
			},
			getPreIconColor() {
				if(this.preIconColor) return this.preIconColor
				if(this.plain) {
					return this.themes[`${this.theme}ColorPlain`];
				}
				
				return this.themes[`${this.theme}Color`];
			},
			getHoverClass() {
				if(this.getWaves) return '';
				if(this.hoverClass) return this.hoverClass;
				return `QS-hover-${this.theme}${this.plain?'-plain':''}`
			}
		},
		methods: {
			// #ifdef APP-NVUE
			touchstart() {
				this.touch = true;
			},
			touchend() {
				this.touch = false;
			},
			// #endif
			handleClick(e) {
				this.active = false;
				if (this.disabled) {
					if(this.iconAnimationType) {
						this.$refs.icon.shook();
					}
					return;
				}
				if (this.iconAnimationType) this.$refs.icon[this.iconAnimationType]();
				// #ifndef APP-NVUE
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
				// #endif
				// #ifdef APP-NVUE
				this.$emit('click');
				// #endif
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
					id = '#' + this.componentId;
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

<style scoped>
	@import "@/QS-UI-CONFIG/css/theme.css";
	
	.QS_Button {
		position: relative;
		overflow: hidden;
		margin: 0;
		text-align: center;
		border-radius: 5px;
		padding-top: 0;
		padding-bottom: 0;
		padding-left: 15px;
		padding-right: 15px;
		transition-property: background-color;
		transition-duration: .3s;
		/* #ifndef APP-NVUE */
		border: none;
		white-space: nowrap;
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		/* #endif */
		/* #ifdef APP-NVUE */
		border-width: 1px;
		border-style: solid;
		border-color: rgba(0,0,0,0);
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		/* #endif */
	}
	
	/* #ifndef APP-NVUE */
	.no-plain::after {
		border: none;
	}
	/* #endif */
	/* #ifdef APP-NVUE */
	.no-plain {
		/* border-style: solid;
		border-width: 1px;
		border-color: rgba(255,255,255,0); */
	}
	/* #endif */
		
	.QS_Button-size-mini {
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */
	}
		
	/* #ifndef APP-NVUE */
	.waves-ripple {
		position: absolute;
		border-radius: 9999999px;
		background-clip: padding-box;
		pointer-events: none;
		user-select: none;
		transform: scale(0);
		opacity: 1;
	}
	.waves-ripple.z-active {
		opacity: 0;
		transform: scale(2);
		transition-property: opacity, transform;
		transition-duration: 1.2s;
	}
	/* #endif */
	
	.icon{
		margin-right: 5px;
	}
	.btn_icon {
		margin: 5px;
	}
	
</style>
