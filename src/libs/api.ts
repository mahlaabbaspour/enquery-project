// import axios from 'axios'

import axios from 'axios'

// export const api = axios.create({
//   baseURL: 'http://192.168.1.110:81/api'
// })
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    Accept: 'application/json'
  }
})
api.interceptors.request.use(config => {
  return config
})
