import React, {ReactElement} from 'react'
import {Marker} from 'react-native-maps'

import MarkerController from 'components/svg'

type MapMarkerItemProps = {
  lat: number
  lng: number
  groupChargerCount: number
  onPress: () => void
  fastCharger: boolean
  privateCharger: boolean
  active: boolean
  free: boolean
  status: string
}
const MapMarkerItem = ({
  lat,
  lng,
  onPress,
  ...props
}: MapMarkerItemProps): ReactElement => {
  return (
    <Marker
      tracksViewChanges={false}
      collapsable={true}
      coordinate={{latitude: lat, longitude: lng}}
      onPress={onPress}
      anchor={{x: 0.5, y: 0.5}}
      tracksInfoWindowChanges={false}
    >
      <MarkerController {...props} />
    </Marker>
  )
}

export default React.memo(MapMarkerItem)
