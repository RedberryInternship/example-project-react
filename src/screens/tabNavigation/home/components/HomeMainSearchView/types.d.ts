import { ReactElement } from 'react'
import { Charger, MapImperativeRefObject } from 'allTypes'

export type HomeMainSearchViewProps = {
  allChargers: Charger[]
  mapRef: MapImperativeRefObject
  setShowAll: (boolean: boolean) => void
}

export type UseHomeMainSearchViewProps = {
  allChargers: Charger[],
  mapRef: MapImperativeRefObject,
  setShowAll: (boolean: boolean) => void,
}

export type SearchResultItem = (params: { item: Charger }) => ReactElement
