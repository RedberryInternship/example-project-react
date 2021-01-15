import { ReactElement } from 'react'

type CardListItemProps = {
  code: string
  selected: boolean
  selectDefaultCreditCard: () => void | null | any
  deleteCreditCard: () => void | null | any
  inUpdateMode: boolean
}

export type CardListItemFC = (props: CardListItemProps) => ReactElement
