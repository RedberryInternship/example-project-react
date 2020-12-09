import { ReactElement } from 'react'
import {
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native'

type OnMapRoundButtonProps = {
  onPress: () => void
  style: StyleProp<ViewStyle>
  image: ImageSourcePropType
  imageStyle?: StyleProp<ImageStyle>
}

export type OnMapRoundButtonFC = (params: OnMapRoundButtonProps) => ReactElement
