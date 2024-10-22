const config = {
	FORCE_PRODUCTION: 1, //1或0 true或false, 在改文件下方代码中 生产环境是否强制设置STATUS为1
	STATUS: 1,	// 测试或正式环境, 目前提供在apis.js中会判断此字段
	SETIN_UNI: true,	//是否将QS-UI 核心js对象挂载在uni对象下面, 可以使用 uni.$qs.xxx 方式调用
	SETIN_VUE: false, //是否将QS-UI 核心js对象挂载在Vue对象原型下, 不建议该操作，其实挂在uni下就够用了，并且不管在哪里都可以访问，也不用管this指向问题
	QSUI_JS_NAME: '$qs',	//QS-UI js对象名称 (希望可以保留$qs这个称呼， 谢谢！)
	log() {	//QS-UI总体控制打印信息, 注释函数内代码即可取消打印
		return console.log('[QS-UI]:', ...arguments);
	},
	baseFontSize: 14,	//基础字体大小
	launchPath: '/pages/tabbar/index/index',	//在调用关闭页面的($qs.navigateBack) api时，若第二个参数传true, 它会判断是否是最后一页，若是在最后一页调用关闭页面方法则会reLaunch至该页面
	backTopShowScrollTop: 150,	//页面滑动时, QS-BackTop显示按钮阈值
	stopPullDownRefreshDuration: 1000, //刷新动画最少持续时长
	defaultLanguage: 'zh_CN',	//默认语言, 可以配置系统语言
	mixins: {	//全局mixins配置, 若传false则关闭所有
		usePageScroll: true,
	
		useNavigateTo: true,	//在全局mixins挂载uni.$qs.navigateTo方法，这样就可以直接在html代码中@tap里直接写VALUES里配置好的方法名称
		useGetQuery: true,	//在全局mixins挂载获取布局信息方法
		
		useOnPullDownRefresh: true,	//页面刷新
		
		useOnShareAppMessage: true, //小程序分享
	},
	filters: {	//Vue-filter 配置
		useDateFormat: true,	//是否使用日期格式化功能
		useNumber2Duration: true,	//是否使用数值毫秒转中文时间功能
	},
	multiLang: {	//多语言配置，建议挂在Vue原型上，使用方式和 i18n一致, 使用名称可在config/values.js中配置
		SETIN_VUE: true,	//多语言是否使用Vue原型上的方法, 例如: {{ $qst('test.a') }}
		SETIN_FILTER: false,	//多语言是否使用filter方式, 例如: {{ 'test.a' | qst }}
		
		NVUE_SETIN_FILTER: true, //nvue多语言是否使用filter方式, 例如: {{ 'test.a' | qst }}
	}
}

if(config.FORCE_PRODUCTION && process.env.NODE_ENV !== 'development'){
	config.STATUS = 1;
}

module.exports = config;