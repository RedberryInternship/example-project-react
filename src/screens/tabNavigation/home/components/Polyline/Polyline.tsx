import React, { useMemo } from 'react'
import { Polyline as MapPolyline } from 'react-native-maps'
import colors from 'utils/colors'
import { PolylineFC } from './types'

const Polyline: PolylineFC = ({ polyline }) => {
  if (!polyline.length) {
    return <></>
  }
  return useMemo(
    () => (
      <>
        <MapPolyline
          key={1.4}
          coordinates={polyline}
          strokeWidth={8}
          strokeColor={colors.primaryGreen}
          zIndex={Number.MAX_VALUE}
          geodesic
        />
        <MapPolyline
          key={1}
          coordinates={polyline}
          strokeWidth={4}
          fillColor={colors.primaryBlue}
          zIndex={Number.MAX_VALUE}
        />
      </>
    ),
    [polyline],
  )
}

export default Polyline
