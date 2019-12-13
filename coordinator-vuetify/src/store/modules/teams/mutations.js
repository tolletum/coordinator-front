export const mutations = {
    SET_TEAMS: (state, teams) => {
        state.teams = teams
        state.selectedTeam = -1
    },
}
export default mutations
