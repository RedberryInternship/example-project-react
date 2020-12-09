import { Charger, ChargerDetail } from 'allTypes'

type BottomSearchPanelProps = {
  onFilterClick: (index: number) => void
  selectedFilters: boolean[]
  filteredChargers: Charger[]
  onFilteredItemClick: (charger: ChargerDetail) => void
  textHandler: (text: string) => void
}
