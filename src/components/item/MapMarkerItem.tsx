import React, {ReactElement} from 'react'
import {View, Alert} from 'react-native'
import {Marker} from 'react-native-maps'
import MarkerController from 'components/svg'

import {
  ChargerMarkerIconControllerType,
  ChargerMarkerType,
  ChargerMarkerStatus,
} from '../../../@types/allTypes.d'
type MapMarkerItemProps = {
  lat: number
  lng: number
  onPress: () => void
  connectorType: string | undefined
  publicCharger: number
  active: number
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
      anchor={{x: 0.5, y: 0.5}}>
      <MarkerController {...props} />
    </Marker>
  )
}

export default MapMarkerItem
