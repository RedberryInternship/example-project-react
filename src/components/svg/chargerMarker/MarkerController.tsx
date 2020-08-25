import React, { ReactElement } from 'react'

import {
  ChargerMarkerIconControllerType,
  ChargerMarkerColor,
} from '../../../../@types/allTypes.d'

import RootPin from './RootPin'

const MarkerController = ({
  status,
  ...props
}: ChargerMarkerIconControllerType): ReactElement => {
  const getStatus = () => {
    switch (status) {
      case 'ACTIVE':
        return ChargerMarkerColor.free
        break;
      case 'INACTIVE':
        return ChargerMarkerColor.notWorking
        break;
      case 'CHARGING':
        return ChargerMarkerColor.busy
        break;
    }
    return ChargerMarkerColor.notWorking
  }

  return <RootPin {...props} pinColorType={getStatus()} />
}

export default MarkerController
