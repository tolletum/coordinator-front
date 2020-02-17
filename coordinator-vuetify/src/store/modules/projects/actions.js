import api from '../../../api/projects'

export const actions = {
    listProjects: async ({ commit }) => {
        const projects = await api.listProjects()
        commit('SET_PROJECTS', projects)
    },
}
export default actions
