import { Ref } from 'react'
import { MapViewProps } from 'react-native-maps'

export type MapImperativeRefObject = Ref<MapImperativeCustomProps & MapViewProps>

type MapImperativeCustomProps = {
  locate: () => void
  showRoute: (lat: number, lng: number, showRoute?: boolean) => void
  animateToCoords: (lat: number, lng: number, zoomLevel?: number, duration?: number) => void
}

export type Coords = {
  lng: number
  lat: number
} | null
