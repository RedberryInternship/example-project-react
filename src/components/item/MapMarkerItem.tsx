import React, {ReactElement} from 'react'
import {View} from 'react-native'
import {Marker} from 'react-native-maps'

type MapMarkerItemProps = {
  lat: number
  lng: number
  onPress: () => void
}
const MapMarkerItem = ({
  lat,
  lng,
  onPress,
}: MapMarkerItemProps): ReactElement => {
  return (
    <Marker
      tracksViewChanges={false}
      collapsable={true}
      coordinate={{latitude: lat, longitude: lng}}
      onPress={onPress}
      anchor={{x: 0.5, y: 0.5}}>
      {/*TODO: need to be changed with Image*/}
      <View style={{width: 20, height: 20, backgroundColor: 'red'}}></View>
    </Marker>
  )
}

export default MapMarkerItem
