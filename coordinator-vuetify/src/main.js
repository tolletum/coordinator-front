import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './utils/routes'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes,
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
