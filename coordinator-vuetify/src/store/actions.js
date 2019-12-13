const actions = {
    setConfirmDialog: async ({ commit }, payload) => {
        commit('SET_CONFIRMDIALOG', payload)
    },

    hideConfirmDialog: async ({ commit }) => {
        commit('HIDE_CONFIRMDIALOG')
    },
}
export default actions
