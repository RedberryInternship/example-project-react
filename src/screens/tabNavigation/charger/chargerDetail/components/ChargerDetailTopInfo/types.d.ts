import { ReactElement } from 'react'

type ChargerDetailTopInfoProps = {
  chargerLocationDirectionPress: () => void
  showChargerLocationPress: () => void
  favoritePress: () => void
  code: string | number | undefined
  location: string
  favorite: boolean | null | undefined
  distance: string
}

export type ChargerDetailTopInfoFC = (params: ChargerDetailTopInfoProps) => ReactElement
