import React from 'react'
import {View} from 'react-native'
import {Marker} from 'react-native-maps'

const onMapRoundButton = ({lat, lng}: any) => {
  return (
    <Marker
      tracksViewChanges={false}
      collapsable={true}
      coordinate={{latitude: lat, longitude: lng}}
      anchor={{x: 0.5, y: 0.5}}>
      <View style={{width: 20, height: 20, backgroundColor: 'red'}}></View>
    </Marker>
  )
}

export default onMapRoundButton
