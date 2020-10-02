import React, { ReactElement } from 'react'

import { ChargerMarkerIconControllerType, ChargerMarkerColor } from '../../../../@types/allTypes.d'

import RootPin from './RootPin'

const MarkerController = ({ status, ...props }: ChargerMarkerIconControllerType): ReactElement => {
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
    }
    return ChargerMarkerColor.notWorking
  }

  return <RootPin {...props} pinColorType={getStatus()} />
}

export default MarkerController
