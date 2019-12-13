import actions from './actions'
import mutations from './mutations'

const state = {
    teams: [],
    selectedTeam: -1,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
