import { getList } from '@/api/content'
import store from '@/store'
import { reactive } from '@vue/runtime-dom'
import { useRoute } from 'vue-router'
import { HttpResponse, MDInfo } from '../interface'

export const BlogService = () => {
  const state = reactive({
    title: 'Html',
    item: {} as MDInfo,
    catalog: '',
    isEnd: false,
    isRepeat: false,
    isTop: 0,
    isShow: true,
    content: '' as any,
    status: '',
    type: 'html',
    sort: '',
    page: 0,
    limit: 20,
    lists: [{} as MDInfo]
  })

  const route = useRoute()
  console.log(route.params)
  const catalog = route?.params?.catalog as string
  if (typeof catalog !== 'undefined' || catalog !== '') {
    state.catalog = catalog
  }

  const handleGetlist = async () => {
    console.log('handleGetlist state.catalog:' + state.catalog)
    if (state.isRepeat) return
    if (state.isEnd) return
    state.isRepeat = true
    const options = {
      page: state.page,
      limit: state.limit,
      sort: state.sort,
      type: state.type,
      status: state.status
    }
    try {
      const res = await getList(options)
      const { code, data } = res as HttpResponse
      if (code === 200) {
        state.isRepeat = false
        if (data.length < 20) {
          state.isEnd = true
        }
        if (state.lists.length === 0) {
          state.lists = res.data
        } else {
          state.lists = state.lists.concat(res.data)
        }
        store.commit('setMDInfo', state.lists)
      }
      console.log(state.lists)
    } catch (error) {
      console.log('list Service catch errinfo:' + error)
    }
  }

  const init = () => {
    state.page = 0
    state.lists = []
    state.isEnd = false
    state.isRepeat = false
    handleGetlist()
  }

  const nextPage = () => {
    state.page++
    handleGetlist()
  }

  return {
    state,
    handleGetlist,
    nextPage,
    init
  }
}
