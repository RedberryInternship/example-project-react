import { JSX } from 'react'

type Props = {
  value: string
  label: string
  selected: boolean
  onPress: any
}

export type ListItemFC = (props: Props) => JSX.Element
