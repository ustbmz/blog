import axios from '@/utils/request'
// import qs from 'qs'
//
const getList = (options: any) => {
  return axios.post('/public/getMDS', {
    ...options
  })
}

export { getList }
