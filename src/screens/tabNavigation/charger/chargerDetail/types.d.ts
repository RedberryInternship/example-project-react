import { ReactElement } from 'react'
import {
  Charger as BaseCharger,
  ChargerConnectorType,
} from 'types'

export type Charger = (BaseCharger & { from?: string }) | undefined

type BusinessServiceItemProps = {
  image: string
  onPress: () => void
}

export type BusinessServiceItemFC = (params: BusinessServiceItemProps) => ReactElement

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

type ChargerTypesItemProps = {
  type: 'Combo 2' | 'Type 2' | 'CHAdeMO'
  power: string
  active: boolean
  onPress: () => void
}

export type ChargerTypeItemFC = (params: ChargerTypesItemProps) => ReactElement

type CurrentTariffsProps = {
  connector?: ChargerConnectorType
}

export type CurrentTariffsFC = (params: CurrentTariffsProps) => ReactElement

type CurrentTariffsRowProps = {
  col1: string
  col2: string
  col3: string
  col4: string
}

export type CurrentTariffsRowFC = (params: CurrentTariffsRowProps) => ReactElement
