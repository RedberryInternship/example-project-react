import { ReactElement } from 'react'
import { ImageSourcePropType } from 'react-native'

type TabNavigationButtonsItemProps = {
  navigate: () => void
  image: ImageSourcePropType
  active: boolean
}

export type TabNavigationButtonsItemFC = (props: TabNavigationButtonsItemProps) => ReactElement
