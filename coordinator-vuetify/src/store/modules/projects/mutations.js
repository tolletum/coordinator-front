export const mutations = {
    SET_PROJECTS: (state, projects) => {
        state.projects = projects
        state.selectedProject = -1
    },
}
export default mutations
