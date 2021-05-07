import { ReactElement } from 'react'
import { ImageSourcePropType } from 'react-native'

type SettingsListItemProps = {
  onPress: () => void
  image: ImageSourcePropType
  name: string
  value: string
  onEmptyText?: string
  color?: string
  testID?: string
}

export type SettingsListItemFC = (params: SettingsListItemProps) => ReactElement
