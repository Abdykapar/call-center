import { sidebarService } from '../_services';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllSidebarRequest');

        sidebarService.getAll()
            .then(sidebars => {
                commit('getAllSidebarSuccess', sidebars)
            })
            .catch((error => {
                commit('getAllSidebarFailure', error)
            }));
    }
};

const mutations = {
    getAllSidebarRequest(state) {
        state.all = { loading: true };
    },
    getAllSidebarSuccess(state, sidebars) {
        state.all = { items: sidebars };
    },
    getAllSidebarFailure(state, error) {
        state.all = { error };
    }
};

export const sidebars = {
    namespaced: true,
    state,
    actions,
    mutations
};
