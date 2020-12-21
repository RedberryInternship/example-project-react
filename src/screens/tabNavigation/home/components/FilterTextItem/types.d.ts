import { ReactElement } from 'react'

type FilterTextItemProps = {
  text: string
  onPress: () => void
  active: boolean
}

export type FilterTextItemFC = (props: FilterTextItemProps) => ReactElement
