import React from 'react'
import RootPin from 'components/RootPin'
import { ChargerMarkerColor } from 'types'
import { MarkerControllerFC } from './types'

const MarkerController: MarkerControllerFC = ({ status, ...props }) => {
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

  return <RootPin {...props} pinColorType={getStatus()} />
}

export default MarkerController
