import {createStore} from 'vuex'
import router from '../router'

export default createStore({
  state: {
    authenticated: false,
    user: {},
    token: 'jhjh'
  },
  getters: {
    authenticated(state) {
      return state.authenticated
    },
    user(state) {
      return state.user
    },
    getToken(state){
      return state.token
    }
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value
    },
    SET_USER(state, value) {
      state.user = value
    },
    SET_TOKEN(state, value) {
      state.token = value
    }
  },
  actions: {
    settoken({commit}, token){
      commit('SET_TOKEN', token)
    },
    login({commit}, user) {
      commit('SET_USER', user)
      commit('SET_AUTHENTICATED', true)
    },
    logout({commit}) {
      commit('SET_USER', {})
      commit('SET_AUTHENTICATED', false)
    }
  }
})
