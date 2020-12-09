import { ReactElement } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

type AddCardProps = {
  onPress: () => void | null
  style?: StyleProp<ViewStyle>
}

export type AddCardButtonFC = (params: AddCardProps) => ReactElement

type ChooseCardOnChargingProps = {
  lastDigits: string
  active: boolean
  onPress: () => void
}

export type ChooseCardOnChargingFC = (params: ChooseCardOnChargingProps) => ReactElement
