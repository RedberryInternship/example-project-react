import React, {ReactElement} from 'react'

import {
  ChargerMarkerIconRendererType,
  ChargerMarkerType,
  ChargerMarkerStatus,
} from '../../../../@types/allTypes.d'

import FastPublic from './FastPublic'
import FastNonPublic from './FastNonPublic'
import Lvl2Public from './Lvl2Public'
import Lvl2NonPublic from './Lvl2NonPublic'
import {Text} from 'react-native-svg'

const MarkerRenderer = ({
  type,
  status,
  width,
  height,
}: ChargerMarkerIconRendererType): ReactElement => {
  const determiteColor = (status: ChargerMarkerStatus): any => {
    const colors = {
      background: '#4393F1',
      stroke: 'black',
      width,
      height,
    }
    switch (status) {
      case ChargerMarkerStatus.free:
        colors.background = '#33D74B'
        colors.stroke = '#ffff'
        break
      case ChargerMarkerStatus.busy:
        colors.background = '#FFDA00'
        colors.stroke = '#ffff'
        break
      case ChargerMarkerStatus.notWorking:
        colors.background = '#FF3B3B'
        colors.stroke = '#ffff'
        break

      default:
        break
    }

    return colors
  }

  const determiteType = (type: ChargerMarkerType): ReactElement => {
    switch (type) {
      case ChargerMarkerType.fast__public:
        return <FastPublic {...determiteColor(status)} />
      case ChargerMarkerType.fast__nonPublic:
        return <FastNonPublic {...determiteColor(status)} />
      case ChargerMarkerType.lvl2__public:
        return <Lvl2Public {...determiteColor(status)} />
      case ChargerMarkerType.lvl2__nonPublic:
        return <Lvl2NonPublic {...determiteColor(status)} />
      default:
        return <Text>asasdasdasdasdas</Text>
    }
  }

  return determiteType(type)
}

export default MarkerRenderer
