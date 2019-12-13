const mutations = {
    SET_CONFIRMDIALOG: (state, payload) => {
        state.confirmDialog = {
            ...payload,
            show: true,
        }
    },

    HIDE_CONFIRMDIALOG: state => {
        state.confirmDialog = {
            show: 0,
            accept: () => {},
            title: '',
            meessage: '',
        }
    },
}
export default mutations
