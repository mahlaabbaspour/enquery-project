import { api } from '@/libs/api'
import type { VehicleLocationsResponse } from '@/types/vehicleLocation'

export const getVehiclesLocations = async (id: number) => {
  try {
    const res = await api.get<VehicleLocationsResponse>(`/request-area/${id}/vehicles`)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}
