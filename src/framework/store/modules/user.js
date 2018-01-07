import Vue from 'vue'
// states
import {setStorage, getStorageValue, removeStorage} from '../../common/storage'
const state = getStorageValue('local', 'user') || {} // 用户登录状态

// getters
const getters = {
  getUser: state => state
}

// actions
const actions = {
  userlogin ({commit, state}, user) {
    commit('USER_LOGIN', user)
  },
  userloginout ({commit, state}) {
    commit('USER_LOGINOUT')
  },
  userimgupdate ({commit, state}, img) {
    commit('USER_IMG_UPDATE', img)
  }
}

// mutations
const mutations = {
  USER_LOGIN (state, user) {
    setStorage('local', 'user', user)
    Object.assign(state, user)
  },
  USER_LOGINOUT (state) {
    removeStorage('local', 'user')
    state = {}
    // Object.keys(state.user).forEach(k => Vue.delete(state, k))
  },
  USER_IMG_UPDATE (state, img) {
    Vue.delete(state, 'userphoto')
    Vue.set(state, 'userphoto', img.userphoto)
    localStorage.setItem('user', JSON.stringify(state))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
