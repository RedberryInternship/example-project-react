import { ReactElement } from 'react'

type DetailsItemProps = {
  name: string
  value: string | null
}

export type DetailsItemFC = (params: DetailsItemProps) => ReactElement
