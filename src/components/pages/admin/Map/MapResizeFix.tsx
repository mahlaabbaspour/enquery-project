import { useEffect } from 'react'

import { useMap } from 'react-leaflet'

export default function MapResizeFix() {
  const map = useMap()

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize()
    }, 300)
  }, [map])

  return null
}
