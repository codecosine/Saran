import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  token: '',
  auth: '',
  name: '游客',
  mail: '',
}

// getters
const getters = {
  name: state => state.name
}

// actions
const actions = {
  updateUser({ commit, state }, data) {
    commit(types.UPDATE_USER_INFO,data)
  }
}

// mutations
const mutations = {
  [types.UPDATE_USER_INFO] (state, data) {
    state.name = data.name;
    state.token = data.token;
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}