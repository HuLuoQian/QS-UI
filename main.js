import Vue from 'vue'
import App from './App'
import store from './store'
import QSUI from 'QS-UI';

Vue.use(QSUI, { store });

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
