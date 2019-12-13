import Vue from 'vue'
import Vuetify, { VSnackbar, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
    components: {
        VSnackbar,
        VIcon,
    },
})
Vue.use(VuetifyToast, {
    x: 'center',
    y: 'top',
    color: 'error',
    icon: 'mdi-alert-decagram',
    timeout: 3000,
})

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#072146',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
})
