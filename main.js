import Vue from 'vue'
import App from './App'
import store from './store'
import QSUI from '@/uni_modules/QS-UI/index.js';

Vue.use(QSUI);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
