import { ReactElement } from 'react'

type CardListItemProps = {
  code: string
  selected: boolean
  onPress: () => void | null | any
}

export type CardListItemFC = (props: CardListItemProps) => ReactElement
