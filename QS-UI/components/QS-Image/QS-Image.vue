<template>
	<view 
	:class="getClass"
	
	:style="getStyle"
	
	:class="imgLoadSuccess?'':'backgrounColor_f8f8f8'">
		<text class="imgStatusStyle" :style="{ fontSize: textFontSize }" v-if="!imgLoadSuccess">
			{{imgStatusText}}
		</text>
		<image 
		:src="src" 
		:mode="mode"
		:show-menu-by-longpress="String(showMenuByLongpress)==='true'"
		:style="getItemStyle"
		@error="error"
		@load="load"
		 :class=" imgLoadSuccess?animationType + '_loaded':animationType" 
		></image>
		<view 
		class="QS-Image--slot"
		:style="getItemStyle" v-if="String(hasCustomEl) === 'true'">
			<template v-if="String(useSlot) === 'true'">
				<slot></slot>
			</template>
			<template v-else>
				<separate 
				:type="type" 
				:slotData="slotData"></separate>
			</template>
		</view>
	</view>
</template>

<script>
	import separate from '@/QS-UI-CONFIG/components/QS-Image/separate/separate.vue';
	import rpxUnit2px from '@/QS-UI/js/functions/rpxUnit2px.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Image/js/props.js';
	const QSComponentMixinRes = QSComponentMixin();
	
	const loading = '图片加载中';
	const nullImg = '图片路径为空';
	const loadErr = '加载失败\r\n点击重试';
	const errPlaceholder = 'errPlaceholder';
	const isErr = 2;
	const isLoading = 1;
	export default {
		mixins: [QSComponentMixinRes.mixin],
		components: {
			separate
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			useSlot: {
				type: [String, Boolean],
				default: false
			},
			slotData: {
				type: [String, Number, Boolean, Object, Array],
				default: ()=>undefined
			},
			type: {
				type: String,
				default: ''
			},
			width: {
				type: [String, Number],
				default: '300px'
			},
			height: {
				type: [String, Number],
				default: '225px'
			},
			borderRadius: {
				type: [String, Number],
				default: ''
			},
			backgroundColor: {
				type: String,
				default: ''
			},
			src: {
				type: String,
				default: ''
			},
			mode: {
				type: String, 
				default: 'scaleToFill'
			},
			showMenuByLongpress: {
				type: [String, Boolean],
				default: false
			},
			hasCustomEl: {
				type: [Boolean, String],
				default: false
			},
			textFontSize: {
				type: String,
				default: '26rpx'
			},
			animationType: {
				type: String,
				default: 'fadIn'
			},
			...props
		},
		created() {
			this.init();
		},
		data() {
			return {
				nWidth: 0,
				nHeight: 0,
				imagePath: '',
				imgLoadSuccess: false,
				imgStatusText: '',
				imgStatus: 0 // 0: 无
			}
		},
		computed: {
			QS_nCompClass() {
				return 'QS QS-Image';
			},
			QS_nCompStyle() {
				let style = {};
				if(this.width) style.width = this.nWidth?`${this.nWidth}px`:this.width;
				if(this.height) style.height = this.nHeight?`${this.nHeight}px`:this.height;
				if(this.borderRadius) style['border-radius'] = this.borderRadius;
				if(this.backgroundColor) style['background-color'] = this.backgroundColor;
				return style;
			},
			getItemStyle() {
				let style = {};
				if(this.width) style.width = this.nWidth?`${this.nWidth}px`:this.width;
				if(this.height) style.height = this.nHeight?`${this.nHeight}px`:this.height;
				if(this.borderRadius) style['border-radius'] = this.borderRadius;
				return style;
			}
		},
		methods: {
			init() {
				this.imgLoadSuccess = false;
				if (this.imageUrl) {
					this.imgStatusText = loading;
					this.imagePath = this.imageUrl;
				} else {
					this.imgStatusText = nullImg;
				}
			},
			error(e) {
				this.changeStatus('error');
				this.$emit('error', e);
			},
			load(e) {
				console.log('图片加载',e);
				let pxValue;
				switch (this.mode){
					case 'widthFix':
						pxValue = rpxUnit2px(this.width);
						this.nWidth = pxValue;
						this.nHeight = pxValue/e.detail.width * e.detail.height;
						break;
					// #ifdef APP-PLUS || H5
					case 'heightFix':
						pxValue = rpxUnit2px(this.height);
						this.nHeight = pxValue;
						this.nWidth = pxValue/e.detail.height * e.detail.width;
						break;
					// #endif
					default:
						this.nWidth = this.width;
						this.nHeight = this.height;
						break;
				}
				this.changeStatus('success');
				this.$emit('load', e);
			},
			changeStatus(type) {
				switch (type) {
					case 'loading':
						this.checkimgLoadSuccessFalse();
						this.imgStatusText = loading;
						this.imgStatus = isLoading;
						break;
					case 'error':
						this.checkimgLoadSuccessFalse();
						if (this.imagePath !== errPlaceholder) {
							this.imgStatusText = loadErr;
							this.imgStatus = isErr;
						}
						break;
					case 'success':
						this.imgLoadSuccess = true;
						break;
				}
			},
			checkimgLoadSuccessFalse() {
				if (this.imgLoadSuccess)
					this.imgLoadSuccess = false
			},
			tryReLoad() {
				if (this.imgLoadSuccess) return;
				if (this.imgStatus === isErr && this.imagePath !== errPlaceholder) {
					this.imagePath = errPlaceholder;
					setTimeout(() => {
						this.changeStatus('loading');
						this.imagePath = this.imageUrl;
					}, 100);
				}
			},
			onTap() {
				if (this.passClick) {
					this.$emit('click');
					if (!this.imgLoadSuccess)
						this.tryReLoad();
				} else {
					if (this.imgLoadSuccess) {
						this.$emit('click');
					} else {
						this.tryReLoad();
					}
				}
			},
			// error(e) {
			// 	this.$emit('error', e);
			// },
			// load(e) {
			// 	console.log('图片加载',e);
			// 	let pxValue;
			// 	switch (this.mode){
			// 		case 'widthFix':
			// 			pxValue = rpxUnit2px(this.width);
			// 			this.nWidth = pxValue;
			// 			this.nHeight = pxValue/e.detail.width * e.detail.height;
			// 			break;
			// 		// #ifdef APP-PLUS || H5
			// 		case 'heightFix':
			// 			pxValue = rpxUnit2px(this.height);
			// 			this.nHeight = pxValue;
			// 			this.nWidth = pxValue/e.detail.height * e.detail.width;
			// 			break;
			// 		// #endif
			// 		default:
			// 			this.nWidth = this.width;
			// 			this.nHeight = this.height;
			// 			break;
			// 	}
			// 	this.$emit('load', e);
			// }
		}
	}
