import { RefObject, ForwardedRef } from 'react'
import { Location, LocationPermissionStatus } from 'react-native-location'
import MapView from 'react-native-maps'
import { Charger } from 'types'

export type MapViewProps = {
  showAll: boolean
  filteredChargersOnMap: Charger[]
}

export type UseLocationProps = {
  mapRef: RefObject<MapView>
  setPolyline: (data: any) => void
}

export type LocationOptions = {
  interval: number
  location: Location | null
  permissionStatus: LocationPermissionStatus | null
  GPSEnabled: boolean
}

export type UseMapView = {
  ref: ForwardedRef<MapView>,
  mapRef: RefObject<MapView>,
}
