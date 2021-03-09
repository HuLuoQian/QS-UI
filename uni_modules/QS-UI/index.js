import QSUIJS from './js/app.js';
import config from '@/QS-UI-CONFIG/index.js';
import mixins from './mixins/mixin.js';
import store from './js/store/index.js';
const install = (Vue, options = {}) => {
	if(process.env.NODE_ENV !== 'development' && config.FORCE_PRODUCTION){
		console.log = ()=>{};
	}
	if(typeof uni == 'object' && config.SETIN_UNI) uni[config.QSUI_JS_NAME || '$qs'] = QSUIJS;	//挂在uni对象下
	if(config.SETIN_VUE) Vue.prototype[config.QSUI_JS_NAME] = QSUIJS;	//挂在Vue原型上
	if(config.mixins) Vue.mixin(mixins);
	if(config.filters) {
		if(config.filters.useDateFormat) {
			Vue.filter(QSUIJS.VALUES.filterName.dateFormat, QSUIJS.dateFormat)
		}
		if(config.filters.useNumber2Duration) {
			Vue.filter(QSUIJS.VALUES.filterName.number2Duration, QSUIJS.number2Duration)
		}
		
	}
	if(config.multiLang && (config.multiLang.SETIN_FILTER || config.multiLang.SETIN_VUE)) {
		QSUIJS.multiLang.setStore(store);
		store.registerModule(QSUIJS.VALUES.modulesName.store.multiLang, QSUIJS.multiLang.storeModule);
		if(config.multiLang.SETIN_FILTER) Vue.filter(QSUIJS.VALUES.multiLang.filterName, QSUIJS.multiLang.getLang)
		if(config.multiLang.SETIN_VUE) {
			Vue.prototype[QSUIJS.VALUES.multiLang.vuePrototypeName] = QSUIJS.multiLang.getLang;
		}
	}
}

export default {
	install
}