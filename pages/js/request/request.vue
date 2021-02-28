<template>
	<view class="QS">
		<view class="padding_25rpx">
			<view class="padding_25rpx bgColor_ffffff border-radius_10rpx">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">演示示例</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="get">访问接口</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="getUseDebounce">访问接口（防抖）,快速点击注意控制台打印</QS-Button>
			</view>
			<QS-P height="25rpx"></QS-P>
			<view class="padding_25rpx bgColor_ffffff border-radius_10rpx">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">说明</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<showProps :prop="prop"></showProps>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text color_666666 flex-wrap_wrap"></text>
			</view>
		</view>
		
		<QS-BackTop ref="QSBackTop"></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prop: [
					{ name: 'name', value: '', des: '接口的名称, 传入会在控控制台中显示方便调试' },
					{ name: 'url', value: '', des: '接口的url地址, 若传该参数则会略过urlField' },
					{ name: 'urlField', value: '', des: '从QS-UI-CONFIG/config/apis.js->interfaces 对象中 .链式获取url的值' },
					{ name: 'useDebounce', value: false, des: '是否防抖' },
					{ name: 'sendData', value: '{...}', des: '传给uni.request的参数, 其中method默认为GET' },
					{ name: 'check', value: true, des: '是否校验返回数据, 在QS-UI-CONFIG/config/request.js->checkRes配置统一校验返回数据方法' },
					{ name: 'checkType', value: 'code200', des: '校验返回数据方式, 默认校验res.code == 200, 在QS-UI-CONFIG/config/request.js->checkRes配置统一校验返回数据方法' },
					{ name: 'field', value: '', des: '.链式获取返回数据' },
					{ name: 'proxyFn', value: '', des: '可操作返回数据的代理函数, 可以返回Promise对象' },
					{ name: 'loading', value: false, des: '是否显示uni.showLoading' },
					{ name: 'contentType', value: '', des: '如果传"form", 则会转换为application/x-www-form-urlencoded, 否则默认为 application/json' },
					{ name: 'urlAppendData', value: false, des: 'sendData.data中的参数是否拼接在url后面' },
				]
			}
		},
		methods: {
			get() {
				// 拿的 hello uni-app 示例中的 请求接口
				uni.$qs.request({
					url: 'https://unidemo.dcloud.net.cn/ajax/echo/json',
					sendData: {
						data: {
							name: 'uni-app',
							noncestr: Date.now()
						}
					},
					check: false,
					loading: true
				})
					.then(res=>{
						console.log('请求结果', res);
						uni.$qs.toast(`请求结果: ${JSON.stringify(res)}`)
					})
			},
			getUseDebounce() {
				// 拿的 hello uni-app 示例中的 请求接口
				uni.$qs.request({
					url: 'https://unidemo.dcloud.net.cn/ajax/echo/json',
					sendData: {
						data: {
							code: 200,
							name: 'uni-app',
							noncestr: Date.now()
						}
					},
					check: true,
					loading: true,
					useDebounce: true
				})
					.then(res=>{
						console.log('请求结果', res);
						uni.$qs.toast(`请求结果: ${JSON.stringify(res)}`)
					})
			}
		}
	}
</script>

<style>

</style>
