import { Charger } from 'allTypes'
import { ReactElement } from 'react'

type PinsProps = {
  showAll: boolean,
  filteredChargersOnMap: Charger[],
  onMarkerPress: any
}

export type PinsFC = (params: PinsProps) => ReactElement
