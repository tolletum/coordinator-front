const mutations = {
    SET_CONFIRMDIALOG: (state, payload) => {
        state.confirmDialog = {
            ...payload,
            show: true,
        }
    },
}

export default {
    mutations,
}
