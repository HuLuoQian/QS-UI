<template>
	<view :class="getClass" :style="getStyle">
		<view 
		:style="{zIndex: nzIndex, backgroundColor: `rgba(0,0,0,${maskOpacity})`}" 
		@touchmove.stop.prevent="voidFc" 
		@tap.stop="maskHide" 
		class="fadeIn_mask" 
		:class="showBl?'show':'hide'"></view>
		<view 
		:style="{
			zIndex: nzIndex + 1,
			backgroundColor: backgroundColor,
			borderRadius: borderRadius,
			width: width,
			height: height,
			padding: paddingCol + ' ' + paddingRow
		}" 
		@touchmove.stop.prevent="voidFc" 
		class="QS-Popup" 
		:class="[('QS_' + type), showBl?'show':'hide']">
			<view class="QS-Popup-header" v-if="header" :style="{
				marginBottom: paddingCol
			}">
				<text class="QS-Popup-title">{{title}}</text>
				<QSIcons type="close" size="16px" color="#000000" @click="hide"></QSIcons>
			</view>
			<slot v-if="!slotUseVif?true:slotShowBl"></slot>
		</view>
	</view>
</template>

<script>
	import QSIcons from '../QS-Icons/QS-Icons.vue';
	import props from '@/QS-UI-CONFIG/components/QS-Popup/js/props.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	const QSComponentMixinRes = QSComponentMixin();
	var NZINDEX = 0;
	export default {
		mixins: [QSComponentMixinRes.mixin],
		components: {QSIcons},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			width: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			header: {
				type: [String, Boolean],
				default: false
			},
			backgroundColor: {
				type: String,
				default: ''
			},
			paddingRow: {
				type: String,
				default: '25rpx'
			},
			paddingCol: {
				type: String,
				default: '25rpx'
			},
			borderRadius: {
				type: [String, Number],
				default: ''
			},
			type:{
				type: String,
				default: 'fadeInMiddle'
			},
			tapMaskHide: {
				type: [String, Boolean],
				default: true
			},
			zIndex: {
				type: [String, Number],
				default: 999
			},
			slotUseVif: {
				type: [String, Boolean],
				default: false
			},
			maskOpacity: {
				type: [Number, String],
				default: '.7'
			},
			...props
		},
		created() {
			if(!NZINDEX) NZINDEX = this.zIndex;
		},
		data() {
			return {
				showBl: false,
				slotShowBl: false,
				timeout: null,
				nzIndex: 0
			}
		},
		methods: {
			show() {
				this.nzIndex = ++NZINDEX;
				if(this.timeout) clearTimeout(this.timeout);
				if(this.slotUseVif) {
					this.slotShowBl = true;
					this.$nextTick(()=>{
						this.showBl = true;
					})
				}else{
					this.showBl = true;
				}
				this.$emit('show');
			},
			maskHide() {
				if(String(this.tapMaskHide) === 'true') this.hide();
			},
			hide() {
				if(this.slotUseVif) {
					this.showBl = false;
					this.$nextTick(()=>{
						this.timeout = setTimeout(()=>{
							this.slotShowBl = false;
						}, 310)
					})
				}else{
					this.showBl = false;
				}
				this.$emit('hide');
			},
			voidFc() {}
		}
	}
</script>

<style scoped>
	@import url("./css/QS-popup.css");
	view{
		box-sizing: border-box;
	}
</style>
