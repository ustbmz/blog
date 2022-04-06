import { MDInfo } from '@/common/interface'
import { createLogger, createStore } from 'vuex'

const debug = process.env.NODE_ENV === 'production'
export default createStore({
  state: {
    title: '',
    token: '',
    mdlists: {} as MDInfo,
    mditem: {} as MDInfo,
    contentname: '' as string,
    topFlag: true as boolean,
    showFlag: true as boolean
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
    setMDList (state, value) {
      if (value === '') return
      state.mdlists = value
      // localStorage.setItem('mdlists', JSON.stringify(value))
    },
    setContentName (state, value: string) {
      state.contentname = value
    },
    setMDitem (state, value: MDInfo) {
      state.mditem = value
    },
    setTopFlag (state, value: boolean) {
      state.topFlag = value
    },
    setShowFlag (state, value: boolean) {
      state.showFlag = value
    }
  },
  actions: {},
  modules: {},
  plugins: !debug ? [createLogger()] : []
})
