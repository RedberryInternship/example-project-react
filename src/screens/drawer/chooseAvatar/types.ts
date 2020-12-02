import { ReactElement } from 'react'
import { ImageSourcePropType } from 'react-native'

type AvatarItemProps = {
  onPress: () => void
  image: ImageSourcePropType
  active: boolean
}

export type AvatarItemFC = (params: AvatarItemProps) => ReactElement