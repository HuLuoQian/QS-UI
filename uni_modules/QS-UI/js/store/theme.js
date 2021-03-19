import configTheme from '@/QS-UI-CONFIG/css/theme.js';
import VALUES from '@/QS-UI-CONFIG/config/values.js';

module.exports = {
	namespaced: true,
	state: { 
		theme: { ...configTheme }
	},
	mutations: {
		setTheme(state, obj) {
			if(typeof obj !== 'object') {
				console.log('设置主题颜色, 参数为{ name: "", color: "" }');
				console.warn('设置主题颜色, 参数为{ name: "", color: "" }');
				return;
			}
			if(!obj.name) {
				console.log('要设置主题颜色的name字段不存在');
				console.warn('要设置主题颜色的name字段不存在');
				return;
			}
			if(!obj.color) {
				console.log('要设置主题颜色的color字段不存在');
				console.warn('要设置主题颜色的color字段不存在');
				return;
			}
			state.theme[obj.name] = obj.color;
		}
	},
	actions: {
		setTheme({ commit }, obj) {
			if(typeof obj !== 'object') {
				console.log('设置主题颜色, 参数为{ name: "", color: "" }');
				console.warn('设置主题颜色, 参数为{ name: "", color: "" }');
				return;
			}
			if(!obj.name) {
				console.log('要设置主题颜色的name字段不存在');
				console.warn('要设置主题颜色的name字段不存在');
				return;
			}
			if(!obj.color) {
				console.log('要设置主题颜色的color字段不存在');
				console.warn('要设置主题颜色的color字段不存在');
				return;
			}
			commit('setTheme', obj);
		}
	},
	getters: {
		theme(state) {
			return JSON.parse(JSON.stringify(state.theme));
		}
	}
}