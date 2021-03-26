<template>
	<view class="QS-Backtop" :class="getClass" :style="getStyle" @tap="active">
		<!-- #ifdef APP-NVUE -->
		<view class="nvue-placeholder" ref="nvuePlaceholder"></view>
		<!-- #endif -->
		<image 
		v-if="type==='image'" 
		class="backtop-container" 
		:class="compClass.image"
		:style="compStyle.image"
		:src="image"
		mode="aspectFill"></image>
		<view
		v-else-if="type==='text'"
		class="backtop-container" 
		:class="compClass.textContainer"
		:style="compStyle.textContainer">
			<text>{{text}}</text>
		</view>
		<slot v-else-if="type==='slot'"></slot>
	</view>
</template>

<script>
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-BackTop/js/props.js';
	import getH5TabbarHeight from '../../js/functions/getH5TabbarHeight.js';
	import styleObj2String from '../../js/functions/styleObj2String.js';
	import classObj2String from '../../js/functions/classObj2String.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-BackTop', setContext: true });
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	// #endif
	var _this;
	export default {
		mixins: [QSComponentMixinRes.mixin],
		// name: 'QS-Backtop',
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			type: {
				type: String,
				default: 'image'
			},
			image: {
				type: String,
				default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAFxklEQVR4Xu2cz08kRRTHvwu4Iv5I1l+4GjUyk6A4oB6YhIQQjV44GA562TlqMFG44J72L9jTygXcZMl6nD0ZQzxw0WgICQlwkMywiM7gj9Vd8ce6cX/MrjOM5ttbTZqmu6e7q6qpIbxksht6uqr6069evffq1RxBMnIPgAcAdAC4F0A7gDYALeLDUdTFpwbgtvhUANwAUNU9zCMaO3gIwMMCAB9eRu4IIFcB/CPTkN+9qkHwzT8O4BEA/L8OoXb8BeB3lZqiCgTf+BNCA6juSQinEjXkNwDUGCmRBdEK4CkAjwKQbSvug/wH4E8AvwLYjtuIzOA5/58WRi9u/yrv45T5RWhJ5HbjgKDqPyPsQOQOE7iB9uNnsQKF7i4qCNqCtFj+QneyD1/k8luKYjuigKAPQAi6VgPVvDhVCONWmIbDgqAzRAg0js0kNJ6EQacsUMKAuA9AdxNCsB+cMDYA0Ev1lUYgjgJ4vommg9+Dcpp8C+Bfvy8EgeC1FwBQIw6C0FYQBv2OPRIEgkvkYweBgOMZ/hBLa2gQxwB0HTAI9uNsAvjb/WxeGsGV4cUk7ML8/PzIwMDA+xzU4uLi2aGhodkE4NNeFN0OlxcIus2MILXK0tLSif7+/pPOTpaXl89ks9kLWju+2/iWcMd3unKDYMKkR3cA5QXBHlFCMGgwL4rkj9W1G8SzIpLU9lKCICQMgxHrT3afThB0nTOO1JlyGGEgJAiD+QzaCisN6ATxJIDjyp9eNBgFQoIwrgC47AbRC4CepHKJAyEhGMxsUSt2NIJBFeMJ5eIHYWtr68vOzs7XnR16/Y3XNRtQxiE37KmhxYv0g1Auly9MTk7mp6amPneCGB8ff3NiYiKXSqVOuN+IRhhMAl+yQdBIyqbcd409CEI6nT4zNjZ23AvE9PT0lVKpdDJBGIxKLxIE7QLtgzJpBIEdBYHg9QRh0KcoEgSTsM+polAoFN7JZDIfuNvjdKAm2H9vBCJhGD8QhLJls1wuf9jV1ZVrBCGMRtht+GnG+vr6+Z6enrOKXuBlgqA2UCukJAqEKCCCNGNzczOfSqU+khr43ZuvEgQzUPfLNBYVQlQQCcC4SRBSK0ZYm+AGHcZGuO/xmybFYvHj3t7eTyRe5h2CeElmt6pWq33V2tr6oHMQa2tr5zKZzLmggcUB4acZ29vb19va2l6TAFEliFdkAq1KpfJZe3s7cxiWhHV84oJgH6urq+/29fVZCR1KpVL5saOj420JEHVpEDMzMy/ncrlT1IqVlZXzg4ODn4YZkAwItr+wsPBWNpt9r1qtXsvn86dHR0e/CdOvz3csEFJTI27nsiDi9utzX03aWMYdkGEgLGPJqJPRZ6JiGAgr+lTiUEWlaBgIy6FiVopudqJiGAjLxVYadIWlaRgIK+hSHoaHgWEYiIK2xEwjGAaBsPKWNgjt+xluMAaBsPY3bBDakrd+mmEQiF3JW45XWzrfC4YhIPak8zlWZZmqRvaB1w0B4bnBw2p5akUiJcQGgOCWXwEATwPs2QTWsr9h6NTYVT3j3g2nT8EiEe1asc8aYaXwncVlXoUiLDJnpb1WSafTRzc2Nr5oaWlhISvq9fqt7u7uN0qlkm/lm8IBsaKfRew74gWC2sA8pvYK29nZ2VeHh4dPcTRzc3OnR0ZGvlb4sH5NEfRamNIhNnCQi8nKAK65KR2WFwoiQSA4RbjncVAKTrnZux6n4JSsDkuQHXOo2YvS6TB9J1uUbvNo5mMK3wO42Wg1CrIR7nupGTyzoaXOqtFAY1xntRwhBB5PsNuNAsK2GYRhugHlw/PASmjnLCoIOz5hTMIjjiYKEy083OZ5HMFvwHFA2G2ZdtyRRvFSkscdnVAPD8C6VIzF7J37dCSalfY83iglMlPDq2P7kDynja7VhQaQZ8KNPCTvBYW+B4M3/nwCazjjQqfR4xu/LoIl/qtc4g4u6kDsH9LgsstpZNwPafwPhfuGay8GQVoAAAAASUVORK5CYII='
			},
			text: {
				type: String,
				default: ''
			},
			right: {
				type: String,
				default: '30rpx'
			},
			bottom: {
				type: String,
				default: '30rpx'
			},
			duration: {
				type: [String, Number],
				default: '.3s'
			},
			zIndex: {
				type: [String, Number],
				default: 990
			},
			backTopType: {
				type: String,
				default: 'page'
			},
			tabbar: {
				type: [String, Boolean],
				default: false
			},
			offsetBottom: {
				type: [String, Number],
				default: 0
			},
			...props
		},
		data() {
			return {
				showBl: false,
				tabbarHeight: 0
			}
		},
		created() {
			_this = this;
		},
		computed: {
			isTabbar() {
				return String(this.tabbar) === 'true';
			},
			QS_nCompClass() {
				return classObj2String(this.compClass.backTop);
			},
			QS_nCompStyle() {
				const style =  {
					right: this.right,
					bottom: this.getBottom,
					transitionDuration: this.duration,
					zIndex: this.zIndex,
					fontSize: this.baseFontSize + 'px'
				};
				if(this.showBl) {
					style.transform = `translateY(0)`
				}else{
					style.transform = `translateY(100%)`
				}
				return `${styleObj2String(style)};${styleObj2String(this.compStyle.backTop)}`;
			},
			getBottom() {
				// return 0;
				const pxValue = rpxUnit2px(this.bottom);
				let value = 0;
				if (this.showBl) {
					if (this.type === 'image' || this.type === 'text') {
						value = pxValue;
					}

					// #ifdef H5
					if (this.isTabbar) value += this.tabbarHeight;
					// #endif
					
					value += rpxUnit2px(this.offsetBottom);
				} else {
					if (this.type === 'image' || this.type === 'text') {
						value = 0 - pxValue;
					}

					// #ifdef H5
					if (this.isTabbar) value -= this.tabbarHeight;
					// #endif
					value -= rpxUnit2px(this.offsetBottom);
				}
				return value + 'px';
			}
		},
		methods: {
			
			setShow(bl) {
				if(this.isTabbar) this.tabbarHeight = getH5TabbarHeight();
				if (this.showBl !== bl) this.showBl = bl;
			},
			show() {
				this.setShow(true);
			},
			hide() {
				this.setShow(false);
			},
			active() {
				if (_this.backTopType === 'page') {
					// #ifndef APP-NVUE
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					})
					// #endif
					// #ifdef APP-NVUE
					dom.scrollToElement(this.$refs.nvuePlaceholder)
					// #endif
				} else {
					_this.$emit('backTop');
				}
			}
		}
	}
</script>

<style scoped>
	.QS-Backtop {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		transition-property: bottom,transform;
		/* #ifndef APP-NVUE */
		transform: translateY(100%);
		/* #endif */
		/* #ifdef APP-NVUE */
		transform: translateY(100%);
		/* #endif */
		
	}
	.backtop-container {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		overflow: hidden;
	}
	
	.nvue-placeholder{
		position: fixed;
		top: 0;
		left: 0;
		height: 0;
		width: 0;
		opacity: 0;
	}
</style>
