import QSUIJS from './js/app.js';
import config from '@/QS-UI-CONFIG/index.js';
import backTopMixin from './mixins/QSBacktopMixin.js';
import mixin from './mixins/mixin.js';
const install = (Vue, options = {}) => {
	const optionsIsObj = typeof options === 'object';
	if(typeof uni == 'object' && config.SETIN_UNI) uni[config.QSUI_JS_NAME] = QSUIJS;	//挂在uni对象下
	if(config.SETIN_VUE) Vue.prototype[config.QSUI_JS_NAME] = QSUIJS;	//挂在Vue原型上
	if(config.mixins) Vue.mixin(mixin);
	if(config.useBackTop) Vue.mixin(backTopMixin);
	if(config.filters) {
		if(config.filters.useDateFormat) {
			Date.prototype.format = QSUIJS.dateFormat;
			Vue.filter(QSUIJS.VALUES.filterName.dateFormat, (date, format = 'yyyy-MM-dd hh:mm:ss') => {
				return new Date(date).format(format)
			})
		}
		if(config.filters.useNumber2Duration) {
			Vue.filter(QSUIJS.VALUES.filterName.number2Duration, QSUIJS.number2Duration)
		}
		if(config.filters.useCent2dollar) {
			Vue.filter(QSUIJS.VALUES.filterName.cent2dollar, QSUIJS.cent2dollar)
		}
		if(config.multiLang && (config.multiLang.SETIN_FILTER || config.multiLang.SETIN_VUE)) {
			if(optionsIsObj) {
				if(options.store) {
					if(options.store.registerModule && typeof options.store.registerModule === 'function') {
						QSUIJS.multiLang.setStore(options.store);
						options.store.registerModule(QSUIJS.VALUES.modulesName.store.multiLang, QSUIJS.multiLang.storeModule);
						if(config.multiLang.SETIN_FILTER) Vue.filter(QSUIJS.VALUES.multiLang.filterName, QSUIJS.multiLang.getLang)
						if(config.multiLang.SETIN_VUE) Vue.prototype[QSUIJS.VALUES.multiLang.vuePrototypeName] = QSUIJS.multiLang.getLang;
					}else{
						console.log('请传入正确的store对象');
						console.warn('请传入正确的store对象');
					}
				}else{
					console.log('若要使用QS-UI多语言，请在main.js-Vue.use中将store对象传入store字段中');
					console.warn('若要使用QS-UI多语言，请在main.js-Vue.use中将store对象传入store字段中');
				}
			}else{
				console.log('Vue.use 携带参数类型错误!');
				console.warn('Vue.use 携带参数类型错误!');
			}
		}
	}
	
	
	if(process.env.NODE_ENV !== 'development' && config.FORCE_PRODUCTION){
		console.log = ()=>{};
	}
}

export default {
	install
}