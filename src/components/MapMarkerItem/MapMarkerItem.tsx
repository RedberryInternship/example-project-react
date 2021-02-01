import React from 'react'
import { Marker } from 'react-native-maps'
import MarkerController from 'components/MarkerController'
import { MapMarkerItemFC } from './types'

const MapMarkerItem: MapMarkerItemFC = (
  {
    lat,
    lng,
    onPress,
    ...props
  },
) => (
  <Marker
    tracksViewChanges={false}
    coordinate={{ latitude: lat, longitude: lng }}
    tracksInfoWindowChanges={false}
    anchor={{ x: 0.5, y: 0.5 }}
    collapse
    onPress={onPress}
  >
    <MarkerController {...props} />
  </Marker>
)

export default React.memo(MapMarkerItem)
