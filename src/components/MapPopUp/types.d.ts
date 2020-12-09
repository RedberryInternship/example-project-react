import { ChargerDetail } from 'allTypes'
import { ReactElement } from 'react'

type Data = {
  title: string
  address: string
  chargers: ChargerDetail[]
  onChargerSelect: (index: number) => void
}

type MapPopUpProps = {
  data: Data
  close: () => void
}

export type MapPopUpFC = (props: MapPopUpProps) => ReactElement
