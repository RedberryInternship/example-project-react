import React from 'react'
import RootPin from 'components/RootPin'
import { ChargerMarkerColor } from 'types'
import { MarkerControllerFC } from './types'

const MarkerController: MarkerControllerFC = ({
  status,
  width,
  height,
  privateCharger,
  fastCharger,
}) => {
  const getStatus = () => {
    switch (status) {
      case 'ACTIVE':
        return ChargerMarkerColor.free
      case 'INACTIVE':
        return ChargerMarkerColor.notWorking
      case 'CHARGING':
        return ChargerMarkerColor.busy
      case 'NOT_PRESENT':
        return ChargerMarkerColor.notPresent
      default:
        return ChargerMarkerColor.notWorking
    }
  }

  return (
    <RootPin
      width={width}
      height={height}
      privateCharger={privateCharger}
      fastCharger={fastCharger}
      pinColorType={getStatus()}
    />
  )
}

export default MarkerController
