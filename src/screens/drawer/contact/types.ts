import { ReactElement } from 'react'
import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native'

type ContactItemProps = {
  image: ImageSourcePropType
  name: string
  value: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

export type ContactListItemFC = (params: ContactItemProps) => ReactElement

export type ErrorMessageType = 'Address' | 'Phone' | 'Mail' | 'Facebook' | 'Web'

export type OpenUrl = (
  url: string,
  errorMsgType: ErrorMessageType,
  backupUrl?: string | boolean
) => Promise<void>
