<template>
	<view :id="componentId" class="getClass" :style="getStyle">
		<!-- <view id="placeholder"></view> -->
		<!-- 
			height: contentHeight + 'px',
			width: contentWidth + 'px' -->
		<view id="content" :style="getFixedStyle">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import intersectionObserver from '../../js/functions/intersectionObserver.js';
	import obsDisconnect from '../../js/functions/obsDisconnect.js';
	import styleObj2String from '../../js/functions/styleObj2String.js'
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	const QSComponentMixinRes = QSComponentMixin({
		componentType: 'QS-Sticky'
	});
	var id = 0;
	export default {
		mixins: [ QSComponentMixinRes.mixin ],
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			top: {
				type: [Number, String],
				default: 0
			},
			zIndex: {
				type: [Number, String],
				default: 9999999999999
			}
		},
		data() {
			return {
				fixed: false,
				contentHeight: 0,
				contentWidth: 0,
				inited: false
			}
		},
		computed: {
			getFixedStyle() {
				if(this.fixed) return styleObj2String({
					position: 'fixed',
					top: this.top,
					zIndex: this.zIndex,
					height: this.contentHeight + 'px',
					width: this.contentWidth + 'px'
				});
				return {};
			},
			QS_nCompStyle() {
				return {
					height: this.contentHeight?(this.contentHeight + 'px'):'auto',
					width: this.contentWidth?(this.contentWidth + 'px'):'auto'
				}
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				obsDisconnect(this.obsObj);
				this.obsObj = intersectionObserver({
					vm: this,
					offSetTop: this.top,
					options: { thresholds: [0] },
					nodes: [ `#${this.componentId}`, `#content` ]
				}, (res, i)=>{
					console.log('intersection', i, res);
					if(i == 1) {
						this.fixed = true;
						this.contentHeight = res.boundingClientRect.height;
						this.contentWidth = res.boundingClientRect.width;
					}
				}, (res, i)=>{
					console.log('unIntersection', i, res);
					if(i == 0 && res.boundingClientRect.top >= this.top) this.fixed = false;
				});
			},
		}
	}
</script>

<style scoped lang="scss">
</style>