</script>

<style scoped lang="scss">
	.QS-Image{
		/* #ifndef APP-NVUE */
		display: inherit;
		/*  #endif */
		position: relative;
		overflow: hidden;
		transition: all .6s;
		&--slot{
			position: absolute;
			top: 0;
			left: 0;
		}
		
		.imgStatusStyle {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			color: #ADADAD;
		}
		
		.backgrounColor_f8f8f8 {
			background-color: #F8F8F8;
		}
		
		.fadIn {
			opacity: 0;
		}
		
		.fadIn_loaded {
			opacity: 1;
		}
		
		.fadLeft {
			opacity: 0;
			transform: translateX(-100%);
		}
		.fadLeft_loaded {
			opacity: 1;
			transform: translateX(0);
		}
		
		.fadTop {
			opacity: 0;
			transform: translateY(-100%);
		}
		.fadTop_loaded {
			opacity: 1;
			transform: translateY(0);
		}
		
		.fadBottom {
			opacity: 0;
			transform: translateY(100%);
		}
		.fadBottom_loaded {
			opacity: 1;
			transform: translateY(0);
		}
		
		.fadRight {
			opacity: 0;
			transform: translateY(100%);
		}
		.fadRight_loaded {
			opacity: 1;
			transform: translateY(0);
		}
		
		.fadRotateZ {
			opacity: 0;
			transform: rotateZ(360deg);
		}
		.fadRotateZ_loaded {
			opacity: 1;
			transform: rotateZ(0deg);
		}
		
		.fadScale {
			opacity: 0;
			transform: scale(3);
		}
		.fadScale_loaded {
			opacity: 1;
			transform: scale(1);
		}
		
		.fadRotateY {
			opacity: 0;
			transform: rotateY(180deg);
		}
		.fadRotateY_loaded {
			opacity: 1;
			transform: rotateY(0deg);
		}
	}
</style>
