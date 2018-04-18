
import Vue from "vue"
import router from './router'
import App from './components/app'
import ElementUI from 'element-ui';

import "./css/common.css"
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);


new Vue({
  el:"#root",
  template:"<App />",
  router,
  components: {
      App: resolve => require(['./components/app.vue'], resolve)
  },
  render: h => h(App)
})