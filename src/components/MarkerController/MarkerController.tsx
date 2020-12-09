import React from 'react'
import { ChargerMarkerColor } from 'allTypes'
import { RootPin } from 'components'
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
