<template>
	<view class="QS-List" :class="getClass" :style="getStyle">
		<!-- #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ -->
		<view @touchmove.prevent.stop="voidFn">
			<view class="refresh-container" id="refresh-container" @touchstart="QSREFRESHWXS.touchstart" @touchmove="QSREFRESHWXS.touchmove"
			 @touchend="QSREFRESHWXS.touchend" @touchcancel="QSREFRESHWXS.touchend" :refreshdistance="refreshDistance"
			 :readyrefresh="readyRefresh" :refreshshow="refreshShow" :refreshstatus="refreshStatus" :curreadyrefresh="curReadyRefresh"
			 :data-componentid="componentId" :change:refreshstatus="QSREFRESHWXS.refreshStatusChange" :change:refreshshow="QSREFRESHWXS.refreshShowChange"
			 :change:readyrefresh="QSREFRESHWXS.readyRefreshChange" :change:refreshdistance="QSREFRESHWXS.refreshDistanceChange"
			 :change:curreadyrefresh="QSREFRESHWXS.curReadyRefreshChange">
				<view class="refresh-image-container" :style="{ 
					'height': refreshDistance + 'px'
				}">
					<image id="refreshImage" v-if="refreshImage" :src="refreshImage" mode="scaleToFill" class="refresh-image" :class="{'isRefreshing': isRefreshing}"></image>
					<view class="refreshText" :style="{
						'font-size': refreshTextFontSize,
						'color': refreshTextColor
					}">{{refreshStatusText}}</view>
				</view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" :style="{ 
					height: height + 'px',
					backgroundColor: backgroundColor 
				}"
				 scroll-with-animation
				 @scroll="scroll" 
				 :lower-threshold="Number(lowerThreshold)" 
				 @scrolltolower="scrolltolower">
					<slot></slot>
				</scroll-view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef APP-VUE || MP-WEIXIN || H5 || MP-QQ -->
		<view @touchmove.prevent.stop="voidFn">
			<view class="refresh-container" id="refresh-container" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
			 @touchcancel="touchend" :refreshdistance="refreshDistance" :readyrefresh="readyRefresh" :refreshshow="refreshShow"
			 :refreshstatus="refreshStatus" :curreadyrefresh="curReadyRefresh" :data-componentid="componentId" :animation="animation">
				<view class="refresh-image-container" :style="{ 
					'height': refreshDistance + 'px'
				}">
					<view :animation="refreshImageAnimation" class="">
						<image id="refreshImage" v-if="refreshImage" :src="refreshImage" mode="scaleToFill" class="refresh-image" :class="{'isRefreshing': isRefreshing}"></image>
					</view>

					<view class="refreshText" :style="{
						'font-size': refreshTextFontSize,
						'color': refreshTextColor
					}">{{refreshStatusText}}</view>
				</view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" :style="{ 
					height: height + 'px', 
					backgroundColor: backgroundColor 
				}"
				 scroll-with-animation 
				 @scroll="scroll" 
				 :lower-threshold="Number(lowerThreshold)" 
				 @scrolltolower="scrolltolower">
					<slot></slot>
				</scroll-view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<!-- #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ -->
<script lang="wxs" module="QSREFRESHWXS" src="../../wxs/QS-refresh-wxs.wxs"></script>
<!-- #endif -->

