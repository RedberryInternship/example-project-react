import { ReactElement } from 'react'
import { Charger } from 'allTypes'

type HomeMainSearchResultProps = {
  item: Charger
  onSearchItemClickHandler: (lat: string, lng: string) => void
}

export type HomeMainSearchResultFC = (params: HomeMainSearchResultProps) => ReactElement
