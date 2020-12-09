import { ReactElement } from 'react'
import {
  MapImperativeRefObject,
  Navigation,
  Charger,
} from 'allTypes'

type HomeMainComponentProps = {
  navigation?: Navigation
  allChargers: Charger[]
  mapRef: MapImperativeRefObject
  setShowAll: (bool: boolean) => void
  mainInputRef: any
}

export type HomeMainFC = (params: HomeMainComponentProps) => ReactElement
