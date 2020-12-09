import { ReactElement } from 'react'

type TitleTopLeftContainerProps = {
  title?: string
  data?: Array<any> | null
  onRenderItem: (value: any, index: number) => {} | null | undefined
  direction: 'row' | 'column'
}

export type TitleTopLeftContainerFC = (props: TitleTopLeftContainerProps) => ReactElement
