export const mutations = {
    SET_PROFILES: (state, profiles) => {
        state.profiles = profiles
        state.selectedProfile = -1
    },
}
export default mutations
