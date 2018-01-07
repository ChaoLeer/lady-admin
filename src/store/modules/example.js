// states
const state = {
  example: true
}

// getters
const getters = {
  getExample: state => state.example
}

// actions
const actions = {
  chooseCurrent ({commit, state}, k) {
    commit('EXAMPLE_MUTATIONS', k)
  }
}

// mutations
const mutations = {
  EXAMPLE_MUTATIONS (state, k) {
    state.example = k
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
