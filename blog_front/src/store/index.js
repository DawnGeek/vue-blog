import Vue from 'vue'
import Vuex from 'vue'
import ElementUI from 'element-ui';
import Main from './Main'

Vue.use(Vuex)
Vue.use(ElementUI)

export default new Vue.Store({
	modules: {
		Main
	}
})