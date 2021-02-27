<template>
	<view class="QS">
		<view class="padding_25rpx">
			<view id="toast" class="padding_25rpx bgColor_ffffff border-radius_10rpx toast">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">Toast</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="toast">展示Toast</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_666666 weight flex-wrap_wrap">uni.$qs.toast || uni.$qs.showToast 参数说明(默认值):</text>
				<QS-P height="25rpx"></QS-P>
				<showProps :prop="toastProp" merge></showProps>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text color_666666">toast只不过在原有的基础上多了title自动转String的操作, 并支持merge传参</text>
			</view>
			<QS-P height="25rpx"></QS-P>
			<view id="modal" class="padding_25rpx bgColor_ffffff border-radius_10rpx modal">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">Modal</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="modal">展示Modal</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_666666 weight flex-wrap_wrap">uni.$qs.modal || uni.$qs.showModal 参数说明(默认值):</text>
				<QS-P height="25rpx"></QS-P>
				<showProps :prop="modalProp" merge></showProps>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text color_666666">modal只不过在原有的基础上支持merge传参</text>
			</view>
			<QS-P height="25rpx"></QS-P>
			<view id="actionSheet" class="padding_25rpx bgColor_ffffff border-radius_10rpx actionSheet">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">ActionSheet</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="actionSheet">展示ActionSheet</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text large color_666666 weight flex-wrap_wrap">uni.$qs.actionSheet || uni.$qs.showActionSheet 参数说明(默认值):</text>
				<QS-P height="25rpx"></QS-P>
				<showProps :prop="actionSheetProp" merge></showProps>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text color_666666">actionSheet只不过在原有的基础上支持merge传参</text>
			</view>
		</view>
		<QS-NodeNav ref="QSNodeNav" :nodes="nodes" :fixedTop="fixedTop" :offsetTop="offsetTop" :scrollToOffsetTop="scrollToOffsetTop"></QS-NodeNav>
		<QS-BackTop ref="QSBackTop"></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// #ifdef H5
				fixedTop: '44px',
				offsetTop: uni.$qs.rpxUnit2px('77rpx') + 44,
				// #endif
				// #ifndef H5
				fixedTop: 0,
				offsetTop: uni.$qs.rpxUnit2px('77rpx'),
				// #endif
				scrollToOffsetTop: uni.$qs.rpxUnit2px('25rpx'),
				nodes: [ { node: '#toast', id: 'toast', text: 'toast' }, { node: '#modal', id: 'modal', text: 'modal' }, { node: '#actionSheet', id: '#actionSheet', text: 'actionSheet' } ],
				toastProp: [
					{
						name: 'title',
						value: '',
						des: '提示的内容，会自动转String'
					},
					{
						name: 'duration',
						value: 1500,
						des: '提示的延迟时间，单位毫秒，默认：1500'
					},
					{
						name: 'mask',
						value: false,
						des: '是否显示透明蒙层，防止触摸穿透，默认：false'
					},
					{
						name: 'icon',
						value: 'none',
						des: '图标'
					},
					{
						name: 'image',
						value: '',
						des: '自定义图标的本地路径'
					},
					{
						name: 'position',
						value: 'center',
						des: '纯文本轻提示显示位置，填写有效值后只有 title 属性生效'
					},
					{
						name: 'success',
						value: '() => {}',
						des: '接口调用成功的回调函数'
					},
					{
						name: 'fail',
						value: '() => {}',
						des: '接口调用失败的回调函数'
					},
					{
						name: 'complete',
						value: '() => {}',
						des: '接口调用结束的回调函数（调用成功、失败都会执行）'
					},
				],
				modalProp: [
					{
						name: 'content',
						value: '',
						des: '提示的内容'
					},
					{
						name: 'title',
						value: '',
						des: '提示的标题'
					},
					{
						name: 'showCancel',
						value: true,
						des: '是否显示取消按钮，默认为 true'
					},
					{
						name: 'cancelText',
						value: '取消',
						des: '取消按钮的文字，默认为"取消"，最多 4 个字符'
					},
					{
						name: 'cancelColor',
						value: '',
						des: '取消按钮的文字颜色，默认为"#000000"'
					},
					{
						name: 'confirmText',
						value: '确定',
						des: '确定按钮的文字，默认为"确定"，最多 4 个字符'
					},
					{
						name: 'confirmColor',
						value: '',
						des: '确定按钮的文字颜色，H5平台默认为"#007aff"，微信小程序平台默认为"#3CC51F"，百度小程序平台默认为"#3c76ff"'
					},
					{
						name: 'success',
						value: '() => {}',
						des: '接口调用成功的回调函数'
					},
					{
						name: 'fail',
						value: '() => {}',
						des: '接口调用失败的回调函数'
					},
					{
						name: 'complete',
						value: '() => {}',
						des: '接口调用结束的回调函数（调用成功、失败都会执行）'
					},
				],
				actionSheetProp: [
					{
						name: 'itemList',
						value: '[]',
						des: '按钮的文字数组'
					},
					{
						name: 'itemColor',
						value: '#000000',
						des: '按钮的文字颜色，字符串格式，默认为"#000000"'
					},
					{
						name: 'popover',
						value: 'null',
						des: '大屏设备弹出原生选择按钮框的指示区域，默认居中显示'
					},
					{
						name: 'success',
						value: '() => {}',
						des: '接口调用成功的回调函数'
					},
					{
						name: 'fail',
						value: '() => {}',
						des: '接口调用失败的回调函数'
					},
					{
						name: 'complete',
						value: '() => {}',
						des: '接口调用结束的回调函数（调用成功、失败都会执行）'
					},
				]
			}
		},
		onReady() {
			this.$refs.QSNodeNav.init();
			// uni.createIntersectionObserver(this)
			// .relativeToViewport()
			// .observe('#toast', res=>{
			// 	console.log(res);
			// });
			// const nodes = this.nodes;
			// for(let i = 0; i < nodes.length; i++) {
			// 	const item = nodes[i];
			// 	console.log(item.node)
			// 	const ob = uni.createIntersectionObserver(this)
			// 	.relativeToViewport()
			// 	.observe(item.node, res=>{
			// 		console.log(res);
			// 	});
			// }
		},
		computed: {
			nodeNavShow() {
				return this.scrollTop > 50;
			}
		},
		methods: {
			toast() {
				uni.$qs.toast('toast');
			},
			modal() {
				uni.$qs.modal('展示modal');
			},
			actionSheet() {
				uni.$qs.actionSheet(['测试1', '测试2'])
			}
		}
	}
</script>

<style>

</style>
