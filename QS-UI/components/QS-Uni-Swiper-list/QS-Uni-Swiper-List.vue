<template>
	<list 
	:class="getClass" 
	:style="getStyle" 
	:id="pageId" 
	:bounce="false" 
	fixFreezing="true" 
	@scroll="scroll" 
	:loadmoreoffset="pageHeight/2" 
	@loadmore="fatherListLoadmore">
		<refresh 
		v-if="getHasRefresh"
		class="refresh"
		@refresh="onrefresh" 
		@pullingdown="onpullingdown"
		:display="refreshing ? 'show' : 'hide'" 
		:style="{
			'height': (refreshDistance + navbarHieght) + 'px'
		}">
			<text 
			class="indicator-text" 
			:style="{
			'color': refreshTextColor,
			'font-size': refreshTextFontSize
			}">{{refreshText}}</text>
			
			<loading-indicator 
			class="indicator" 
			:style="{
			'color': refreshTextColor,
			'height': refreshTextFontSize,
			'width': refreshTextFontSize
			}"></loading-indicator>
		</refresh>
		<cell>
			<view id="head" class="header">
				<slot name="headerContent"></slot>
			</view>
		</cell>
		<cell>
			<view class="tabs" :style="{ height: pageHeight + 'px', opacity: opacity }">
				<block v-if="nTabsUseSlot">
					<slot name="tabs"></slot>
				</block>
				<block v-else>
					<QSTabs
					ref="Tabs" 
					:tabIndex="tabIndex" 
					:tabs="tabList" 
					:props="tabsProps" 
					:type="tabsType"
					:height="tabsHeight"
					:activeFontSize="tabsActiveFontSize"
					:defFontSize="tabsDefFontSize"
					:backgroundColor="tabsBackgroundColor"
					@click="ontabtap"></QSTabs>
				</block>
				
				<swiper 
				ref="swiperList" 
				class="tab-view" 
				id="tab-bar-view" 
				:current="tabIndex" 
				:duration="300" 
				@transition="onswiperscroll"
				@animationfinish="animationfinish" 
				@onAnimationEnd="animationfinish"
				@change="onswiperchange"
				:style="{ height: (pageHeight - ntabsHeight) + 'px' }">
					<swiper-item class="swiper-item" v-for="(page, index) in tabList" :key="page.id">
						<component 
						:is="nContentType" 
						ref="page" 
						:pid="page.pageid" 
						:parentId="pageId"
						:customData="customData"></component>
					</swiper-item>
				</swiper>
			</view>
		</cell>
	</list>
</template>

