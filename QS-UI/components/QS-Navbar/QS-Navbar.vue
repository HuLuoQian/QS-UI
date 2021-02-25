<template>
	<view ref="QS-navbar" :class="getClass">
		<!-- #ifndef MP-ALIPAY -->
		<view ref="background" :animation="navbarAnimation" :class="{ 'QS-navbar--fixed': getFixed }" :style="{ 'z-index': zIndex }">
			<view class="QS-navbar-statusBar" :style="{ 'height': statusBarHeight }" v-if="getStatusBar"></view>
			<view class="QS-navbar-header" :style="{ 'padding-right': menuButtonInfoLeft + 'px' }">
				<block v-for="(item, index) in navbarItems || []" :key="index">
					<view class="QS-navbar-item" :style="{ 
						'width': (Number(item.width)*wW + 'rpx'), 
						'background-color': item.backgroundColor, 
						'border-style': item.borderStyle,
						'border-width': item.borderWidth,
						'border-color': item.borderColor,
						'border': item.border,
						'border-radius': (item.borderBottomLeftRadius||item.borderBottomRightRadius||item.borderTopLeftRadius||item.borderTopRightRadius)?'':(item.borderRadius || ''),
						'border-bottom-left-radius': item.borderBottomLeftRadius || '',
						'border-bottom-right-radius': item.borderBottomRightRadius || '',
						'border-top-left-radius': item.borderTopLeftRadius || '',
						'border-top-right-radius': item.borderTopRightRadius || '',
						'padding': item.padding,
						
						'justify-content': item.layout==='left'?'flex-start':item.layout==='right'?'flex-end':'center'
					}"
					 :data-index="index" @tap.stop="_click($event)">
						<block v-if="item&&item.type === 'search'">
							<view class="QS-navbar-item--search">
								<QSIcons animationType="shook" hasAnimation startAnimationType="tap" type="search" :size="item.iconSize || iconSize"
								 :color="item.iconColor || '#000000'"></QSIcons><text class="QS-navbar-text text_overflow_ellipsis" :style="{ 'color': item.color || '#000000' }">{{item.text}}</text>
							</view>
						</block>
						<block v-else-if="item&&item.type === 'icon'">
							<QSIcons fontWeight="bold" animationType="elasticity_Y" hasAnimation startAnimationType="tap" :type="item.icon"
							 :size="item.iconSize || iconSize" :color="item.iconColor || '#000000'"></QSIcons>
						</block>
						<block v-else-if="item&&item.type === 'image'">
							<image :src="item.src" :mode="item.mode||'aspectFill'" :style="{
								'border-radius': item.itemBorderRadius || '8rpx',
								'background-color': item.itemBackgroundColor || 'rgba(255,255,255,0)',
								'width': item.itemWidth || '100%',
								'height': item.itemHeight || '100%'
							}"></image>
						</block>
						<block v-else-if="item&&item.type==='text'"><text class="text_overflow_ellipsis" :style="{
								'border-radius': item.itemBorderRadius || '8rpx',
								'background-color': item.itemBackgroundColor || 'rgba(255,255,255,0)',
								'width': item.itemWidth || '100%',
								'height': item.itemHeight || '100%',
								'font-size': item.fontSize || '16px',
								'color': item.color || '#000',
								'text-align' : item.textAlign || 'center',
								'font-weight': item.weight || '0'
							}">{{item.text}}</text>
						</block>
						<block v-else-if="item&&item.type==='colImageText'">
							<view class="colImageText" :style="{
								'width': item.itemWidth || '100%',
								'height': item.itemHeight || '100%',
								'border-radius': item.itemBorderRadius || '8rpx',
								'background-color': item.itemBackgroundColor || 'rgba(255,255,255,0)',
								'font-size': item.fontSize || '12px', 
								'color': item.color || '#000', 
								'font-weight': item.weight || '0'
							}">
								<image :src="item.src" :mode="item.mode||'aspectFill'" class="colImageText-image" :style="{
									'border-radius': item.imageBorderRadius || '4px',
								}"></image><text
								 class="colImageText-text">{{item.text}}</text>
							</view>
						</block>
					</view>
				</block>
			</view>
		</view>
		<block v-if="getHasPlacherholder && getFixed">
			<view class="QS-navbar-statusBar" :style="{ 'height': statusBarHeight }" v-if="getStatusBar&&getFixed"></view>
			<view class="QS-navbar--fixed--placherholder" v-if="getFixed"></view>
		</block>
		<!-- <block v-if="hasPopTip">
			<popTip ref="popTip" dynamic maskBg="rgba(0,0,0,.6)" :popData="popData" @tapPopup="tapPopup" :x="popTipX" :y="popTipY" placement="top-end"></popTip>
		</block> -->
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifndef MP-ALIPAY
	// import popTip from '@/components/chunLei-popups/chunLei-popups.vue'
	import props from '@/QS-UI-CONFIG/components/QS-Navbar/js/props.js';
	import QSIcons from '../QS-Icons/QS-Icons.vue';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	const QSComponentMixinRes = QSComponentMixin();
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	const animation = weex.requireModule('animation');
	// #endif
	// #endif
	export default {
		// #ifndef MP-ALIPAY
		mixins: [QSComponentMixinRes.mixin],
		components: {
			QSIcons,
			// popTip
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			fixed: {
				type: [Boolean, String],
				default: true
			},
			backgroundColor: {
				type: String,
				default: '#ffffff'
			},
			statusBar: {
				type: [Boolean, String],
				default: true
			},
			navbarItems: {
				type: Array,
				default () {
					return [];
				}
			},
			diffMenuButtonInfo: {
				type: [Boolean, String],
				default: false
			},
			hasPlacherholder: {
				type: [Boolean, String],
				default: true
			},
			zIndex: {
				type: [Number, String],
				default: 998
			},
			relaunchPath: {
				type: String,
				default: ''
			},
			...props
		},
		computed: {
			QS_nCompClass() {
				return 'QS QS-navbar';
			},
			hasPopTip() {
				const data = this.navbarItems;
				for (let i = 0; i < data.length; i++)
					if (data[i].doEvent === 'popTip') return true;
				return false;
			},
			getFixed() {
				return String(this.fixed) === 'true'
			},
			getStatusBar() {
				return String(this.statusBar) === 'true'
			},
			getHasPlacherholder() {
				return String(this.hasPlacherholder) === 'true';
			}
		},
		watch: {
			backgroundColor(n) {
				this.setBackgroundColor(n);
			}
		},
		data() {
			return {
				statusBarHeight: statusBarHeight + 'px',
				menuButtonInfoLeft: 0,
				iconSize: '18px',
				wW: 7.2,
				navbarAnimation: {},
				navbarAni: null,
				popTipX: 0,
				popTipY: 0,
				popData: []
			};
		},
		created() {
			// #ifndef APP-NVUE
			this.navbarAni = uni.createAnimation({
				duration: 0
			});
			// #endif
			// #ifdef MP
			if (String(this.diffMenuButtonInfo) === 'true') {
				const {
					windowWidth
				} = uni.getSystemInfoSync();
				const menuButtonInfoLeftDx = uni.getMenuButtonBoundingClientRect().left - 10;
				const menuButtonInfoLeft = (windowWidth - menuButtonInfoLeftDx);
				this.menuButtonInfoLeft = menuButtonInfoLeft;
				this.wW = menuButtonInfoLeftDx / windowWidth * 750 / 100;
			}
			// #endif
		},
		mounted() {
			this.setBackgroundColor();
		},
		methods: {
			tapPopup(e) {
				this.$refs.popTip.valueChange(false);
				this.$emit('tapPopTip', e);
			},
			setBackgroundColor(color) {
				const bgColor = color || this.backgroundColor;
				// #ifndef APP-NVUE
				this.navbarAni.backgroundColor(bgColor).step();
				this.navbarAnimation = this.navbarAni.export();
				// #endif
				// #ifdef APP-NVUE
				animation.transition(this.$refs.background, {
					styles: {
						backgroundColor: bgColor
					},
					duration: 0, //ms
					needLayout: false,
					delay: 0 //ms
				})
				// #endif
			},
			_click(e) {
				let index;
				// #ifdef APP-NVUE
				if (e.currentTarget.dataset) {
					index = e.currentTarget.dataset.index;
				} else {
					index = e.currentTarget.attr.dataIndex;
				}
				// #endif
				// #ifndef APP-NVUE
				index = e.currentTarget.dataset.index;
				// #endif
				if (index == undefined || index == null) {
					uni.showToast({
						icon: 'none',
						title: '找不到下标',
						position: 'center'
					})
					return;
				}
				const item = this.navbarItems[index];
				if (item.doEvent) {
					switch (item.doEvent) {
						case 'back':
							if(typeof uni.$qs === 'object') {
								uni.$qs.navigateBack();
							}else{
								uni.navigateBack()
							}
							break;
						case 'navigateTo':
							if(typeof uni.$qs === 'object') {
								uni.$qs.navigateTo({
									url: item.targetPath
								})
							}else{
								uni.navigateTo({
									url: item.targetPath
								})
							}
							break;
						case 'relaunch':
							let path;
							if (this.relaunchPath) path = this.relaunchPath;
							else if (typeof uni.$qs === 'object' && uni.$qs.launchPath) path = uni.$qs.launchPath;
							if (path) {
								uni.reLaunch({
									url: path
								})
							} else {
								console.log('路径不存在')
							}
							break;
						case 'popTip':
							const target = e.target;
							this.popTipX = target.x;
							this.popTipY = target.y;
							if (Array.isArray(item.popDatas) && this.popData !== item.popDatas) this.popData = item.popDatas;
							this.$refs.popTip.valueChange(true);
							break;
						default:
							this.$emit('click', item, index);
							break;
					}
				} else {
					this.$emit('click', item, index);
				}
			},
			getPromiseQuery() {
				return new Promise((rs, rj)=>{
					this.getQuery(data=>{
						rs(data);
					})
				})
			},
			getQuery(cb) {
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['QS-navbar'], option => {
					// console.log('获取navbar布局信息成功: ' + JSON.stringify(option))
					if (cb && typeof cb === 'function') cb(option.size)
				})
				// #endif
				// #ifndef APP-NVUE
				let view;
				// #ifndef MP-BAIDU || MP-ALIPAY
				view = uni.createSelectorQuery().in(this);
				// #endif
				// #ifdef MP-BAIDU || MP-ALIPAY
				view = uni.createSelectorQuery();
				// #endif
				view.select('.QS-navbar').fields({
					size: true
				})
				view.exec(res => {
					// console.log('获取navbar布局信息成功: ' + JSON.stringify(res))
					if (res[0]) {
						if (cb && typeof cb === 'function') cb(res[0])
					} else {
						if (cb && typeof cb === 'function') cb({
							height: 77
						})
					}
				})
				// #endif
			}
		}
		// #endif
	}
</script>

<style lang="scss" scoped>
	// #ifndef MP-ALIPAY
	@import "../../css/index.scss";

	.QS-navbar {
		width: 750rpx;
	}

	.QS-navbar-statusBar {
		width: 750rpx;
		height: 20px;
	}

	.QS-navbar--fixed {
		position: fixed;
	}

	.QS-navbar-header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		width: 750rpx;
		height: 44px;
		padding: 5px $qs-padding-common;
		flex-wrap: nowrap;
		overflow: hidden;
	}

	.QS-navbar--fixed--placherholder {
		width: 750rpx;
		height: 44px;
	}

	.QS-navbar-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		overflow: hidden;
	}

	.QS-navbar-item--search {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 3px 8px;
	}

	.QS-navbar-text {
		font-size: 30rpx;
	}

	.text_overflow_ellipsis {
		/* #ifndef APP-NVUE */
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
	}

	.colImageText {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.colImageText-image {
		height: 20px;
		width: 20px;
	}

	.colImageText-text {
		height: 14px;
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		font-size: 10px;
		margin-top: 1px;
		text-align: center;
	}

	// #endif
</style>
