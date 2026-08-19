import { api } from '@/libs/api'

export const createEnquiry = async (payload: any) => {
  try {
    const res = await api.post('/request-area/store', payload)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}

export const getEnquiry = async (id: number) => {
  try {
    const res = await api.get(`/request-area/show/${id}`)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}

export const updateEnquiry = async ({ id, payload }: { id: number; payload: any }) => {
  try {
    const res = await api.put(`/request-area/update/${id}`, payload)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}
