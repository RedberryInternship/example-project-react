import { Charger, ChargerDetail } from 'types'

type BottomSearchPanelProps = {
  onFilterClick: (index: number) => void
  selectedFilters: boolean[]
  filteredChargers: Charger[]
  onFilteredItemClick: (charger: ChargerDetail) => void
  textHandler: (text: string) => void
}
