import React from 'react'
import { Marker } from 'react-native-maps'
import MarkerController from 'components/MarkerController'
import { MapMarkerItemFC } from './types'

const MapMarkerItem: MapMarkerItemFC = (
  {
    lat,
    lng,
    onPress,
    fastCharger,
    privateCharger,
    status,
  },
) => (
  <Marker
    tracksViewChanges={false}
    coordinate={{ latitude: lat, longitude: lng }}
    tracksInfoWindowChanges={false}
    anchor={{ x: 0.5, y: 0.5 }}
    onPress={onPress}
    collapsable
  >
    <MarkerController
      status={status}
      privateCharger={privateCharger}
      fastCharger={fastCharger}
    />
  </Marker>
)

export default React.memo(MapMarkerItem)
