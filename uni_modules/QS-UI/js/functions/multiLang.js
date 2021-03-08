/**
 * 借助 vuex 实现的多语言
 */
import getField from './getField.js';
import CONFIG from '@/QS-UI-CONFIG/config/index.js';
import langData from '@/QS-UI-CONFIG/config/lang/index.js';
import VALUES from '@/QS-UI-CONFIG/config/values.js';
import languages from '@/QS-UI-CONFIG/config/lang/languages.js';
import langChange from '@/QS-UI-CONFIG/config/lang/langChange.js';
const langs = Object.keys(languages).map(item=>languages[item].lang);
const storeModule = {
	namespaced: true,
	state: { 
		lang: uni.getStorageSync(VALUES.storageName.lang) || CONFIG.defaultLanguage
	},
	mutations: {
		setLang(state, lang) {
			if(!langs.includes(lang)) {
				console.log('语言列表中不存在该语言');
				console.warn('语言列表中不存在该语言');
				return;
			}
			uni.setStorageSync(VALUES.storageName.lang, lang);
			state.lang = lang;
			langChange(lang);
		}
	}
}
let store;
const setStore = function (s) {
	store = s;
}
const getStore = function () {
	return store;
}
const setLang = function (lang) {
	getStore().commit(`${VALUES.modulesName.store.multiLang}/setLang`, lang);
}
module.exports = {
	setStore,
	storeModule,
	setLang,
	getLang(name) {
		let lang;
		if(CONFIG.multiLang && (CONFIG.multiLang.SETIN_VUE || CONFIG.multiLang.SETIN_FILTER)) {
			lang = getStore().state[VALUES.modulesName.store.multiLang].lang;
		}else{
			lang = CONFIG.defaultLanguage;
		}
		if(!langs.includes(lang)) {
			console.log(`语言列表中不存在该语言:${lang}, 切换至默认语言:${CONFIG.defaultLanguage}`);
			console.warn(`语言列表中不存在该语言:${lang}, 切换至默认语言:${CONFIG.defaultLanguage}`);
			lang = CONFIG.defaultLanguage;
		}
		if(!lang) {
			console.log(`语言列表中不存在该语言:${lang}, 切换至语言列表第一个:${langs[0]}`);
			console.warn(`语言列表中不存在该语言:${lang}, 切换至语言列表第一个:${langs[0]}`);
			lang = langs[0];
		}
		const data = langData[lang];
		if(!data) {
			console.log(`不存在该语言数据:${lang}`);
			console.warn(`不存在该语言数据:${lang}`);
			return '';
		}
		const res = getField(data, name);
		if(!res) {
			console.log(`该语言数据:${lang}中 不存在该字段:${name}`);
			console.warn(`该语言数据:${lang}中 不存在该字段:${name}`);
			return '';
		}
		return res;
	}
} 