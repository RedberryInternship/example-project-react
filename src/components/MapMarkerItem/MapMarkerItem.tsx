import React from 'react'
import { Marker } from 'react-native-maps'
import { MarkerController } from 'components'
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
      collapse
      coordinate={{ latitude: lat, longitude: lng }}
      onPress={onPress}
      anchor={{ x: 0.5, y: 0.5 }}
      tracksInfoWindowChanges={false}
    >
      <MarkerController {...props} />
    </Marker>
  )

export default React.memo(MapMarkerItem)
