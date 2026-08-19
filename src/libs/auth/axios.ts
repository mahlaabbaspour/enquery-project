// import https from 'https'

// import axios from 'axios'
// import type { GetServerSidePropsContext } from 'next'
// import { getServerSession } from 'next-auth'
// import { getSession, signOut } from 'next-auth/react'

// import { authOptions } from './authOptions'

// declare module 'axios' {
//   interface AxiosRequestConfig {
//     nextContext?: GetServerSidePropsContext | boolean
//     skipErrorHandling?: boolean
//   }
// }

// const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

// const axiosConfig = axios.create({
//   baseURL: BASE_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   },
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false
//   })
// })

// // Helper function to get the token dynamically
// const getToken = async (context?: GetServerSidePropsContext | boolean) => {
//   if (context) {
//     // Server-side: Use getServerSession

//     const session: any = await getServerSession(authOptions)

//     return session?.accessToken
//   } else {
//     // Client-side: Use getSession
//     const session: any = await getSession()

//     return session?.accessToken
//   }
// }

// // Add an interceptor to attach the token to every request
// axiosConfig.interceptors.request.use(
//   async config => {
//     const token = await getToken(config.nextContext)

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
// axiosConfig.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       if (typeof window !== 'undefined') {
//         signOut({ redirect: true, callbackUrl: '/auth/login' })
//       }
//     }

//     return Promise.reject(error)
//   }
// )
// export default axiosConfig
