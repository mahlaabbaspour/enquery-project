export type VehicleDriver = {
  id: number
  name: string
  status: number
}

export type VehicleType = {
  id: number
  name: string
  status: number
}

export type Vehicle = {
  id: number
  driver_id: number
  vehicle_type_id: number
  plate_number: string
  status: number
  driver: VehicleDriver
  vehicle_type: VehicleType
}

export type VehicleLocation = {
  id: number
  vehicle_id: number
  latitude: string
  longitude: string
  location_time: string
  status: number
  vehicle: Vehicle
}

export type VehicleLocationsResponse = {
  success: boolean
  count: number
  data: VehicleLocation[]
}
