import vue from 'vue'
import vueRouter from 'vue-router'

import Login from '../components/login'
import Main from '../components/Main'
import AddOne from '../components/AddOne'
import AddTwo from '../components/AddTwo'
import ClassList from '../components/ClassList'

vue.use(vueRouter)

// 路由注册
let router = new vueRouter({
	routes: [{
		path: '/',
		component: Login,
		redirect: "/login"
	}, {
		path: '/login',
		component: Login
	}, {
		path: '/main',
		component: Main,
		children: [
			{
				path: 'addone',
				component: AddOne
			}, {
				path: 'addtwo',
				component: AddTwo
			}, {
				path: 'classlist',
				component: ClassList
			}
		]
	}]
});

// 路由拦截
router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		next()
	} else {
		if (sessionStorage.getItem("userId")) {
			next()
		} else {
			next('/login')
		}
	}
});

export default router