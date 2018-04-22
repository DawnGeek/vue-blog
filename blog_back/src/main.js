// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import "./directives/index"
import "./components/register.js"

import ElementUI from 'element-ui';

import vueAxios from "vue-axios"
import axios from "axios"

Vue.use(Vuex)
Vue.use(ElementUI);
Vue.use(vueAxios,axios)

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if(to.path=="/login"){
    next()
  }else{
    if(sessionStorage.getItem("userId")){
      next()
    }else{
      next("/login")
    }
  }
})

new Vue({
  el: '#root',
  router,
  store, //使用store
  components: { App },
  template: '<App/>'
})
