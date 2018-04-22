
// import aa from "./js/common.js"
// console.log(aa)
// import app from "./components/app.vue"
// import Vue from " vue/dist/vue.js ";
import Vue from "vue"

new Vue({
  el:"#root",
  template:"<app />",
  components: {
      app: resolve => require(['./components/app.vue'], resolve)
  }
})