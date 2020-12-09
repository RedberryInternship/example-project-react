import { ReactElement } from 'react'

type LegendColorItemProps = {
  text: string
  color: string
}

export type LegendColorItemFC = (props: LegendColorItemProps) => ReactElement
