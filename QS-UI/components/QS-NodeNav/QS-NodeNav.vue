<template>
	<view class="QS-NodeNav" :class="{ fixed: isFixed || fixed }" :style="{ 
		top: fixedTop, 
		width: width, 
		height: height ,
		opacity: isFixed?getShow:1,
		backgroundColor: backgroundColor
	}">
<<<<<<< HEAD
		<view class="item" v-for="(item, index) in nodes" :key="item.id" @tap="click(item)">
=======
		<view class="item" v-for="(item, index) in nodes" :key="item.node" @tap="click(item)">
>>>>>>> e3325e2714daa8526c3b250b50f09738adb653eb
			<view class="content" :style="{ borderBottom: current === index?`1px solid ${activeColor}`:'' }">
				<text :style="{ 
					fontSize: fontSize,
					color: current === index?activeColor:defColor
				}">{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	const Sys = uni.getSystemInfoSync();
	export default {
		props: {
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
<<<<<<< HEAD
				default: 30
=======
				default: 0
>>>>>>> e3325e2714daa8526c3b250b50f09738adb653eb
			}
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
<<<<<<< HEAD
		watch: {
			show(n) {
				if (n !== this.nshow) this.nshow = n;
			}
		},
		computed: {
			getShow() {
				return this.scrollTop > 50 ? 1 : 0;
=======
		computed: {
			getShow() {
				return this.scrollTop > rpxUnit2px(this.showScrollTop) ? 1 : 0;
>>>>>>> e3325e2714daa8526c3b250b50f09738adb653eb
			},
			isFixed() {
				return this.mode === 'fixed';
			},
			getScrollToOffsetTop() {
				return this.scrollToOffsetTop == 'this' ? this.height : this.scrollToOffsetTop;
<<<<<<< HEAD
=======
			},
			getOffsetTop() {
				return this.offsetTop == 'this'?this.height : this.offsetTop;
>>>>>>> e3325e2714daa8526c3b250b50f09738adb653eb
			}
		},
		beforeDestroy() {
			this.obsDisconnect();
		},
		methods: {
			setScrollTop(e) {
				this.scrollTop = e;
			},
			click(item) {
				let view;
				// #ifndef MP-ALIPAY
				view = uni.createSelectorQuery().in(this.$parent);
				// #endif
				// #ifdef MP-ALIPAY
				view = uni.createSelectorQuery();
				// #endif
				view.select(item.node).boundingClientRect();
				view.exec(data => {
					console.log(data);
					uni.pageScrollTo({
<<<<<<< HEAD
						scrollTop: this.scrollTop + data[0].top - rpxUnit2px(this.offsetTop) - rpxUnit2px(this.getScrollToOffsetTop)
					})
				})
			},
			setShow(bl) {
				if (this.nshow !== bl) this.nshow = bl;
			},
=======
						scrollTop: this.scrollTop + data[0].top + Number(this.getScrollToOffsetTop)
					})
				})
			},
>>>>>>> e3325e2714daa8526c3b250b50f09738adb653eb
			init(obj = {}) {
				let {
					offsetTop
				} = obj;
<<<<<<< HEAD
				offsetTop = offsetTop || this.offsetTop;
=======
				offsetTop = offsetTop || this.getOffsetTop;
>>>>>>> e3325e2714daa8526c3b250b50f09738adb653eb
				offsetTop = rpxUnit2px(offsetTop);
				let top = Number(offsetTop);
				this.top = top;

				this.obsDisconnect();
				const nodes = this.nodes;
				let obs = [];
				for (let i = 0; i < nodes.length; i++) {
					const item = nodes[i];
					const ob = uni.createIntersectionObserver(this.$parent).relativeToViewport({
						top: -top,
						bottom: -Sys.windowHeight + top + Number(this.viewportHeight)
					})
					ob.observe(item.node, res => {
<<<<<<< HEAD
						// console.log(res);
=======
>>>>>>> e3325e2714daa8526c3b250b50f09738adb653eb
						if (res.intersectionRatio > 0) {
							this.current = i;
						}
					});
					obs.push(ob);
				}
				this.obsObj = obs;
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
