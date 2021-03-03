<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<view class="container" :class="getFixedClass">
		<scroll-view scroll-y class="scrollView" lower-threshold="200" :scroll-top="scrollTop" @scroll="scrollFn"
		 @scrolltolower="getList(false, false, false)">
			<view class="scroll-container" :style="{ 'opacity': scrollToTopEnd?1:0, padding: contentPadding }">
				<!-- 由type属性控制展示模板 -->
				<block v-if="type === 'coupon'">
					<view class="width100">
						<coupon ref="component" :tabItem="tab" :index="index" :current="current" :type="type" :show="getShow"
						 :readyRefresh="readyRefresh" @refreshEnd="refreshEnd" 
						 @toOldScrollTop="toOldScrollTop" :refreshDistance="refreshDistance" :customData="customData"></coupon>
					</view>
				</block>
				<block v-else-if="type === 'stopcarCoupon'">
					<view class="width100">
						<stopcarCoupon ref="component" :tabItem="tab" :index="index" :current="current" :type="type" :show="getShow"
						 :readyRefresh="readyRefresh" @refreshEnd="refreshEnd" 
						 @toOldScrollTop="toOldScrollTop" :refreshDistance="refreshDistance" :customData="customData"></stopcarCoupon>
					</view>
				</block>
				<block v-else-if="type === 'orders'">
					<view class="width100">
						<orders ref="component" :tabItem="tab" :index="index" :current="current" :type="type" :show="getShow"
						 :readyRefresh="readyRefresh" @refreshEnd="refreshEnd" 
						 @toOldScrollTop="toOldScrollTop" :refreshDistance="refreshDistance" :customData="customData"></orders>
					</view>
				</block>
				<block v-else-if="type === 'integralRecord'">
					<view class="width100">
						<integralRecord ref="component" :tabItem="tab" :index="index" :current="current" :type="type" :show="getShow"
						 :readyRefresh="readyRefresh" @refreshEnd="refreshEnd" 
						 @toOldScrollTop="toOldScrollTop" :refreshDistance="refreshDistance" :customData="customData"></integralRecord>
					</view>
				</block>
				<block v-else>
					<view class="width100">
						<!-- <def ref="component" :tabItem="tab" :index="index" :current="current" :type="type" :show="getShow"
						 :readyRefresh="readyRefresh" @refreshEnd="refreshEnd" 
						 @toOldScrollTop="toOldScrollTop" :refreshDistance="refreshDistance" :customData="customData"></def> -->
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 引入./components下的模板, 根据type筛选, 别忘了下面components中注册
	import stopcarCoupon from './template/stopcar-coupon.vue';
	import coupon from './template/coupon.vue';
	import orders from './template/orders.vue';
	import integralRecord from './template/integralRecord.vue';



	// 组件必须
	import {
		QSTabsWxsListMixin
	} from '@/QS-UI/components/QS-Tabs-wxs-list/mixins/QS-Tabs-wxs-list-mixin.js';
	export default {
		components: {
			stopcarCoupon,
			coupon,
			orders,
			integralRecord
		},
		mixins: [QSTabsWxsListMixin()], // 组件必须
		props: {
			tab: {
				type: [Object, String, Number, Array, Boolean],
				default () {
					return {}
				}
			},
			index: { // 保证性能勿删
				type: [String, Number],
				default: ''
			},
			current: { // 保证性能勿删
				type: [String, Number],
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			show: {
				type: [Boolean, String],
				default: false
			},
			readyRefresh: {
				type: [Boolean, String],
				default: false
			},
			refreshDistance: {
				type: Number,
				default: 0
			},
			customData: {
				type: [Object, String, Number, Array, Boolean],
				default: ()=>{ return {} }
			},
			contentPadding: {
				type: [String, Number],
				default: '25rpx'
			}
		},
		data() {
			return {

			}
		},
		methods: {
			init(refresh) { //若是用户触发下拉刷新则refresh为true
				const ref = this.$refs.component;
				if(!ref) {
					console.log('模板未绑定ref')
					return;
				}
				const initFn = this.$refs.component.init;
				if(initFn && typeof initFn === 'function') this.$refs.component.init(refresh);
			},
			getList(refresh, doEvent, force) {
				const ref = this.$refs.component;
				if(!ref) {
					console.log('模板未绑定ref')
					return;
				}
				const getListFn = this.$refs.component.getList;
				if(getListFn && typeof getListFn === 'function') this.$refs.component.getList(refresh, doEvent, force);
			},
			refreshEnd(status) {
				this.$emit('refreshEnd', status ? 4 : 5);
			}
		}
	}
</script>

<style scoped>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.scrollView {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.scroll-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx;
	}
	
	.scroll-container.freeze {
		height: 100%;
		overflow: hidden;
	}
	
	.width100 {
		width: 100%;
	}
	
</style>
