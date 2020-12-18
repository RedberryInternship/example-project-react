import { ReactElement } from 'react'
import {
  MapImperativeRefObject,
  Navigation,
  Charger,
} from 'types'

type HomeMainComponentProps = {
  navigation?: Navigation
  allChargers: Charger[]
  mapRef: MapImperativeRefObject
  setShowAll: (bool: boolean) => void
  mainInputRef: any
  handleMapFilterClick: (index: number) => void
  selectedFiltersOnMap: boolean[]
}

export type HomeMainFC = (params: HomeMainComponentProps) => ReactElement