<script>
	import QSTabs from '../QS-Tabs/QS-Tabs.vue';
	import ListTemp from '@/QS-UI-CONFIG/template/QS-Uni-Swiper-list/ListSeparate.vue';
	import WaterfallTemp from '@/QS-UI-CONFIG/template/QS-Uni-Swiper-list/WaterfallSeparate.vue';
	
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Uni-Swiper-list/js/props.js';
	const QSComponentMixinRes = QSComponentMixin();
	
	const dom = weex.requireModule('dom');
	// 缓存每页最多
	const MAX_CACHE_DATA = 100;

	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;
	const TAB_PRELOAD_OFFSET = 1;
	var _this;

	export default {
		mixins: [QSComponentMixinRes.mixin],
		components: {
			QSTabs,
			ListTemp,
			WaterfallTemp
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			fatherListBackgroundColor: {
				type: String,
				default: '#ffffff'
			},
			tabsBackgroundColor: {
				type: String
			},
			tabsProps: {
				type: Object
			},
			tabsType: {
				type: String
			},
			tabsHeight: {
				type: [Number, String]
			},
			tabsActiveFontSize: {
				type: [Number, String]
			},
			tabsDefFontSize: {
				type: [Number, String]
			},
			contentType: {
				typep: String,
				default: 'ListTemp'
			},
			hasRefresh: {
				type: [String, Boolean],
				default: true
			},
			refreshDistance: { //刷新距离
				type: [Number, String],
				default: 88
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
			successRefreshText: { //刷新成功文字
				type: String,
				default: '刷新成功'
			},
			failRefreshText: { //刷新失败文字
				type: String,
				default: '刷新失败'
			},
			refreshTextColor: { //刷新文字的颜色
				type: String,
				default: '#666'
			},
			refreshTextFontSize: { //刷新文字的大小
				type: String,
				default: '30rpx'
			},
			tabsUseSlot: {
				type: [Boolean, String],
				default: false
			},
			customData: {
				type: [Object,Array,String,Boolean,Number],
				default: ()=> { return {} }
			},
			...props
		},
		data() {
			return {
				pageId: "page",
				tabList: [],
				tabIndex: 0,
				cacheTab: [],
				scrollInto: "",
				indicatorLineLeft: 0,
				indicatorLineWidth: 0,
				isTap: false,
				showTitleView: true,
				pageHeight: 300,
				navbarHieght: 0,
				ntabsHeight: 44,
				refreshText: this.beforRefreshText,
				refreshing: false,
				opacity: 1,
				nContentType: this.contentType,
				nTabsUseSlot: this.tabsUseSlot
			}
		},
		watch: {
			contentType(newValue, oldValue) {
				this.setContentType(newValue);
			},
			tabsUseSlot(newValue, oldValue) {
				this.setTabsUseSlot(newValue);
			},
		},
		computed:{
			QS_nCompClass() {
				return 'QS page';
			},
			QS_nCompStyle() {
				const style = {
					'background-color': this.fatherListBackgroundColor
				}
				return style;
			},
			getHasRefresh() {
				return String(this.hasRefresh) === 'true';
			}
		},
		created() {
			_this = this;
			this.setPageHeight();
			this._lastTabIndex = 0;
			this._touchTabIndex = 0;
			this._headHeight = 0;
			this.swiperWidth = 0;
			this.tabbarWidth = 0;
			this.tabListSize = {};
		},
		mounted() {
			[300, 800, 1500, 3000].forEach(item=>{
				setTimeout(async()=>{
					await this.get_headHeight();
				}, item)
			})
		},
		methods: {
			setTabsUseSlot(bl){
				this.opacity = 0;
				setTimeout(()=>{
					this.nTabsUseSlot = bl;
					this.$nextTick(()=>{
						this.setScrollRef();
						this.opacity = 1;
					})
				}, 250)
			},
			setContentType(type) {
				this.opacity = 0;
				setTimeout(()=>{
					this.nContentType = type;
					this.$nextTick(()=>{
						this.setScrollRef();
						this.opacity = 1;
					})
				}, 250)
			},
			onpullingdown(e) {
				if (e.pullingDistance >= e.viewHeight) {
					if (this.refreshText !== this.releaseRefreshText)
						this.refreshText = this.releaseRefreshText;
				} else {
					if (this.refreshText !== this.beforRefreshText)
						this.refreshText = this.beforRefreshText;
				}
			},
			onrefresh(e) {
				this.refreshing = true;
				this.refreshText = this.isRefreshingText;
				setTimeout(()=>{
					this.refreshEnd(true);
				}, 1000)
			},
			refreshEnd(status) {
				this.refreshText = status ? this.successRefreshText : this.failRefreshText;
				setTimeout(() => {
					this.refreshing = false;
					this.refreshText = this.beforRefreshText;
				}, 1000)
			},
			fatherListLoadmore() {
				this.setScrollRef();
			},
			scrollToList() {
				dom.scrollToElement(this.$refs.swiperList);
			},
			setTabs(arr) {
				this.tabList = [];
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.tabList = arr;
						this.$nextTick(async ()=>{
							this.tabIndex = 0;
							this.setTabsHeight();
							this.pageList = this.$refs.page;
							this.selectorQuery();
							this.switchTab(this.tabIndex);
						})
					}, 0)
				})
			},
			setCustomNavbarHieght(height) {
				this.navbarHieght = height;
				this.setPageHeight();
				this.setScrollRef(this.tabIndex);
			},
			setTabsHeight(height) {
				if(height) {
					this.ntabsHeight = data.height;
				}else{
					if(this.$refs.Tabs) {
						this.$refs.Tabs.getQuery(data=>{
							this.ntabsHeight = data.height;
						});
					}
				}
			},
			setPageHeight() {
				this.pageHeight = uni.getSystemInfoSync().windowHeight - this.navbarHieght + 1;
			},
			scroll(e) {
				this.$emit('fatherListScroll', e);
			},
			ontabtap(index) {
				// console.log('tab点击:' + JSON.stringify(e));
				// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
				this.isTap = true;
				this._touchTabIndex = index;
				// #endif

				this.switchTab(index);
			},
			onswiperchange() {},
			onswiperscroll(e) {
				if (this.isTap) {
					return;
				}

				var offsetX = e.detail.dx;
				var preloadIndex = this._lastTabIndex;
				if (offsetX > TAB_PRELOAD_OFFSET) {
					preloadIndex++;
				} else if (offsetX < -TAB_PRELOAD_OFFSET) {
					preloadIndex--;
				}
				if (preloadIndex === this._lastTabIndex || preloadIndex < 0 || preloadIndex > this.pageList.length - 1) {
					return;
				}
				if (this.pageList[preloadIndex].dataList.length === 0) {
					this.loadTabData(preloadIndex);
				}
			},
			animationfinish(e) {
				let index = e.detail.current;
				// console.log('swiper滑动结束， index：' + index);
				if (this._touchTabIndex === index) {
					this.isTap = false;
				}
				this._lastTabIndex = index;
				this.switchTab(index);
				// this.updateIndicator(this.tabListSize[index].left, this.tabListSize[index].width);
			},
			get_headHeight() {
				return new Promise((rs, rj) => {
					uni.createSelectorQuery().in(this).select('#head').boundingClientRect().exec(rect => {
						const height = rect[0].height;
						if(_this._headHeight !== height) {
							this._headHeight = height;
							this.setScrollRef(undefined, height);
							this.$emit('headerContentHeightUpdate', height);
						}
						rs(height);
					});
				})
			},
			async selectorQuery() {
				// 查询 tabbar 宽度
				uni.createSelectorQuery().in(this).select('#tab-bar').boundingClientRect().exec(rect => {
					this.tabbarWidth = rect[0].width;
				});
				// 查询 tabview 宽度
				uni.createSelectorQuery().in(this).select('#tab-bar-view').boundingClientRect().exec(rect => {
					this.swiperWidth = rect[0].width;
				});

				// 因 nvue 暂不支持 class 查询
				var queryTabSize = uni.createSelectorQuery().in(this);
				for (var i = 0; i < this.tabList.length; i++) {
					queryTabSize.select('#' + this.tabList[i].id).boundingClientRect();
				}
				queryTabSize.exec(rects => {
					rects.forEach((rect) => {
						this.tabListSize[rect.dataset.id] = rect;
					})
					this.updateIndicator(this.tabListSize[this.tabIndex].left, this.tabListSize[this.tabIndex].width);
				});
			},
			updateIndicator(left, width) {
				this.indicatorLineLeft = left;
				this.indicatorLineWidth = width;
			},
			async setScrollRef(index, _headHeight) {
				index = index !== undefined?index:this.tabIndex;
				if(!_headHeight) _headHeight = await this.get_headHeight();
				this.pageList[index].setScrollRef(_headHeight - this.navbarHieght);
			},
			switchTab(index) {
				// console.log('switchTab')
				// console.log(this.pageList[index].dataList.length);
				if (this.pageList[index].dataList.length === 0) {
					this.loadTabData(index);
				}
				
				this.setScrollRef(index);

				if (this.tabIndex === index) {
					return;
				}

				// 缓存 tabId
				if (this.pageList[this.tabIndex].dataList.length > MAX_CACHE_DATA) {
					let isExist = this.cacheTab.indexOf(this.tabIndex);
					if (isExist < 0) {
						this.cacheTab.push(this.tabIndex);
					}
				}
				
				this.tabIndex = index;
				// 释放 tabId
				if (this.cacheTab.length > MAX_CACHE_PAGE) {
					let cacheIndex = this.cacheTab[0];
					this.clearTabData(cacheIndex);
					this.cacheTab.splice(0, 1);
				}
			},
			scrollTabTo(index) {
				const el = this.$refs['tabitem' + index][0];
				let offset = 0;
				// TODO fix ios offset
				if (index > 0) {
					offset = this.tabbarWidth / 2 - this.tabListSize[index].width / 2;
					if (this.tabListSize[index].right < this.tabbarWidth / 2) {
						offset = this.tabListSize[0].width;
					}
				}
				dom.scrollToElement(el, {
					offset: -offset
				});
			},
			loadTabData(index) {
				// console.log('loadTabData')
				this.pageList[index].loadData();
			},
			clearTabData(index) {
				this.pageList[index].clear();
			}
		}
	}
</script>

<style lang="scss">
	.refresh {
		align-items: center;
		justify-content: flex-end;
	}
	
	.indicator-text {
		text-align: center;
	}
	
	.indicator {
		margin-top: 16px;
	}
	
	.page {
		flex: 1;
	}

	.header {
		flex-direction: column;
	}

	.tabs {
		flex-direction: column;
		overflow: hidden;
		
		transition-property: opacity;
		transition-duration: .2s;
	}

	.tab-bar {
		width: 750rpx;
		height: 84rpx;
		flex-direction: row;
	}

	.tab-view {
		flex: 1;
	}

	.swiper-item {
		flex: 1;
		flex-direction: column;
	}

	.swiper-page {
		flex: 1;
		flex-direction: row;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}
</style>
