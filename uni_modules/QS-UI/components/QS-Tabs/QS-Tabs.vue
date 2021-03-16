<template>
	<view :id="id" class="QS-Tabs" :class="getClass" :style="getStyle">
		<scroll-view 
		ref="scrollViewX" 
		id="scrollViewX" 
		class="scrollViewX" 
		:scroll="false" 
		:scroll-x="true"
		:show-scrollbar="false" 
		:scroll-into-view="getScrollInto" 
		:style="{
			height: height,
			width: width
		}">
			<view ref="scrollViewX-row" id="scrollViewX-row" class="scrollViewX-row" :class="getModeClass">
				<slot v-if="hasLine && lineUseSlot" name="line" :currentTabInfo="getTabInfo"></slot>
				<block v-else-if="hasLine && !lineUseSlot">
					<lineSeperate :lineType="lineType" :currentTabInfo="getTabInfo" :lineColor="getLineColor" :theme="theme"></lineSeperate>
				</block>
				<view class="tab-item" :style="{
					'padding-left': space,
					'padding-right': space,
					flex: itemFull?1:'none'
				}" v-for="(tab,index) in nTabs" :key="index" :id="'tabitem'+index" :ref="'tabitem'+index" :data-current="index"
					@click="ontabtap">
					<view class="rel-item">
						<temp :isActive="tabIndex==index" :tab="tab" :height="height"
							:fontSize="tabIndex==index ? activeFontSize: defFontSize"
							:fontWeight="String(activeFontBold)==='true'? (tabIndex==index ?'bold':''):''"
							:color="tabIndex==index ? getActiveColor: defColor" :props="nprops" :index="index"
							:tabsLen="nTabs.length" :type="type">
						</temp>
					</view>
					<view class="abs-item">
						<temp :isActive="tabIndex==index" :tab="tab" :height="height"
							:fontSize="tabIndex==index ? activeFontSize: defFontSize"
							:fontWeight="String(activeFontBold)==='true'? (tabIndex==index ?'bold':''):''"
							:color="tabIndex==index ? getActiveColor: defColor" :props="nprops" :index="index"
							:tabsLen="nTabs.length" :type="type">
						</temp>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import temp from '@/QS-UI-CONFIG/components/QS-Tabs/separate/separate.vue';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Tabs/js/props.js';
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	import lineSeperate from '@/QS-UI-CONFIG/components/QS-Tabs/line-separate/separate.vue';
	import theme from '@/QS-UI-CONFIG/css/theme.js';
	const QSComponentMixinRes = QSComponentMixin({
		componentType: 'QS-Tabs'
	});
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	// #endif
	const defProps = {
		nameField: 'name'
	};
	var id = 0;
	export default {
		mixins: [QSComponentMixinRes.mixin],
		components: {
			temp,
			lineSeperate
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			width: {
				type: [String, Number],
				default: '750rpx'
			},
			height: {
				type: [String, Number],
				default: '88rpx'
			},
			tabs: {
				type: Array,
				default: () => []
			},
			space: {
				type: [String, Number],
				default: '50rpx'
			},
			autoScrollInto: {
				type: [String, Boolean],
				default: true
			},
			activeFontSize: {
				type: [String, Number],
				default: '30rpx'
			},
			defFontSize: {
				type: [String, Number],
				default: '30rpx'
			},
			activeFontBold: {
				type: [String, Boolean],
				default: true
			},
			activeColor: {
				type: String,
				default: ''
			},
			defColor: {
				type: String,
				default: '#999999'
			},
			tabIndex: {
				type: [String, Number],
				default: 0
			},
			props: {
				type: Object,
				default: () => {
					return {
						...defProps
					}
				}
			},
			type: {
				type: String,
				default: ''
			},
			backgroundColor: {
				type: String,
				default: ''
			},
			mode: {
				type: String,
				default: 'auto'
			},
			hasLine: {
				type: Boolean,
				default: true
			},
			lineType: {
				type: String,
				default: ''
			},
			lineUseSlot: {
				type: Boolean,
				default: false
			},
			lineColor: {
				type: String,
				default: ''
			},
			theme: {
				type: String,
				default: 'default'
			},
			itemFull: {
				type: Boolean,
				default: true
			},
			...props
		},
		data() {
			return {
				id: `QS-Tabs-${id++}`,
				nTabs: [],
				scrollInto: '',
				nprops: {
					...defProps,
					...this.props
				},
				containerWidth: 0,
				tabsWidth: 0,
				tabsInfo: [],
			}
		},
		watch: {
			tabs(n) {
				this.setTabs(n);
			},
			space() {
				this.$nextTick(() => {
					this.getContainerWidth()
				})
			},
			width() {
				this.$nextTick(() => {
					this.getQuery()
				})
			},
			props(n) {
				this.nprops = {
					...defProps,
					...n
				};
			}
		},
		computed: {
			// getTabsWidth() {
			// 	return rpxUnit2px(this.width || '750rpx');
			// },
			getModeClass() {
				if (this.mode && this.mode !== 'auto') return this.mode;
				if (this.containerWidth > this.tabsWidth) return '';
				if (this.mode == 'scroll') return '';
				return 'center';
			},
			getScrollInto() {
				if(!this.autoScrollInto) return '';
				return 'tabitem' + this.tabIndex;
			},
			QS_nCompStyle() {
				const obj = {};
				if (this.backgroundColor) obj.backgroundColor = this.backgroundColor;
				return obj;
			},
			getTabInfo() {
				const d = (this.tabsInfo[this.tabIndex] || {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					width: 0,
					height: 0
				});
				return d;
			},
			getActiveColor() {
				return this.activeColor || theme[`${this.theme}Color`];
			},
			getLineColor() {
				const color = this.lineColor || theme[this.theme];
				return color
			},
		},
		created() {
			this.setTabs(this.tabs);
		},
		mounted() {
			this.getContainerWidth();
			// this.getQuery();
		},
		methods: {
			setTabs(arr) {
				this.nTabs = Object.freeze(arr);
				this.$nextTick(() => {
					this.getContainerWidth();
				})
			},
			ontabtap(e) {
				this.$emit('click', e.target.dataset.current === undefined ? e.currentTarget.dataset.current : e.target
					.dataset.current)
			},
			getContainerWidth() {
				// #ifdef APP-NVUE
				const promiseArr = [];
				for (let i = 0; i < this.nTabs.length; i++) {
					promiseArr.push(new Promise((rs, rj) => {
						dom.getComponentRect(this.$refs[`tabitem${i}`], option => {
							rs(option.size);
						})
					}))
				}

				Promise.all(promiseArr)
					.then(res => {
						this.tabsInfo = Object.freeze(res);
						this.containerWidth = res.reduce((pre, cur, obj) => {
							return cur.width + pre;
						}, 0);
					})
					.catch(err => {
						conosle.log('获取tab-item布局信息失败')
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
				view.select(`#scrollViewX-row`).fields({
					size: true,
					rect: true,
					scrollOffset: true
				})
				for (let i = 0; i < this.nTabs.length; i++) {
					view.select(`#${this.id} #tabitem${i}`).fields({
						size: true,
						rect: true
					})
				}
				view.exec(data => {
					const scrollInfo = data.shift();
					this.tabsWidth = scrollInfo.width;
					// console.log('tabs scroll 布局信息:', JSON.stringify(scrollInfo));
					const res = data;
					// console.log('tabitem 布局信息:', JSON.stringify(res));
					let diffLeft = 0;
					for (let i = 0; i < res.length; i++) {
						const item = res[i];
						if (!item) return;
						if (this.getModeClass == 'center') {
							item.left -= scrollInfo.left;
						} else {
							if (!i) {
								diffLeft = item.left;
							}
							item.left -= diffLeft;
						}
					}
					this.tabsInfo = Object.freeze(res);
					this.containerWidth = res.reduce((pre, cur, obj) => {
						return cur.width + pre;
					}, 0);
				})
				// #endif
			},
			getQuery(cb) {
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['scrollViewX'], option => {
					// console.log('获取tabs布局信息成功: ' + JSON.stringify(option))
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
				view.select(`.scrollViewX`).fields({
					size: true
				})
				view.exec(res => {
					// console.log('获取tabs布局信息成功: ' + JSON.stringify(res))
					this.tabsWidth = res[0].width;
					if (cb && typeof cb === 'function') cb(res[0])
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.QS-Tabs {
	}

	.scrollViewX {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.scrollViewX-column {
		position: relative;
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.scrollViewX-row {
		position: relative;
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		display: flex;
		/* #endif */
		flex-direction: row;

		&.center {
			justify-content: center;
		}
	}

	.scrollViewX-container {
		flex-direction: row;
	}

	.tab-item {
		position: relative;
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		flex-direction: row;
	}

	.tab-item-title {
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		display: flex;
		white-space: nowrap;
		/* #endif */
	}

	.rel-item {
		opacity: 0;
		pointer-events: none;
	}

	.abs-item {
		position: absolute;
		top: 0;
		left: 0;
		/* #ifndef APP-NVUE */
		height: 100%;
		width: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}
</style>
