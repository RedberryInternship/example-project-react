import { JSX } from 'react'

type Props = {
  value: string
  selected: boolean
  onPress: any
}

export type ListItemFC = (props: Props) => JSX.Element
