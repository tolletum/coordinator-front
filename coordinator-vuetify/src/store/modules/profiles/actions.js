import api from '../../../api/profiles'

export const actions = {
    listProfiles: async ({ commit }) => {
        const profiles = await api.listProfiles()
        commit('SET_PROFILES', profiles)
    },
}
export default actions
