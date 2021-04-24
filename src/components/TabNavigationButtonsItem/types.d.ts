import { ReactElement } from 'react'
import { ImageSourcePropType, ImageStyle } from 'react-native'

type TabNavigationButtonsItemProps = {
  navigate: () => void
  image: ImageSourcePropType
  imageStyle?: ImageStyle
  active: boolean
  testID?: string
}

export type TabNavigationButtonsItemFC = (props: TabNavigationButtonsItemProps) => ReactElement
