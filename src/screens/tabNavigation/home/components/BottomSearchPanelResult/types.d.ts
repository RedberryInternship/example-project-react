import { Charger, ChargerDetail } from 'types'
import { ReactElement } from 'react'

type BottomSearchPanelResultProps = {
  filteredChargers: Charger[]
  onFilteredItemClick: (charger: ChargerDetail) => void
}

export type BottomSearchPanelResultFC = (params: BottomSearchPanelResultProps) => ReactElement
