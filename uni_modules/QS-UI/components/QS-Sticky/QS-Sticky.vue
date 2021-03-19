<template>
	<view :id="componentId + 'box'" :class="getClass" :style="getStyle">
		<view :id="componentId">
			<!-- <view id="placeholder"></view> -->
			<!-- 
				height: contentHeight + 'px',
				width: contentWidth + 'px' -->
			<view id="content" :style="getFixedStyle">
				<slot></slot>
			</view>
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
				default: 1
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
					viewportHeight: 1,
					// #ifdef MP
					nodes: [ `#${this.componentId + 'box'}`, `#content` ],
					// #endif
					// #ifndef MP
					nodes: [ `#${this.componentId}`, `#content` ],
					// #endif
				}, (res, i)=>{
					if(i == 1) {
						this.fixed = true;
						this.contentHeight = res.boundingClientRect.height;
						this.contentWidth = res.boundingClientRect.width;
					}
				}, (res, i)=>{
					if(i == 0 && res.boundingClientRect.top >= this.top) this.fixed = false;
				});
			},
		}
	}
</script>

<style scoped lang="scss">
</style>
