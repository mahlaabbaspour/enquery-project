declare module 'react-leaflet-draw' {
  import * as React from 'react'

  import type * as L from 'leaflet'

  export interface EditControlProps {
    position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright'

    onCreated?: (e: any) => void
    onEdited?: (e: any) => void
    onDeleted?: (e: any) => void

    draw?: L.Control.DrawConstructorOptions['draw']
    edit?: L.Control.DrawConstructorOptions['edit']
  }

  export class EditControl extends React.Component<EditControlProps> {}
}
