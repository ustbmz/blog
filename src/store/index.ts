import { MDInfo } from '@/common/interface'
import { createLogger, createStore } from 'vuex'

const debug = process.env.NODE_ENV === 'production'
export default createStore({
  state: {
    sid: '',
    title: '',
    isLogin: false,
    token: '',
    MDinfo: {} as MDInfo,
    isHide: false,
    ws: null,
    num: 0
  },
  mutations: {
    // initWebSocket (state, config) {
    //   state.ws = new WebSocketClient(config)
    //   state.ws.init()
    // },
    setSid (state, value) {
      state.sid = value
    },
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
      state.MDinfo = value
      // 本地存储用户的基本信
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置isLogin的状态
    setIsLogin (state, value) {
      state.isLogin = value
    },
    setHide (state, value) {
      state.isHide = value
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
