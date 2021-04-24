import { ReactElement } from 'react'
import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native'

type BaseButtonProps = {
  onPress: () => void
  text: string
  textStyle?: TextStyle
  image?: ImageSourcePropType
  style?: ViewStyle
  imageStyle?: ImageStyle
  isImageRight?: boolean
  loading?: boolean
  testID?: string
}

export type BaseButtonFC = (props: BaseButtonProps) => ReactElement
