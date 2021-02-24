const Pages = {	//配置页面列表, 当使用 uni.$qs.navigateTo 时 , 页面参数 可直接传.链式字符串, 并且可以配置一些自定义参数以供./navigate.js中beforNext方法控制
	js: {
		multilang: {
			name: '多语言', //示例所需
			url: '/pages/js/multilang/multilang',
			key: 'js.multilang' //示例所需
		},
		router: {
			name: '路由', //示例所需
			url: '/pages/js/router/router',
			key: 'js.router' //示例所需
		},
		testRouterOpen: {
			name: '路由测试跳转页面', //示例所需
			url: '/pages/js/testRouterOpen/testRouterOpen',
			key: 'js.testRouterOpen', //示例所需
			hide: true, //示例所需
		},
		testRouterLogin: {
			name: '路由测试跳转校验登录页面', //示例所需
			url: '/pages/js/testRouterLogin/testRouterLogin',
			key: 'js.testRouterLogin', //示例所需
			hide: true, //示例所需
			login: true, //示例所需，为需登录页面
		},
	},
	components: {
		
	}
}

module.exports = Pages;
