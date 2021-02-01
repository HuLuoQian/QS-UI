const Pages = {	//配置页面列表, 当使用 uni.$qs.navigateTo 时 , 页面参数 可直接传.链式字符串, 并且可以配置一些自定义参数以供./navigate.js中beforNext方法控制
	js: {
		multilang: {
			name: '多语言',
			url: '/pages/js/multilang/multilang',
			key: 'js.multilang'
		},
		router: {
			name: '路由',
			url: '/pages/js/router/router',
			key: 'js.router'
		}
	},
	components: {
		
	}
}

module.exports = Pages;
