import { ReactElement } from 'react'
import {
  GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextProps,
} from 'react-native'

type LocaleButton = {
  onPress: () => void
  text: string
  style?: ViewStyle
  textStyle?: TextStyle
}

export type LocaleButtonItemFC = (params: LocaleButton) => ReactElement

type AvatarWithLabel = {
  onPress: (event?: GestureResponderEvent) => void | undefined
  firstName: string
  lastName: string
  avatar: number | undefined
}

export type AvatarWithLabelFC = (params: AvatarWithLabel) => ReactElement

type DrawerTextFieldItemProps = {
  onPress: () => void
  text: string
  textProps?: TextProps
  image: ImageSourcePropType
  imageStyle?: ImageStyle
  container?: StyleProp<ViewStyle>
  badge?: number
}

export type DrawerTextFieldItemFC = (params: DrawerTextFieldItemProps) => ReactElement