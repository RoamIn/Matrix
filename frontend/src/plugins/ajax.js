import axios from 'axios'

import API from '@/config/api'
import router from '@/router'

// 基础配置
const _ajaxConfig = axios.create({
  baseURL: API.baseURL,
  timeout: 80000
})

/**
 * 混入全局参数 token
 * @param params
 * @returns {{} & {} & {token: *}}
 */
function mixinGlobalParams (params = {}) {
  const token = 'token'

  return Object.assign({}, params, {
    token
  })
}

// Add a request interceptor
_ajaxConfig.interceptors.request.use((config) => {
  // 混入公共参数
  switch (config.method) {
    case 'put':
    case 'post':
    case 'patch':
      // 这些情况，请求参数放在 params
      config.data = mixinGlobalParams(config.data)

      break
    default:
      // 默认，请求参数放在 params
      config.params = mixinGlobalParams(config.data)
  }

  return config
}, (error) => {
  // Do something with request error
  console.log({
    title: '网络错误',
    message: error.message
  })

  return Promise.reject(error)
})

// Add a response interceptor
_ajaxConfig.interceptors.response.use((response) => {
  // Do something with response data
  const res = response.data

  if (res.code !== 0) {
    return Promise.reject(new Error(res.data))
  }

  return res
}, (error) => {
  // Do something with response error
  if (typeof error.response === 'undefined') {
    console.log({
      title: '网络错误',
      message: error.message
    })

    return Promise.reject(error)
  }

  switch (error.response.status) {
    case 403:
      router.replace({
        name: 'error',
        query: {
          code: 403
        }
      })

      break
    default:
      console.log({
        message: '网络错误'
      })
  }

  return Promise.reject(error)
})

export function ajax (apiName, data = {}) {
  const api = API[apiName]
  let {url, method} = API[apiName]

  if (typeof api.suffix !== 'undefined' && api.suffix !== '') {
    url += data[api.suffix]
  }

  return _ajaxConfig({
    url,
    method,
    data
  })
}

export default {
  install (Vue) {
    Vue.prototype.$ajax = ajax
  }
}
