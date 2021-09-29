import { MDInfo } from '@/common/interface'
import { createLogger, createStore } from 'vuex'

const debug = process.env.NODE_ENV === 'production'
export default createStore({
  state: {
    title: '',
    token: '',
    mdInfolist: {} as MDInfo,
    content: '' as string,
    num: 0
  },
  mutations: {
    setTitle (state, value) {
      state.title = value
    },
    setToken (state, value) {
      if (value === '') return
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置用户的基本信息
    setMDInfo (state, value) {
      if (value === '') return
      state.mdInfolist = value
      // 本地存储用户的基本信
      localStorage.setItem('mdInfolist', JSON.stringify(value))
    },
    setContent (state, value: string) {
      state.content = value
    },
    setMessage (state, value) {
      state.num = value.message ? value.message : 0
    }
  },
  actions: {
    message ({ commit }, msg) {
      commit('setMessage', msg)
    }
  },
  modules: {},
  plugins: !debug ? [createLogger()] : []
})
