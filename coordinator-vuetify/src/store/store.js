import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        confirmDialog: {
            show: 0,
            message: '',
            title: '',
        },
    },
    mutations: {
        SET_CONFIRMDIALOG: (state, payload) => {
            state.confirmDialog = {
                ...payload,
                show: Date.now(),
            }
        },
    },
    actions: {
        setConfirmDialog: async ({ commit }, payload) => {
            commit('SET_CONFIRMDIALOG', payload)
        },
    },
})
