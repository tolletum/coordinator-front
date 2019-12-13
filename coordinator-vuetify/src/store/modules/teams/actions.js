import api from '../../../api/teams'

export const actions = {
    listTeams: async ({ commit }) => {
        const teams = await api.listTeams()
        commit('SET_TEAMS', teams)
    },
}
export default actions
