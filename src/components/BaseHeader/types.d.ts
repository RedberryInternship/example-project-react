import { ReactElement } from 'react'

type BaseHeaderProps = {
  onPressLeft?: () => void
  title?: string
  onPressRight?: () => void
  titleRight?: string
  colorless?: boolean
  noInset?: boolean
  style?: any
}

export type BaseHeaderFC = (props: BaseHeaderProps) => ReactElement
