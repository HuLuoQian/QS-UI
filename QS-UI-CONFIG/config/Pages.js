const Pages = {	//配置页面列表, 当使用 uni.$qs.navigateTo 时 , 页面参数 可直接传.链式字符串, 并且可以配置一些自定义参数以供./navigate.js中beforNext方法控制
	js: {
		multilang: {
			name: '多语言', //示例所需
			url: '/pages/js/multilang/multilang',	//必须
			key: 'js.multilang' //示例所需
		},
		router: {
			name: '路由', //示例所需
			url: '/pages/js/router/router',	//必须
			key: 'js.router' //示例所需
		},
		request: {
			name: '请求接口', //示例所需
			url: '/pages/js/request/request',	//必须
			key: 'js.request', //示例所需
		},
		testRouterOpen: {
			name: '路由测试跳转页面', //示例所需
			url: '/pages/js/testRouterOpen/testRouterOpen',	//必须
			key: 'js.testRouterOpen', //示例所需
			hide: true, //示例所需
		},
		testRouterLogin: {
			name: '路由测试跳转校验登录页面', //示例所需
			url: '/pages/js/testRouterLogin/testRouterLogin',	//必须
			key: 'js.testRouterLogin', //示例所需
			hide: true, //示例所需
			login: true, //示例所需，为需登录页面
		},
		getSys: {
			name: '获取系统信息', //示例所需
			url: '/pages/js/getSys/getSys',	//必须
			key: 'js.getSys', //示例所需
		},
		interaction: {
			name: '交互反馈', //示例所需
			url: '/pages/js/interaction/interaction',	//必须
			key: 'js.interaction', //示例所需
		},
		handleAddress: {
			name: '地址解析', //示例所需
			url: '/pages/js/handleAddress/handleAddress',	//必须
			key: 'js.handleAddress', //示例所需
		},
		countDown: {
			name: '倒计时', //示例所需
			url: '/pages/js/countDown/countDown',	//必须
			key: 'js.countDown', //示例所需
		}
	},
	components: {
		
	}
}

module.exports = Pages;
