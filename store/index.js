import Vue from 'vue'
import Vuex from 'vuex'
import VALUES from '@/QS-UI-CONFIG/config/values.js';

Vue.use(Vuex)


const store = new Vuex.Store({
	state: {
		token: uni.getStorageSync(VALUES.storageName.token) || '',
		userInfo: {}
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
		},
		clearToken(state) {
			state.token = '';
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		}
	},
	actions: {
		setUserInfo(context, userInfo) {
			context.commit('setUserInfo', userInfo);
		}
	},
    getters:{
		getUserInfo(state) {
			return state.userInfo;
		}
    }
})

export default store
