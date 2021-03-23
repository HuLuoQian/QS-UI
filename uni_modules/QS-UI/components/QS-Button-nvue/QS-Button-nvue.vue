<template>
	<button class="QS_Button" type="default" :style="getStyle"
	@tap.prevent.stop="handleClick($event)">
		<text :style="textStyle">{{$slots.default[0].children[0].text}}</text>
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
	import store from '../../js/store/index.js';
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	import styleObj2String from '../../js/functions/styleObj2String.js';
	import classObj2String from '../../js/functions/classObj2String.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-Button-nvue' });
	export default {
		mixins: [QSComponentMixinRes.mixin],
		props: {
			theme: {
				type: String,
				default: 'primary'
			},
		},
		data() {
			return {
				rippleTop: 0,
				rippleLeft: 0,
				fields: {},
			}
		},
		computed: {
			themes() {
				return store.getters['theme/theme'];
			},
			getWaves() {
				return true;
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
				style.fontSize = this.getCurFontSize;
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
					style['border-style'] = 'solide';
					style['border-width'] = '1px';
					style['border-color'] = this.themes[`${this.theme}${this.disabled?'Disabled':''}`];
					style.backgroundColor = 'rgba(0,0,0,0)';
					// #endif
					style.color = this.themes[`${this.theme}ColorPlain`];
				}else{
					// #ifndef APP-NVUE
					style.background = this.background || this.themes[`${this.theme}${this.disabled?'Disabled':''}`];
					// #endif
					// #ifdef APP-NVUE
					style.backgroundColor = this.background || this.themes[`${this.theme}${this.disabled?'Disabled':''}`];
					// #endif
					style.border = `none`;
					style.color = this.themes[`${this.theme}Color`];
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
				console.log('点击事件:' + JSON.stringify(e));
				this.getFields().then(res => {
					console.log('得到数据:' + JSON.stringify(data));
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
						console.log(data);
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
						console.log('返回节点信息:' + JSON.stringify(data))
						rs(data)
					});
				})
			},
		}
		
	}
</script>

<style scoped>
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
		border-width: 1px;
		border-style: solid;
		/* #ifndef APP-NVUE */
		border: none;
		white-space: nowrap;
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		transition-property: background-color;
		transition-duration: .3s;
		/* #endif */
	}
	
	.waves-ripple {
		position: absolute;
		border-radius: 9999999px;
		/* #ifndef APP-NVUE */
		background-clip: padding-box;
		pointer-events: none;
		user-select: none;
		/* #endif */
		transform: scale(0);
		opacity: 1;
	}
	.z-active {
		opacity: 0;
		transform: scale(2);
		transition-property: opacity, transform;
		transition-duration: 1.2s;
	}
	
	.btn_icon {
		margin: 5px;
	}
</style>
