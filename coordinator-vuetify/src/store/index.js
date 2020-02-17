import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

import profiles from './modules/profiles'
import employees from './modules/employees'
import teams from './modules/teams'
import projects from './modules/projects'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        confirmDialog: {
            show: 0,
            message: '',
            title: '',
            accept: () => {},
            cancel: () => {},
        },
    },
    actions,
    mutations,
    modules: {
        profiles,
        employees,
        teams,
        projects,
    },
})
