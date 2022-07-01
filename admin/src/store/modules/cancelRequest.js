const state = {
  tokens: [] // 存储cancel token
}

const mutations = {
  ADD_TOKEN(state, data) {
    state.tokens.push(data)
  },
  CLEAR_TOKEN(state) {
    state.tokens.map(item => {
      item.cancel(`${item.url}---路由切换取消请求`)
    })
    state.tokens = []
  }
}

const actions = {
  addToken({ commit }, cancelToken) {
    commit('ADD_TOKEN', cancelToken)
  },
  clearToken({ commit }) {
    commit('CLEAR_TOKEN')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
