const Pages = {	//配置页面列表, 当使用 uni.$qs.navigateTo 时 , 页面参数 可直接传.链式字符串, 并且可以配置一些自定义参数以供./navigate.js中beforNext方法控制
	js: {
		multilang: {
			name: '多语言', //示例所需
			url: '/pages/js/multilang/multilang',	//必须
			key: 'js.multilang', //示例所需
			type: 'API'
		},
		theme: {
			name: '主题', //示例所需
			url: '/pages/js/theme/theme',	//必须
			key: 'js.theme', //示例所需
			type: 'API'
		},
		router: {
			name: '路由', //示例所需
			url: '/pages/js/router/router',	//必须
			key: 'js.router', //示例所需
			type: 'API'
		},
		request: {
			name: '请求接口', //示例所需
			url: '/pages/js/request/request',	//必须
			key: 'js.request', //示例所需
			type: 'API'
		},
		testRouterOpen: {
			name: '路由测试跳转页面', //示例所需
			url: '/pages/js/testRouterOpen/testRouterOpen',	//必须
			key: 'js.testRouterOpen', //示例所需
			hide: true, //示例所需
			type: 'API'
		},
		testRouterLogin: {
			name: '路由测试跳转校验登录页面', //示例所需
			url: '/pages/js/testRouterLogin/testRouterLogin',	//必须
			key: 'js.testRouterLogin', //示例所需
			hide: true, //示例所需
			login: true, //示例所需
			type: 'API'
		},
		getSys: {
			name: '获取系统信息', //示例所需
			url: '/pages/js/getSys/getSys',	//必须
			key: 'js.getSys', //示例所需
			type: 'API'
		},
		interaction: {
			name: '交互反馈', //示例所需
			url: '/pages/js/interaction/interaction',	//必须
			key: 'js.interaction', //示例所需
			type: 'API'
		},
		handleAddress: {
			name: '地址解析', //示例所需
			url: '/pages/js/handleAddress/handleAddress',	//必须
			key: 'js.handleAddress', //示例所需
			type: 'API'
		},
		countDown: {
			name: '倒计时', //示例所需
			url: '/pages/js/countDown/countDown',	//必须
			key: 'js.countDown', //示例所需
			type: 'API'
		}
	},
	components: {
		QSComponentReading: {
			name: 'QS组件须知', //示例所需
			url: '/pages/components/QS-Component-Reading/QS-Component-Reading',	//必须
			key: 'components.QSComponentReading', //示例所需
		},
		QSAnimation: {
			name: '动画', //示例所需
			url: '/pages/components/QS-Animation/QS-Animation',	//必须
			key: 'components.QSAnimation', //示例所需
		},
		QSBackTop: {
			name: '返回顶部', //示例所需
			url: '/pages/components/QS-BackTop/QS-BackTop',	//必须
			key: 'components.QSBackTop', //示例所需
		},
		QSBadge: {
			name: '标记', //示例所需
			url: '/pages/components/QS-Badge/QS-Badge',	//必须
			key: 'components.QSBadge', //示例所需
		},
		QSButton: {
			name: '按钮', //示例所需
			url: '/pages/components/QS-Button/QS-Button',	//必须
			key: 'components.QSButton', //示例所需
		},
		QSTabs: {
			name: '标签', //示例所需
			url: '/pages/components/QS-Tabs/QS-Tabs',	//必须
			key: 'components.QSTabs', //示例所需
		},
		// QSticky: {
		// 	name: '黏贴', //示例所需
		// 	url: '/pages/components/QS-Sticky/QS-Sticky',	//必须
		// 	key: 'components.QSticky', //示例所需
		// }
	}
}

module.exports = Pages;
