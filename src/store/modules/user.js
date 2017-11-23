import * as types from '../mutation-types'

const state = {
  token: '',
  auth: '',
  name: '游客',
  mail: '',
  memberList: [],
}

// getters
const getters = {
  name: state => state.name,
  auth: state => state.auth,
  token: state => state.token,
  memberList: state => state.memberList,
}

// actions
const actions = {
  updateUser({ commit, state }, data) {
    commit(types.UPDATE_USER_INFO,data)
  },
  updateMemberList({ commit, state}){
    user.getList().then(res=>{
      if(res.data.code == 0 || res.data.code == 'success'){
        commit(types.ADD_TO_MEMBER_LIST,res.data.data)
      }
    })
  },
}

// mutations
const mutations = {
  [types.UPDATE_USER_INFO] (state, data) {
    state.name = data.name;
    state.token = data.token;
  },
  [types.ADD_TO_MEMBER_LIST] (state, items) {
    state.memberList = items
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}