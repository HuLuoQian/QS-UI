<template>
	<view 
	class="QS-Tabs"
	:class="getClass"
	:style="getStyle">
		<scroll-view ref="scrollViewX" id="scrollViewX" class="scrollViewX" :scroll="false" :scroll-x="true" :show-scrollbar="false"
		 :scroll-into-view="getScrollInto" :style="{
			height: height,
			width: width || '750rpx'
		}">
			<view class="scrollViewX-column">
				<view class="scrollViewX-row" :class="getModeClass">
					<view class="tab-item" :style="{
						'padding-left': space,
						'padding-right': space,
					}" v-for="(tab,index) in nTabs"
					 :key="index" :id="'tabitem'+index" :ref="'tabitem'+index" :data-current="index" @click="ontabtap">
						<view class="rel-item">
							<temp 
							:isActive="tabIndex==index"
							:tab="tab"
							:height="height" 
							:fontSize="tabIndex==index ? activeFontSize: defFontSize"
							:fontWeight="String(activeFontBold)==='true'? (tabIndex==index ?'bold':''):''"
							:color="tabIndex==index ? activeColor: defColor"
							:activeColor="activeColor"
							:defColor="defColor"
							:props="nprops"
							:index="index"
							:tabsLen="nTabs.length"
							:type="type"></temp>
						</view>
						<view class="abs-item">
							<temp 
							:isActive="tabIndex==index"
							:tab="tab"
							:height="height" 
							:fontSize="tabIndex==index ? activeFontSize: defFontSize"
							:fontWeight="String(activeFontBold)==='true'? (tabIndex==index ?'bold':''):''"
							:color="tabIndex==index ? activeColor: defColor"
							:activeColor="activeColor"
							:defColor="defColor"
							:props="nprops"
							:index="index"
							:tabsLen="nTabs.length"
							:type="type"></temp>
						</view>
					</view>
				</view>
				<!-- <view class="scroll-view-indicator">
					<view ref="underline" class="scroll-view-underline" :class="isTap ? 'scroll-view-animation':''" :style="{left: indicatorLineLeft + 'px', width: indicatorLineWidth + 'px'}"></view>
				</view> -->
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import temp from '@/QS-UI-CONFIG/components/QS-Tabs/separate/separate.vue';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Tabs/js/props.js';
	const QSComponentMixinRes = QSComponentMixin();
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	// #endif
	const defProps = { nameField: 'name' };
	export default {
		mixins: [QSComponentMixinRes.mixin],
		components: {temp},
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
				default: '15rpx'
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
				default: '#000000'
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
				default: ()=>{ return {...defProps} }
			},
			type: {
				type: String,
				default: ''
			},
			backgroundColor: {
				type: String,
				default: ''
			},
			position: {
				type: String,
				default: ''
			},
			top: {
				type: [String, Number],
				default: ''
			},
			bottom: {
				type: [String, Number],
				default: ''
			},
			zIndex: {
				type: [String, Number],
				default: 999 
			},
			observeSticky: {
				type: [String, Boolean],
				default: true
			},
			observeStickyTop: {
				type: [String, Number],
				default: 0
			},
			mode: {
				type: String,
				default: 'scroll'
			},
			...props
		},
		data() {
			return {
				nTabs: [],
				scrollInto: '',
				nprops: { ...defProps, ...this.props }
			}
		},
		watch: {
			tabs(n) {
				this.setTabs(n);
			},
			props(n) {
				this.nprops = { ...defProps, ...this.props };
			}
		},
		computed: {
			getModeClass() {
				if(this.mode == 'scroll') return '';
				if(this.mode == 'center') return 'center';
			},
			getScrollInto() {
				return 'tabitem' + this.tabIndex;
			},
			QS_nCompStyle() {
				const obj = {};
				if(this.backgroundColor) obj.backgroundColor = this.backgroundColor;
				if(this.position) obj.position = this.position;
				if(this.top) obj.top = this.top;
				if(this.bottom) obj.bottom = this.bottom;
				if(this.zIndex) obj.zIndex = this.zIndex;
				if(this.width) obj.width = this.width;
				return obj;
			}
		},
		created() {
			this.setTabs(this.tabs);
		},
		methods: {
			setTabs(arr) {
				this.nTabs = arr;
			},
			ontabtap(e) {
				this.$emit('click', e.target.dataset.current || e.currentTarget.dataset.current)
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
				view.select('.scrollViewX').fields({
					size: true
				})
				view.exec(res => {
					console.log('获取tabs布局信息成功: ' + JSON.stringify(res))
					if (cb && typeof cb === 'function') cb(res[0])
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.QS-Tabs {
		// height: 44px;
	}

	.scrollViewX {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
	.scrollViewX-column{
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		display: flex;
		/* #endif */
		flex-direction: column;
	}
	.scrollViewX-row{
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		display: flex;
		/* #endif */
		flex-direction: row;
		&.center{
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
	.abs-item{
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
