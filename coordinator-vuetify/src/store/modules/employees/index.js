import actions from './actions'
import mutations from './mutations'

const state = {
    employees: [],
    selectedEmployee: -1,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
