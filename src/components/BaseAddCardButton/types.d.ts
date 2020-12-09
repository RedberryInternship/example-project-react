import { ReactElement } from 'react'
import {
  StyleProp,
  ViewStyle,
} from 'react-native'

type AddCardProps = {
  onPress: () => void | null
  style?: StyleProp<ViewStyle>
}

export type AddCardFC = (props: AddCardProps) => ReactElement
