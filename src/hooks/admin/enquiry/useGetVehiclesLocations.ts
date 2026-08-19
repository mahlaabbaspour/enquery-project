import { useQuery } from '@tanstack/react-query'

import { getVehiclesLocations } from '@/libs/admin/enquiry/getVehiclesLocations'

export function useGetVehiclesLocations(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['vehiclesLocations', id],
    queryFn: () => getVehiclesLocations(id),
    enabled: !!id
  })

  return {
    vehicles: data?.data ?? [],
    isLoading,
    error
  }
}
