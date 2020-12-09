import { ReactElement } from 'react'

type LegendItemProps = {
  text: string
  privateCharger?: boolean
  fastCharger?: boolean
}

export type LegendItemFC = (props: LegendItemProps) => ReactElement
