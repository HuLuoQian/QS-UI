<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<!-- 为性能缘故, 当tab项多时, 请尽量不要删除 v-if="show" -->
	
	<view v-if="show" class="QS">
		<!-- <view class="lists"> -->
			<view class="scroll-item" v-for="(item, index) in list" :key="index" @tap="QS_navigateTo('mine.integralOrderDetail',item)">
				<view class="left" :style="{ backgroundColor: item.status == 1 ?'#FF3366': '#CCCCCC' }">
					<text class="QS-text large weight color_ffffff">￥5.00</text>
					<text class="QS-text large weight_500 color_ffffff">优惠券</text>
				</view>
				<view class="middle">
					<text class="QS-text large weight_500">无门槛使用</text>
					<text class="QS-text mini-xx weight_500 color_808080 white-space_nowrap">有效期至2020-08-13 15:59:59</text>
				</view>
				<view class="right" v-if="item.status != 1">
					<image class="status-image" src="/static/image/used.png" mode="aspectFill"></image>
				</view>
			</view>
		<!-- </view> -->
		<!-- 列表状态展示 -->
		<view class="statusText" @tap="getList(false, true, false)" :style="{
			'color': getColor
		}">
			{{statusText.text || '暂无数据'}}
		</view>
	</view>
</template>

<script>
	import {
		Tabs
	} from '@/apis/tabs.js';
	import {
		doPageDemand
	} from '@/QS-UI-CONFIG/js/pageDemand.js';
	export default {
		props: {
			tabItem: {
				type: [Object, String],
				default () {
					return {}
				}
			},
			index: {
				type: [String, Number],
				default: ''
			},
			current: {
				type: [String, Number],
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
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
			customData: {	//由最外部传入的自定义数据
				type: [Object, String, Number, Array, Boolean],
				default: ()=>{ return {} }
			}
		},
		data() {
			return {
				list: [],
				sendData: {
					pageNum: 1,
					pageSize: 10,
					tabId: this.tabItem.id
				},
				statusText: {},
			}
		},
		computed: {
			getColor() {
				let color;
				switch (this.type) {
					case 'setColor':
						color = '#fff';
						break;
					case 'index':
						color = '#fff';
						break;
					default:
						color = '#999';
						break;
				}
				return color;
			}
		},
		created() {
			// console.log('component - created - tab:' + this.tab);
			// console.log('component - created - index:' + this.index);
		},
		methods: {
			init(refresh) {	//若是用户触发下拉刷新则refresh为true
				// this.getList(refresh, false, false);
				if (refresh) _this.$emit('refreshEnd', true);
			},
			getList(refresh, doEvent, force) {
				console.log('调用获取列表方法 ')
				let _this = this;
				doPageDemand.call(_this, {
					getDataFn: Tabs.getStopcarCouponTabs, //获取数据的方法
					successEnd() {
						if (refresh) _this.$emit('refreshEnd', true);
					},
					fail() {
						console.log('访问接口失败');
						if (refresh) _this.$emit('refreshEnd', false);
					}, //接口访问失败回调

					sendDataName: 'sendData', //携带数据字段名称
					pageNumName: 'pageNum', //携带数据中的页数字段名称
					pageSizeName: 'pageSize', //携带数据中的条数字段名称

					checkLastPageMode: false, //判断是否是最后一页的逻辑标识, 用于逻辑判断, 目前默认有两个参数 size: 判断条数, page: 判断页数, 默认为size
					newDatafields: 'list', //接口访问成功后获取列表数据字段名称, 可用. 链式获取
					dataLastPageName: false, //接口访问成功后数据中的最大页数字段名称, 可用. 链式获取
					sizeName: false, //接口访问成功后数据中条数字段名称, 可用. 链式获取

					setName: 'list', //页面中列表数据字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					statusTextName: 'statusText', //页面中列表状态字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					lastPageName: false, //页面中最后一页字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					waitingName: false, //页面中获取数据等待字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略

					refresh, //刷新标识, 若为true则会将携带数据中的页数重置为1
					force, //强制标识, 若为true则会忽略等待标识为true时的跳过操作
					doEvent, //进入状态判断标识, 若为true则会进入判断列表status而进行相应操作

					noDataText: false, //访问接口后若数据长度为0则可自定义为空时文字

					refreshClear: false, //刷新时是否清空数据
				})
			},
			updated() {
				this.$emit('toOldScrollTop');
			}
			/* itemClick(ind) {
				uni.showToast({
					title: `第${this.index}列 第${ind}项`
				})
			} */
		}
	}
</script>

<style scoped lang="scss">
	.lists {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.scroll-item {
		width: 100%;
		height: 140rpx;
		/* padding: 28rpx; */
		background-color: white;
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		margin-bottom: 20rpx;
		overflow: hidden;
		.left{
			width: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			padding: 25rpx 45rpx;
		}
		.middle{
			flex: 5;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 25rpx;
		}
		.right{
			width: 120rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			padding: 15rpx 0;
			.status-image{
				height: 80rpx;
				width: 80rpx;
				border-radius: 50%;
			}
		}
	}
</style>
