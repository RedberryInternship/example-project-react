import { ReactElement } from 'react'
import { ImageSourcePropType, ImageStyle } from 'react-native'

type TabNavigationButtonsItemProps = {
  navigate: () => void
  image: ImageSourcePropType
  imageStyle?: ImageStyle
  active: boolean
}

export type TabNavigationButtonsItemFC = (props: TabNavigationButtonsItemProps) => ReactElement
