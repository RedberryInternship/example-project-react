import React, {ReactElement} from 'react'

import {
  ChargerMarkerIconControllerType,
  ChargerMarkerColor,
} from '../../../../@types/allTypes.d'

import RootPin from './RootPin'

const MarkerController = ({
  active,
  free,
  ...props
}: ChargerMarkerIconControllerType): ReactElement => {
  const getStatus = () => {
    if (!active) return ChargerMarkerColor.notWorking
    else if (free) return ChargerMarkerColor.free
    else return ChargerMarkerColor.busy
    //TODO: need on going charging status handling, which doeasn't exist //maybe finished, nned to be checked
  }

  return <RootPin {...props} pinColorType={getStatus()} />
}

export default MarkerController
