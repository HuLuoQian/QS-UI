import Vue from 'vue'
import Vuex from 'vuex'
import theme from './theme.js';
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		theme
	}
})
export default store
