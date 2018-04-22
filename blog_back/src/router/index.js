import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import back from '../components/main/index'
import main from '../components/main/main'
import add_one_class from '../components/classify/add_one_class'
import add_two_class from '../components/classify/add_two_class'
import class_list from '../components/classify/class_list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login,
      redirect: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: "/back",
      component: back,
      children: [
        {
          path: "main",
          component: main
        },
        {
          path: "add_one_class",
          component: add_one_class
        },
        {
          path: "add_two_class",
          component: add_two_class
        },
        {
          path: "class_list",
          component: class_list
        }
      ]
    }
  ]
})