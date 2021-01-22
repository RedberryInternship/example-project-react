import { ReactElement } from 'react'

type ChargerTypesItemProps = {
  type: 'Combo 2' | 'Type 2' | 'CHAdeMO'
  power: string
  active: boolean
  onPress: () => void
}

export type ChargerTypeItemFC = (params: ChargerTypesItemProps) => ReactElement
