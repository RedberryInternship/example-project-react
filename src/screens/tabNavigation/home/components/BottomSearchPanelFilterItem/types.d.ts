import { ReactElement } from 'react'

type BottomSearchPanelFilterItemProps = {
  text: string
  onPress: () => void
  active: boolean
}

export type BottomSearchPanelFilterItemFC = (
  params: BottomSearchPanelFilterItemProps
) => ReactElement
