const config = {
	FORCE_PRODUCTION: 1, //1或0 true或false, 在改文件下方代码中 生产环境是否强制设置STATUS为1
	STATUS: 1,	// 测试或正式环境, 目前提供在apis.js中会判断此字段
	SETIN_UNI: true,	//是否将QS-UI 核心js对象挂载在uni对象下面, 可以使用 uni.$qs.xxx 方式调用
	SETIN_VUE: false, //是否将QS-UI 核心js对象挂载在Vue对象原型下, 不建议该操作，其实挂在uni下就够用了，并且不管在哪里都可以访问，也不用管this指向问题
	QSUI_JS_NAME: '$qs',	//QS-UI js对象名称 (希望可以保留$qs这个称呼， 谢谢！)
	globalData: {	//公共数据, 可以放置一些不变更的页面需要使用的数据
		// 可以放些用于多页面展示的静态的数据, 比如app的名称、图标、或者公司名称、图标
		
	},
	log() {	//QS-UI总体控制打印信息, 注释函数内代码即可取消打印
		return console.log('[QS-UI]:', ...arguments);
	},
	launchPath: '/pages/home/home',	//在调用关闭页面的api($qs.navigateBack)时，它会判断是否是最后一页，若是在最后一页调用关闭页面方法则会reLaunch至该页面
	useBackTop: true,	//是否开启QS-BackTop功能
	backTopShowScrollTop: 300,	//页面滑动时, QS-BackTop显示按钮阈值
	defaultLanguage: 'zh_CN',	//默认语言, 可以配置系统语言
	mixins: {	//全局mixins配置, 若传false则关闭所有
		useNavigateTo: true,	//在全局mixins挂载uni.$qs.navigateTo方法，这样就可以直接在html代码中@tap里直接写VALUES里配置好的方法名称
		useGetNavbarQuery: true,	//在全局mixins挂载获取当前页面上QS-Navbar组件的获取布局信息方法
		useGetQuery: true,	//在全局mixins挂载获取布局信息方法
		useGlobalData: true,	//在全局mixins中的data上挂载uni.$qs.globalData
		
		useOnPullDownRefresh: true,	//页面刷新
		stopPullDownRefreshDuration: 1500, //刷新动画最少持续时长
	},
	filters: {	//Vue-filter 配置
		useDateFormat: true,	//是否使用日期格式化功能
		useNumber2Duration: true,	//是否使用数值毫秒转中文时间功能
		useCent2dollar: true,	//是否使用数值分转元功能
	},
	multiLang: {	//多语言配置，建议挂在Vue原型上，使用方式和 i18n一致, 使用名称可在config/values.js中配置
		SETIN_VUE: true,	//多语言是否使用Vue原型上的方法, 例如: {{ $qst('test.a') }}
		SETIN_FILTER: false	//多语言是否使用filter方式, 例如: {{ 'test.a' | qst }}
	}
}

if(config.FORCE_PRODUCTION && process.env.NODE_ENV !== 'development'){
	config.STATUS = 1;
}

module.exports = config;