'use client'
import { useEffect, useRef } from 'react'

import { MapContainer, TileLayer, FeatureGroup, Marker, Tooltip, useMap, Popup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import type { FeatureGroup as LeafletFeatureGroup } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import L from 'leaflet'

import type { VehicleLocation } from '@/types/vehicleLocation'
import VehicleTooltip from './VehicleTooltip'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const editIcon = new L.DivIcon({
  iconSize: new L.Point(14, 14),
  className: 'leaflet-div-icon leaflet-editing-icon'
})

const safelySetIcon = (proto: any) => {
  if (proto && proto.options) {
    proto.options.icon = editIcon
  }
}

safelySetIcon((L.Draw as any)?.Polygon?.prototype)
safelySetIcon((L.Edit as any)?.PolyVerticesEdit?.prototype)

type LeafletMapProps = {
  polygon?: [number, number][]
  onPolygonChange?: (polygon: [number, number][]) => void
  readonly?: boolean
  vehicles?: VehicleLocation[]
}

function MapResizeFixer() {
  const map = useMap()

  useEffect(() => {
    const invalidate = () => map.invalidateSize()

    const timer = setTimeout(invalidate, 100)

    const container = map.getContainer()
    const resizeObserver = new ResizeObserver(invalidate)

    resizeObserver.observe(container)

    window.addEventListener('resize', invalidate)

    return () => {
      clearTimeout(timer)
      resizeObserver.disconnect()
      window.removeEventListener('resize', invalidate)
    }
  }, [map])

  return null
}

function FitVehiclesBounds({ vehicles }: { vehicles: VehicleLocation[] }) {
  const map = useMap()

  useEffect(() => {
    if (!vehicles.length) return

    const bounds = L.latLngBounds(vehicles.map(v => [Number(v.latitude), Number(v.longitude)]))

    map.fitBounds(bounds, {
      padding: [50, 50]
    })
  }, [vehicles, map])

  return null
}

export default function LeafletMap({
  polygon = [],
  onPolygonChange,
  readonly = false,
  vehicles = []
}: LeafletMapProps) {
  const featureGroupRef = useRef<LeafletFeatureGroup | null>(null)

  const stylePolygon = (layer: L.Polygon) => {
    layer.setStyle({
      color: '#b581f5da',
      fillColor: '#c596ffda',
      fillOpacity: 0.25,
      weight: 3
    })
    layer.on('mouseover', () => {
      layer.setStyle({
        fillOpacity: 0.5
      })
    })
    layer.on('mouseout', () => {
      layer.setStyle({
        fillOpacity: 0.25
      })
    })
  }

  const handleCreated = (e: any) => {
    const layer = e.layer

    stylePolygon(layer)
    const points = layer.getLatLngs()[0]
    const newPolygon = points.map((point: any) => [point.lat, point.lng])

    onPolygonChange?.(newPolygon)
  }

  const handleEdited = (e: any) => {
    e.layers.eachLayer((layer: any) => {
      const points = layer.getLatLngs()[0]
      const newPolygon = points.map((point: any) => [point.lat, point.lng])

      onPolygonChange?.(newPolygon)
    })
  }

  const handleDeleted = () => {
    onPolygonChange?.([])
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!featureGroupRef.current) return
      featureGroupRef.current.clearLayers()
      if (!polygon.length) return
      const layer = L.polygon(polygon)

      stylePolygon(layer)
      featureGroupRef.current.addLayer(layer)
    }, 0)

    return () => clearTimeout(timer)
  }, [polygon])

  return (
    <>
      <style jsx global>{`
        .leaflet-container img {
          max-width: none !important;
        }

        .leaflet-draw-tooltip {
          pointer-events: none !important;
        }

        .leaflet-container.crosshair-cursor-enabled,
        .leaflet-container.crosshair-cursor-enabled .leaflet-interactive {
          cursor: crosshair !important;
        }

        .leaflet-editing-icon {
          width: 14px !important;
          height: 14px !important;
          margin-left: -7px !important;
          margin-top: -7px !important;
        }

        .vehicle-marker-tooltip {
          text-align: right;
          font-family: inherit;
        }

        .vehicle-marker-tooltip .vehicle-tooltip-row {
          display: flex;
          gap: 4px;
          white-space: nowrap;
        }

        .vehicle-marker-tooltip .vehicle-tooltip-row strong {
          font-weight: 700;
        }
      `}</style>

      <MapContainer
        center={[32.8663, 59.2211]}
        zoom={16}
        style={{
          height: '600px',
          width: '100%'
        }}
      >
        <MapResizeFixer />

        <FitVehiclesBounds vehicles={vehicles} />

        <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png' />

        {vehicles.map(v => (
          <Marker key={v.id} position={[Number(v.latitude), Number(v.longitude)]}>
            <Popup>
              <VehicleTooltip
                driver={v.vehicle.driver.name}
                vehicleType={v.vehicle.vehicle_type.name}
                plateNumber={v.vehicle.plate_number}
              />
            </Popup>
          </Marker>
        ))}

        <FeatureGroup ref={featureGroupRef}>
          {!readonly && (
            <EditControl
              position='topright'
              onCreated={handleCreated}
              onEdited={handleEdited}
              onDeleted={handleDeleted}
              draw={{
                polygon: {
                  allowIntersection: false,
                  showArea: true
                },
                rectangle: false,
                circle: false,
                marker: false,
                circlemarker: false,
                polyline: false
              }}
              edit={{
                edit: true,
                remove: true
              }}
            />
          )}
        </FeatureGroup>
      </MapContainer>
    </>
  )
}
