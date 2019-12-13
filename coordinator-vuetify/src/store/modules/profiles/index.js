import actions from './actions'
import mutations from './mutations'

const state = {
    profiles: [],
    selectedProfile: -1,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
