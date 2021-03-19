module.exports = {	//各种名称配置，方便名称重复时修改, 或者改为自己喜欢的名字
	mixinsName: {	//全局mixins名称
		navigateTo: 'QS_navigateTo',	//跳转页面
		getQuery: 'QS_getQuery',	//获取布局信息
		QS_globalData: 'QS_globalData',	//uni.$qs.globalData 在页面中的变量名称
		QSBackTopScroll: 'QSBackTopScroll',
		QSBackTopScroll_checkShow: 'QSBackTopScroll_checkShow',
		pullDownRefreshFnName: 'QS_pullDownRefreshFn'
	},
	H5BrowserType: {	//H5浏览器环境判断, 该值会被uni.$qs.getSys中的H5BrowserType使用
		weixin: 'weixin',	//微信浏览器
		ali: 'alipay',	//支付宝浏览器
		other: 'other',	//其他浏览器
		notH5: ''	//不是H5环境
	},
	storageName: {	//缓存名称
		lang: 'QS_lang',	//多语言缓存名称
		
		//也可以配置自己项目使用的缓存名称，方便管理, 比如:
		token: 'token'
	},
	filterName: {	//全局filter名称
		dateFormat: 'dateFormat',	//日期格式化filter名称
		number2Duration: 'number2Duration',	//数值转中文时间filter名称
	},
	multiLang: {	//多语言使用名称配置
		filterName: 'qst',	//全局filter使用方式名称， 例如: {{ 'test.a' | qst }}
		vuePrototypeName: '$qst'	//Vue原型使用方式名称, 例如：{{ $qst('test.a') }}
	},
	uniappPlatform: {	//uni-app平台值
		'H5': 'H5',
		'APP-PLUS': 'APP-PLUS',
		'MP-WEIXIN': 'MP-WEIXIN',
		'MP-ALIPAY': 'MP-ALIPAY',
		'MP-BAIDU': 'MP-BAIDU',
		'MP-TOUTIAO': 'MP-TOUTIAO',
		'MP-QQ': 'MP-QQ',
		'MP-360': 'MP-360'
	},
	
	//不用动
	modulesName: {	//模块名称
		store: {	//vuex store 模块名称
			multiLang: 'QS_multiLang'	,//多语言模块名称, 一般不用改
			globalData: 'QS_globalData',
		}
	}
}