import React, {ReactElement} from 'react'

import {
  ChargerMarkerIconControllerType,
  ChargerMarkerType,
  ChargerMarkerStatus,
} from '../../../../@types/allTypes.d'

import MarkerRenderer from './MarkerRenderer'

const MarkerController = ({
  active,
  connectorType,
  publicCharger,
  free,
  width,
  height,
}: ChargerMarkerIconControllerType): ReactElement => {
  const getStatus = () => {
    if (active === 0) return ChargerMarkerStatus.notWorking
    else if (free === true) return ChargerMarkerStatus.free
    else return ChargerMarkerStatus.busy
    //TODO: need on going charging status handling, which doeasn't exist //maybe finished, nned to be checked
  }

  const getType = () => {
    let _connectorType = 'lvl2'
    let _publicCharger = 'public'

    if (connectorType !== 'Type 2') _connectorType = 'fast'

    if (publicCharger === 0) _publicCharger = 'nonPublic'

    return ChargerMarkerType[`${_connectorType}__${_publicCharger}`]
  }

  return (
    <MarkerRenderer
      type={getType()}
      status={getStatus()}
      width={width}
      height={height}
    />
  )
}

export default MarkerController
