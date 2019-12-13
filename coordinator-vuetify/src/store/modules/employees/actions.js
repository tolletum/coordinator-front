import api from '../../../api/employees'

export const actions = {
    listEmployees: async ({ commit }) => {
        const employees = await api.listEmployees()
        commit('SET_EMPLOYEES', employees)
    },
}
export default actions
