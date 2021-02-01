import Vue from 'vue'
import App from './App'
import store from './store'
import QSUI from 'QS-UI';

Vue.use(QSUI, { store });	//传入store对象 可以使用多语言

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
