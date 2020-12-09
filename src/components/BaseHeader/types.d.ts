import { ReactElement } from 'react'

type BaseHeaderProps = {
  onPressLeft?: () => void
  title?: string
  onPressRight?: () => void
  titleRight?: string
}

export type BaseHeaderFC = (props: BaseHeaderProps) => ReactElement
