<template>
	<view class="QS-NodeNav" :class="{ fixed: isFixed || fixed }" :style="{ 
		top: fixedTop, 
		width: width, 
		height: height ,
		opacity: isFixed?getShow:1,
		backgroundColor: backgroundColor
	}">
		<QSTabs :width="width" :height="height" :tabs="nodes" :tabIndex="current" :itemFull="true" @click="click"></QSTabs>
	</view>
</template>

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-NodeNav/js/props.js';
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	import QSTabs from '../QS-Tabs/QS-Tabs.vue';
	import intersectionObserver from '../../js/functions/intersectionObserver.js';
	
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	// #endif
	
	const QSComponentMixinRes = QSComponentMixin({
		componentType: 'QS-NodeNav',
		setContext: true
	});
	var _this;
	var parent;
	export default {
		components: {
			QSTabs
		},
		mixins: [QSComponentMixinRes.mixin],
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			width: {
				type: [Number, String],
				default: '750rpx'
			},
			height: {
				type: [Number, String],
				default: '77rpx'
			},
			nodes: {
				type: Array,
				default: () => []
			},
			mode: {
				type: String,
				default: 'fixed'
			},
			fixedTop: {
				type: [Number, String],
				default: 0
			},
			activeColor: {
				type: String,
				default: '#FF6666'
			},
			defColor: {
				type: String,
				default: '#333333'
			},
			fontSize: {
				type: String,
				default: '30rpx'
			},
			showScrollTop: {
				type: [String, Number],
				default: 50
			},
			backgroundColor: {
				type: String,
				default: '#ffffff'
			},
			offsetTop: {
				type: [Number, String],
				default: 0
			},
			scrollToOffsetTop: {
				type: [Number, String],
				default: 0
			},
			viewportHeight: {
				type: [String, Number],
				default: 1
			},
			hasNavigationBar: {
				type: [Boolean, String],
				default: true
			},
			...props
		},
		data() {
			return {
				current: 0,
				fixed: false,
				nshow: false,
				top: 0,
				scrollTop: 0,
				copyNodes: []
			}
		},
		computed: {
			getShow() {
				return this.scrollTop > rpxUnit2px(this.showScrollTop) ? 1 : 0;
			},
			isFixed() {
				return this.mode === 'fixed';
			},
			getScrollToOffsetTop() {
				return this.scrollToOffsetTop == 'this' ? this.height : this.scrollToOffsetTop;
			},
			getOffsetTop() {
				return rpxUnit2px(this.offsetTop == 'this' ? this.height : this.offsetTop);
			},
			// #ifdef APP-NVUE
			getCurrent() {
				if(!this.copyNodes.length) return 0;
				return this.copyNodes.findIndex(ite=>(this.scrollTop >= (ite.rect.top - this.getOffsetTop) && this.scrollTop < ite.rect.bottom));
			}
			// #endif
		},
		// #ifdef APP-NVUE
		watch: {
			getCurrent(n) {
				if(-1 == n) return ;
				this.changeCurrent(n);
			}
		},
		// #endif
		created() {
			_this = this;
		},
		// #ifndef APP-NVUE
		beforeDestroy() {
			this.obsDisconnect();
		},
		// #endif
		methods: {
			setScrollTop(e) {
				_this.scrollTop = e;
			},
			click(e) {
				const item = this.nodes[e];
				// #ifndef APP-NVUE
				let view;
				// #ifndef MP-ALIPAY
				view = uni.createSelectorQuery().in(parent);
				// #endif
				// #ifdef MP-ALIPAY
				view = uni.createSelectorQuery();
				// #endif
				view.select(item.node).boundingClientRect();
				view.exec(data => {
					uni.pageScrollTo({
						scrollTop: this.scrollTop + data[0].top + rpxUnit2px(this.getScrollToOffsetTop)
					})
				})
				// #endif
				// #ifdef APP-NVUE
				let node = item.node || 'item';
				const pre = node.substring(0, 1);
				if(pre == '#' || pre == '.') node = node.substring(1, node.length - 1);
				dom.scrollToElement(parent.$refs[node], {
					offset: rpxUnit2px(this.getScrollToOffsetTop)
				})
				// #endif
			},
			changeCurrent(i) {
				uni.vibrateShort();
				this.current = i;
			},
			init(obj = {}) {
				if(!obj.vm) {
					console.log('请传入当前vue实例this至vm属性');
					console.warn('请传入当前vue实例this至vm属性');
					return;
				}
				parent = obj.vm;
				// #ifndef APP-NVUE
				this.obsObj = intersectionObserver({
					vm: obj.vm,
					offsetTop: this.getOffsetTop,
					viewportHeight: 1,
					nodes: this.nodes
				}, (res, i) => {
					this.changeCurrent(i);
				});
				// #endif
				// #ifdef APP-NVUE
				const arr = [];
				for(let i = 0; i < this.nodes.length; i++) {
					const item = this.nodes[i];
					arr.push(
						new Promise((rs, rj)=>{
							dom.getComponentRect(parent.$refs[item.node || item], option=>{
								rs({...item, rect: option.size});
							});
						})
					)
				}
				Promise.all(arr)
					.then(res=>{
						this.copyNodes = res;
					})
				// #endif
			},
			obsDisconnect() {
				if (Array.isArray(this.obsObj)) {
					this.obsObj.forEach(ite => {
						if (ite) {
							ite.disconnect();
							ite = null;
						}
					})
					return;
				}
				if (this.obsObj) {
					this.obsObj.disconnect();
					this.obsObj = null;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.QS-NodeNav {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		transition-property: opacity;
		transition-duration: .3s;

	}

	.fixed {
		position: fixed;
	}
</style>
