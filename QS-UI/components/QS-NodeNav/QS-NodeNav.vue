<template>
	<view 
	class="QS-NodeNav" 
	:class="{ fixed: isFixed || fixed }" 
	:style="{ 
		top: fixedTop, 
		width: width, 
		height: height ,
		opacity: isFixed?getShow:1,
		backgroundColor: backgroundColor
	}">
		<view class="item" v-for="(item, index) in nodes" :key="item.id" @tap="click(item)">
			<view 
			class="content" 
			:style="{ borderBottom: current === index?`1px solid ${activeColor}`:'' }">
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
				default: ()=>[]
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
			show: {
				type: Boolean,
				default: false
			},
			backgroundColor: {
				type: String,
				default: '#ffffff'
			},
			offsetTop: {
				type: [Number, String],
				default: 0
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
		watch: {
			show(n) {
				if(n !== this.nshow) this.nshow = n;
			}
		},
		computed: {
			getShow() {
				return this.nshow?1:0;
			},
			isFixed() {
				return this.mode === 'fixed';
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
				view.exec(data=>{
					console.log(data);
					uni.pageScrollTo({
						scrollTop: this.scrollTop + data[0].top - rpxUnit2px(this.offsetTop)
					})
				})
			},
			setShow(bl) {
				if(this.nshow !== bl) this.nshow = bl;
			},
			init(obj = {}) {
				let { offsetTop } = obj;
				console.log('offsetTop', offsetTop)
				offsetTop = offsetTop || this.offsetTop;
				offsetTop = rpxUnit2px(offsetTop);
				this.obsDisconnect();
				const obs = uni.createIntersectionObserver(this.$parent,{
					thresholds: [0.95, 0.98, 1]
				});
				const nodes = this.nodes;
				let top = 0;
				// #ifdef H5
				top = 44;
				// #endif
				top += offsetTop;
				console.log('top', top)
				this.top = top;
				obs.relativeToViewport({ top: -top });
				for(let i = 0; i < nodes.length; i++) {
					const item = nodes[i];
					obs.observe(item.node, res=>{
						const cTop = res.boundingClientRect.top;
						if(cTop <= top) {
							this.current = i;
						}else{
							if(Math.abs(this.current - i) === 1) {
								this.current = i - 1;
							}
						}
						console.log(item.id, cTop, top, cTop < top);
					});
				}
				this.obsObj = obs;
			},
			obsDisconnect() {
				if(this.obsObj) {
					this.obsObj.disconnect();
					this.obsObj = null;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.QS-NodeNav{
		display: flex;
		flex-direction: row;
		transition: opacity,background-color .3s;
		&.fixed{
			position: fixed;
		}
		.item{
			flex: 1;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.content{
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
