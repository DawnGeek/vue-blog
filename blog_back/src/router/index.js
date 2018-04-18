import vue from 'vue'
import vueRouter from 'vue-router'

import Login from '../components/login'

vue.use(vueRouter)

export default new vueRouter({
	routes: [{
			path: '/',
			component: Login,
      redirect: "/login"
		}, {
			path: '/login',
			component: Login
		}
	]
})

