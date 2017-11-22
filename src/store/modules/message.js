import message from '../../api/message'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  list: [],
  cuurentIndex: -1,
  checkoutStatus: null,
  // cathe
  cathe: [],
}

// getters
const getters = {
  messageList: state => state.list,
  cuurentMessage: state => {
    if(state.cuurentIndex == -1){
      return null
    } 
    return state.list[state.cuurentIndex]
  },
}

// actions
const actions = {
  updateMessageList({ commit, state}){
    message.getList().then(res=>{
      if(res.data.code == 0 || res.data.code == 'success'){
        commit(types.ADD_TO_LIST,res.data.data)
      }
    })
  },
  selectMessage({ commit, state }, data){
    commit(types.UPDATE_MSG_INDEX,data)
  },
  addMessage({ commit, state }, data){
    return message.addMessage(data)
  },
  updateMessage({ commit, state }){

  }
}

// mutations
const mutations = {
  [types.ADD_TO_LIST] (state, items) {
    state.list = items
  },
  [types.UPDATE_MSG_INDEX] (state, data) {
    state.cuurentIndex = data
  },

  [types.CHECKOUT_REQUEST] (state) {
    // clear cart
    state.added = []
    state.checkoutStatus = null
  },

  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  },

  [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
    // rollback to the cart saved before sending the request
    state.added = savedCartItems
    state.checkoutStatus = 'failed'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}