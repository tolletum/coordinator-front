import actions from './actions'
import mutations from './mutations'

const state = {
    projects: [],
    selectedProject: -1,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
