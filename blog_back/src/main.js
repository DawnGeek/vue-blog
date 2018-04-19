
import Vue from "vue"
import router from './router'
import App from './components/app'
import ElementUI from 'element-ui';
import axios from 'axios';
import vueAxios from "vue-axios";
import './directives';

import "./css/common.css"

Vue.use(ElementUI);
Vue.use(vueAxios,axios)

new Vue({
  el:"#root",
  template:"<App/>",
  router,
  components: {
      App
  },
  render: h => h(App)
})