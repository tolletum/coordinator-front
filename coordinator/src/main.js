import Vue from 'vue'
// import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { routes } from './utils/routes'
import feather from 'vue-icon'

Vue.config.productionTip = false

// Vue.use(VueResource)
// Vue.http.options.root = 'http://localhost:8081/coordinators'

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes,
})

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify';

Vue.use(feather, 'v-icon')

new Vue({
    render: h => h(App),
    vuetify,
    router
}).$mount('#app')
