import { ReactElement } from 'react'

type BaseHeaderProps = {
  onPressLeft?: () => void
  title?: string
  onPressRight?: () => void
  titleRight?: string
  colorless?: boolean
  noInset?: boolean
  style?: any
  rightComponentTestId?: string
  testID?: string
  titleTestID?: string
}

export type BaseHeaderFC = (props: BaseHeaderProps) => ReactElement
