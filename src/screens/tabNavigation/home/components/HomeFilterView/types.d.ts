import { ReactElement } from 'react'

type HomeFilterProps = {
  selectedFiltersOnMap: boolean[]
  handleMapFilterClick: (index: number) => void
}

export type HomeFilterFC = (props: HomeFilterProps) => ReactElement
