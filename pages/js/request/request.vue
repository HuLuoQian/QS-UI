<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">演示示例</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="get">访问接口</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="getUseDebounce">防抖,快速点击注意控制台打印</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="urlFieldDemo">演示urlField作用</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="fieldDemo">演示field作用, 注意返回结果 </QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="proxyFnDemo">演示proxyFn作用</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="proxyFnPromiseDemo">演示proxyFn作用, Promise异步</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="loginDemo">演示拦截登录</QS-Button>
				<QS-P height="25rpx"></QS-P>
				<QS-Button @click="agilityDemo">更灵活的访问</QS-Button>
			</view>
			<QS-P height="25rpx"></QS-P>
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<view class="flex_row_c_c">
					<text class="QS-text large-x weight">说明</text>
				</view>
				<QS-P height="25rpx"></QS-P>
				<showProps :prop="prop"></showProps>
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text color_666666 flex-wrap_wrap">在QS-UI-CONFIG/config/request.js 中可以配置request相关钩子函数, 具体请看QS-UI-CONFIG/config/request.js页面</text>
			</view>
		</view>

		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prop: [{
						name: 'name',
						value: '',
						des: '接口的名称, 传入会在控控制台中显示方便调试'
					},
					{
						name: 'url',
						value: '',
						des: '接口的url地址, 若传该参数则会略过urlField'
					},
					{
						name: 'urlField',
						value: '',
						des: '从QS-UI-CONFIG/config/apis.js->interfaces 对象中 .链式获取url的值'
					},
					{
						name: 'useDebounce',
						value: false,
						des: '是否防抖'
					},
					{
						name: 'sendData',
						value: '{...}',
						des: '传给uni.request的参数, 其中method默认为GET'
					},
					{
						name: 'check',
						value: true,
						des: '是否校验返回数据, 在QS-UI-CONFIG/config/request.js->checkRes配置统一校验返回数据方法'
					},
					{
						name: 'checkType',
						value: 'code200',
						des: '校验返回数据方式, 默认校验res.code == 200, 在QS-UI-CONFIG/config/request.js->checkRes配置统一校验返回数据方法'
					},
					{
						name: 'field',
						value: '',
						des: '.链式获取返回数据'
					},
					{
						name: 'proxyFn',
						value: '',
						des: '可操作返回数据的代理函数, 可以返回Promise对象'
					},
					{
						name: 'loading',
						value: false,
						des: '是否显示uni.showLoading'
					},
					{
						name: 'contentType',
						value: '',
						des: '如果传"form", 则会转换为application/x-www-form-urlencoded, 否则默认为 application/json'
					},
					{
						name: 'urlAppendData',
						value: false,
						des: 'sendData.data中的参数是否拼接在url后面'
					},
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
						loading: true,
						contentType: 'form'	//为了uni接口的跨域问题设置hearders的contentType为application/x-www-form-urlencoded
					})
					.then(res => {
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
						check: true, //默认为true
						loading: true,
						useDebounce: true,
						contentType: 'form'
					})
					.then(res => {
						console.log('请求结果', res);
						uni.$qs.toast(`请求结果: ${JSON.stringify(res)}`)
					})
			},
			urlFieldDemo() {
				uni.$qs.request({
						urlField: 'demo.testApi', //请查看QS-UI-CONFIG/config/apis.js
						sendData: {
							data: {
								code: 200,
								name: 'uni-app',
								noncestr: Date.now()
							}
						},
						loading: true,
						contentType: 'form'
					})
					.then(res => {
						uni.$qs.toast(`请求结果: ${JSON.stringify(res)}`)
					})
			},
			fieldDemo() {
				uni.$qs.request({
						urlField: 'demo.testApi', //请查看QS-UI-CONFIG/config/apis.js
						sendData: {
							data: {
								code: 200,
								name: 'uni-app',
								noncestr: Date.now()
							}
						},
						loading: true,
						field: 'name', //返回数据中的 name字段
						contentType: 'form'
					})
					.then(res => {
						uni.$qs.toast(`请求结果: ${JSON.stringify(res)}`)
					})
			},
			proxyFnDemo() {
				uni.$qs.request({
						urlField: 'demo.testApi', //请查看QS-UI-CONFIG/config/apis.js
						sendData: {
							data: {
								code: 200,
								name: 'uni-app',
								noncestr: Date.now()
							}
						},
						loading: true,
						field: 'name', //返回数据中的 name字段
						proxyFn: function(data) {	//可以传一个函数来处理数据, 比如对返回的列表list循环操作
							return data + '-proxy'
						},
						contentType: 'form'
					})
					.then(res => {
						uni.$qs.toast(`请求结果: ${JSON.stringify(res)}`)
					})
			},
			proxyFnPromiseDemo() {
				uni.$qs.request({
						urlField: 'demo.testApi', //请查看QS-UI-CONFIG/config/apis.js
						sendData: {
							data: {
								code: 200,
								name: 'uni-app',
								noncestr: Date.now()
							}
						},
						loading: true,
						field: 'name', //返回数据中的 name字段
						proxyFn: function(data) {
							return new Promise((rs, rj)=>{	//可以return一个Promise对象来异步处理数据
								rs(data + '-proxy-async');
							})
						},
						contentType: 'form'
					})
					.then(res => {
						uni.$qs.toast(`请求结果: ${JSON.stringify(res)}`)
					})
			},
			loginDemo() {
				uni.$qs.request({
						urlField: 'demo.testApi', //请查看QS-UI-CONFIG/config/apis.js
						sendData: {
							data: {
								code: 200,
								name: 'uni-app',
								noncestr: Date.now()
							}
						},
						loading: true,
						field: 'name', //返回数据中的 name字段
						proxyFn: function(data) {
							return new Promise((rs, rj)=>{	//可以return一个Promise对象来异步处理数据
								rs(data + '-proxy-async');
							})
						},
						contentType: 'form',
						login: true	//不一定叫login, 可以根据拦截函数的逻辑来, 可以传一个登录标识来告诉拦截函数此接口需要登录信息, 拦截函数在 QS-UI-CONFIG/config/request.js->setConfig
						//...可以传自己业务逻辑需要的标识
					})
					.then(res => {
						uni.$qs.toast(`请求结果: ${JSON.stringify(res)}`)
					})
			},
			agilityDemo() {
				//此处是拓展在$qs核心中的
				uni.$qs.myApis.agilityDemo.agilityDemoTest({
					code: 200,
					name: 'uni-app',
					noncestr: Date.now()
				})
					.then(res=>{
						uni.$qs.toast(`请求结果: ${JSON.stringify(res)}`)
					})
			}
		}
	}
</script>

<style>

</style>
