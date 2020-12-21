import { Charger } from 'types'
import { ReactElement } from 'react'

type PinsProps = {
  showAll: boolean,
  filteredChargersOnMap: Charger[],
  onMarkerPress: any
}

export type PinsFC = (params: PinsProps) => ReactElement
