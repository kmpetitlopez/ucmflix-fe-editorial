import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const getDefaultState = () => {
    return {
        logged: false
    };
};

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        isLoggedIn: state => {
        return state.logged;
        }
    },
    mutations: {
        SET_LOGGED: (state, logged) => {
        state.logged = logged;
        },
        RESET: state => {
        Object.assign(state, getDefaultState());
        }
    },
    actions: {
        login: ({ commit }) => {
        commit('SET_LOGGED', true);
        },
        logout: ({ commit }) => {
        commit('RESET', '');
        }
    }
});