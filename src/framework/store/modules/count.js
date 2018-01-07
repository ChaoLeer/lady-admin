// states
const state = 10

// getters
const getters = {
  getCount: state => state
}

// actions
const actions = {
  increment ({commit, state}) {
    commit('INCRE')
  },
  decrement ({commit, state}) {
    commit('DECRE')
  }
}

// mutations
const mutations = {
  INCRE (state) {
    state.count++
  },
  DECRE (state) {
    state.count--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
