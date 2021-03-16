<template>
	<view class="QS-NodeNav" :class="{ fixed: isFixed || fixed }" :style="{ 
		top: fixedTop, 
		width: width, 
		height: height ,
		opacity: isFixed?getShow:1,
		backgroundColor: backgroundColor
	}">
		<QSTabs :width="width" :height="height" :tabs="nodes" :tabIndex="current" @click="click"></QSTabs>
		<!-- <view class="item" v-for="(item, index) in nodes" :key="item.node" @tap="click(item)">
			<view class="content" :style="{ borderBottom: current === index?`1px solid ${activeColor}`:'' }">
				<text :style="{ 
					fontSize: fontSize,
					color: current === index?activeColor:defColor
				}">{{item.text}}</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-NodeNav/js/props.js';
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	import QSTabs from '../QS-Tabs/QS-Tabs.vue';
	import intersectionObserver from '../../js/functions/intersectionObserver.js';

	const QSComponentMixinRes = QSComponentMixin({
		componentType: 'QS-NodeNav',
		setContext: true
	});
	var _this;
	export default {
		components: { QSTabs },
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
				scrollTop: 0
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
				return this.offsetTop == 'this' ? this.height : this.offsetTop;
			}
		},
		created() {
			_this = this;
		},
		beforeDestroy() {
			this.obsDisconnect();
		},
		methods: {
			setScrollTop(e) {
				_this.scrollTop = e;
			},
			click(e) {
				const item = this.nodes[e];
				let view;
				// #ifndef MP-ALIPAY
				view = uni.createSelectorQuery().in(this.$parent);
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
			},
			init(obj = {}) {
				this.obsObj = intersectionObserver({
					vm: obj.vm,
					offsetTop: this.offsetTop,
					nodes: this.nodes
				}, (res, i)=>{
					uni.vibrateShort();
					this.current = i;
				});
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
		display: flex;
		flex-direction: row;
		transition: opacity, background-color .3s;

		&.fixed {
			position: fixed;
		}

		.item {
			flex: 1;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.content {
				height: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				transition: all .3s;
			}
		}
	}
</style>