<script>
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-List/js/props.js';
	const QSComponentMixinRes = QSComponentMixin();
	var QSComponentId = 0;
	export default {
		mixins: [QSComponentMixinRes.mixin],
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			backgroundColor: {
				type: String,
				default: ''
			},
			height: {
				type: [Number, String],
				default: 500
			},
			hasRefresh: {
				type: [Boolean, String],
				default: false
			},
			refreshImage: { //刷新动画图片
				type: String,
				default: ''
			},
			refreshDistance: { //刷新距离
				type: [Number, String],
				default: 90
			},
			beforRefreshText: { //刷新前文字
				type: String,
				default: '下拉刷新'
			},
			releaseRefreshText: { //释放刷新文字
				type: String,
				default: '松开刷新'
			},
			isRefreshingText: { //刷新中文字
				type: String,
				default: '刷新中...'
			},
			successRefreshText: { //刷新成功
				type: String,
				default: '刷新成功'
			},
			failRefreshText: { //刷新失败
				type: String,
				default: '刷新失败'
			},
			completeRefreshText: { //刷新完成文字
				type: String,
				default: '刷新完毕'
			},
			refreshTextColor: { //刷新文字的颜色
				type: String,
				default: '#666'
			},
			refreshTextFontSize: { //刷新文字的大小
				type: String,
				default: '25rpx'
			},
			lowerThreshold: {
				type: [String, Number],
				default: 0
			},
			...props
		},
		data() {
			return {
				componentId: 'QSList_' + QSComponentId++,
				refreshStatus: 1,
				refreshStatusText: this.beforRefreshText,
				isRefreshing: false,
				readyRefresh: false,
				refreshShow: false,
				curReadyRefresh: true,
				Ani: null,
				animation: {},
				refreshAni: null,
				refreshImageAnimation: {},
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		created() {
			// #ifndef APP-VUE || MP-WEIXIN || H5 || MP-QQ
			this.Ani = uni.createAnimation({
				duration: 0
			})
			this.refreshAni = uni.createAnimation({
				duration: 0
			})
			// #endif
		},
		methods: {
			scrolltolower() {
				this.$emit('scrolltolower');
			},
			backTop() {
				this.scrollTop = this.old.scrollTop;
				this.$nextTick(() => {
					this.scrollTop = 0;
				});
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop;
				this.$emit('scroll', e);
			},
			setReadyRefresh(obj) {
				this.readyRefresh = obj.readyRefresh;
			},
			setRefreshStatus(status) {
				if (status === this.refreshStatus) return;
				this.refreshStatus = status;
				// console.log(status);
				switch (status) {
					case 1:
						this.refreshStatusText = this.beforRefreshText;
						break;
					case 2:
						this.refreshStatusText = this.releaseRefreshText;
						// #ifndef H5
						uni.vibrateShort();
						// #endif
						break;
					case 3:
						this.refreshStatusText = this.isRefreshingText;
						this.isRefreshing = true;
						this.$emit('refresh');
						break;
					case 4:
						this.refreshStatusText = this.successRefreshText;
						if (this.isVShowAndNotWxs) {
							this.setRefreshStatus(6);
						}
						break;
					case 5:
						this.refreshStatusText = this.failRefreshText;
						if (this.isVShowAndNotWxs) {
							this.setRefreshStatus(6);
						}
						break;
					case 6:
						setTimeout(() => {
							// if(this.isVShowAndNotWxs) {
							// this._vShow_setRefreshY(0, { duration: 300 });
							// }
							this.setRefreshStatus(1);
							this.isRefreshing = false;
							this.refreshShow = false;
						}, 1000);
						break;
				}
			},
			setRefreshShow(obj) {
				this.refreshShow = obj.refreshShow;
			},
			refreshEnd(bl) {
				this.setRefreshStatus(bl ? 4 : 5);
			},
			touchstart(e) {
				this.startY = e.touches[0].pageY;
			},
			touchmove(e) {
				if (this.old.scrollTop > 20) return;
				if (this.refreshStatus === 1 || this.refreshStatus === 2) {
					var moveY = e.touches[0].pageY;
					var diffY = (moveY - this.startY) * 0.5;
					if (diffY < 0) {
						diffY = 0;
					} else {
						if (this.readyRefresh === false) {
							this.setReadyRefresh({
								readyRefresh: true
							})
						}
						if (this.refreshShow === false) {
							this.setRefreshShow({
								refreshShow: true
							})
						}
					}
					this.Ani.translateY((diffY) + 'px').step({
						duration: 0
					});
					this.animation = this.Ani.export();

					this.refreshAni.rotate(diffY * 10).step({
						duration: 0
					});
					this.refreshImageAnimation = this.refreshAni.export();

					if (diffY >= this.refreshDistance) {
						if (this.refreshStatus !== 2) this.setRefreshStatus(2);
					} else {
						if (this.refreshStatus !== 1) {
							this.setRefreshStatus(1);
						}
					}
				}
				if (this.touchStatus !== 1) this.touchStatus = 1;
			},
			touchend() {
				if (this.refreshStatus === 1 || this.refreshStatus === 2) {
					this.setReadyRefresh({
						readyRefresh: false
					});
					if (this.refreshStatus === 2) {
						this.setRefreshStatus(3);
						this.Ani.translateY(this.refreshDistance + 'px').step({
							duration: 300
						});
						this.animation = this.Ani.export();
					} else {
						if (this.touchStatus === 1) {
							this.Ani.translateY('0px').step({
								duration: 300
							});
							this.animation = this.Ani.export();
							this.setRefreshShow({
								refreshShow: false
							})
						}
					}
				}
				if (this.touchStatus !== 2) this.touchStatus = 2;
			},
			voidFn() {}
		}
	}
</script>

<style scoped>
	@import "@/QS-UI-CONFIG/components/QS-tabs-wxs-list/css/QS-refresh-image-isrefreshing.css";

	.QS-List {
		overflow: hidden;
	}

	/* refresh */
	.refresh-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		will-change: transform;
	}

	.refresh-image-container {
		position: absolute;
		left: 0;
		top: 0;
		transform: translateY(-100%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		transition-property: opacity;
		transition-duration: .3s;
	}


	.refresh-image {
		height: 80rpx;
		width: 80rpx;
	}

	.refreshText {
		margin-top: 15rpx;
	}

	.vShowView {
		width: 100%;
		position: relative;
	}
</style>
