import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:8081/coordinators';

new Vue({
  render: h => h(App),
}).$mount('#app')
