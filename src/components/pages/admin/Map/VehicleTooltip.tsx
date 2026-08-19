type Props = {
  driver: string
  vehicleType: string
  plateNumber: string
}

export default function VehicleTooltip({ driver, vehicleType, plateNumber }: Props) {
  return (
    <div className='vehicle-marker-tooltip'>
      <div className='vehicle-tooltip-row'>
        <strong>راننده:</strong>
        <span>{driver}</span>
      </div>

      <div className='vehicle-tooltip-row'>
        <strong>نوع خودرو:</strong>
        <span>{vehicleType}</span>
      </div>

      <div className='vehicle-tooltip-row'>
        <strong>پلاک:</strong>
        <span>{plateNumber}</span>
      </div>
    </div>
  )
}
