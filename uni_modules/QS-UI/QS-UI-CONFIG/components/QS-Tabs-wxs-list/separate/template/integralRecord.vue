<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<!-- 为性能缘故, 当tab项多时, 请尽量不要删除 v-if="show" -->

	<view v-if="show" class="QS">
		<view class="scroll-item" v-for="(item, index) in list" :key="index" @tap="QS_navigateTo('integralMall.integralOrderDetail', { id: item.id })">
			<view class="title">
				<text class="left">订单编号: {{item.orderNo || ''}}</text>
				<text class="right">{{item.statusText}}</text>
			</view>
			<view class="products">
				<view class="product">
					<image class="image" :src="item.spu.img" mode="aspectFill"></image>
					<QS-P width="25rpx"></QS-P>
					<view class="flex_1 flex_column">
						<text class="name">{{item.spu.spuTitle || ''}}</text>
						<QS-P height="25rpx"></QS-P>
						<text class="QS-text mini color_888888">{{item.spu.title || ''}}</text>
					</view>
				</view>
			</view>
			<view class="info">
				<text class="date">下单日期: {{item.spu.createDate | dateFormat}}</text>
				<text class="total">{{item.spu.num}}件商品共：{{item.totalPoint}}积分</text>
			</view>
			<view class="handle">
				<view class="item" v-if="item.status == 10">
					<QSButton height="50rpx" width="130rpx" plain borderRadius="60px" fontSize="26rpx" @click="cancel(item)">取消</QSButton>
				</view>
				<view class="item">
					<QSButton height="50rpx" width="150rpx" plain borderRadius="60px" fontSize="26rpx" @click="QS_navigateTo('integralMall.integralOrderDetail', { id: item.id })">查看订单</QSButton>
				</view>
			</view>
		</view>
		<!-- 列表状态展示 -->
		<view class="statusText" @tap="getList(false, true, false)">
			{{statusText.text || '暂无数据'}}
		</view>
	</view>
</template>

<script>
	import { getOrderPage, cancel } from '@/apis/order.js';
	import {
		doPageDemand
	} from '@/QS-UI-CONFIG/js/pageDemand.js';
	import QSButton from '@/uni_modules/QS-UI/components/QS-Button/QS-Button.vue';
	export default {
		components: {
			QSButton
		},
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
			customData: { //由最外部传入的自定义数据
				type: [Object, String, Number, Array, Boolean],
				default: () => {
					return {}
				}
			}
		},
		// filters: {
		// 	filterStatus(status) {
		// 		switch (status) {
		// 			case 10:
		// 				return '未支付';
		// 				break;
		// 			case 20:
		// 				return '待核销';
		// 				break;
		// 			case 30:
		// 				return '已核销';
		// 				break;
		// 			case 80:
		// 				return '已取消';
		// 				break;
		// 			case 90:
		// 				return '已过期';
		// 				break;
		// 			default:
		// 				return '未知状态';
		// 				break;
		// 		}
		// 	}
		// },
		data() {
			return {
				list: [],
				sendData: {
					pageNo: 1,
					pageSize: 10,
					status: this.tabItem.status
				},
				statusText: {},
			}
		},
		created() {
			// console.log('component - created - tab:' + this.tab);
			// console.log('component - created - index:' + this.index);
		},
		methods: {
			cancel(item) {
				cancel({
					orderNo: item.orderNo
				})
					.then(res=>{
						this.init(true);
					})
					.catch(err=>{
						
					})
			},
			init(refresh) { //若是用户触发下拉刷新则refresh为true
				this.getList(refresh, false, false);
				// if (refresh) _this.$emit('refreshEnd', true);
			},
			getList(refresh, doEvent, force) {
				console.log('调用获取列表方法 ')
				let _this = this;
				doPageDemand.call(_this, {
					getDataFn: getOrderPage, //获取数据的方法
					successEnd() {
						if (refresh) _this.$emit('refreshEnd', true);
					},
					fail() {
						console.log('访问接口失败');
						if (refresh) _this.$emit('refreshEnd', false);
					}, //接口访问失败回调

					sendDataName: 'sendData', //携带数据字段名称
					pageNumName: 'pageNo', //携带数据中的页数字段名称
					pageSizeName: 'pageSize', //携带数据中的条数字段名称

					checkLastPageMode: false, //判断是否是最后一页的逻辑标识, 用于逻辑判断, 目前默认有两个参数 size: 判断条数, page: 判断页数, 默认为size
					newDatafields: 'items', //接口访问成功后获取列表数据字段名称, 可用. 链式获取
					dataLastPageName: 'totalPageNo', //接口访问成功后数据中的最大页数字段名称, 可用. 链式获取
					sizeName: 'total', //接口访问成功后数据中条数字段名称, 可用. 链式获取

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
	.scroll-item {
		background-color: #ffffff;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;

		.title {
			width: 100%;
			padding: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #F2F2F2;

			.left {
				font-size: 28rpx;
				color: #000000;
			}

			.right {
				color: #FF6666;
				font-size: 28rpx;
			}
		}

		.products {
			display: flex;
			flex-direction: column;

			.product {
				display: flex;
				flex-direction: row;
				padding: 20rpx;

				.image {
					width: 150rpx;
					height: 150rpx;
					background: #CBCBCB;
					border-radius: 10rpx;
					border: 1px solid #fafafa;
				}

				.name {
					font-size: 32rpx;
					color: #000000;
					flex-wrap: wrap;
				}
			}
		}

		.info {
			padding: 0 20rpx 20rpx 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #F2F2F2;

			.date {
				font-size: 24rpx;
				color: #999999;
			}

			.total {
				font-size: 24rpx;
				color: #000000;
			}
		}

		.handle {
			padding: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;

			.item {
				margin-left: 20rpx;
			}
		}
	}
</style>
