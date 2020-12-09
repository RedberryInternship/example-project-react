import { ReactElement } from 'react'
import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'

type BaseButtonProps = {
  onPress: () => void
  text: string
  textStyle?: TextStyle
  image?: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  imageStyle?: ImageStyle
  isImageRight?: boolean
  loading?: boolean
}

export type BaseButtonFC = (props: BaseButtonProps) => ReactElement
