import { ReactElement } from 'react'

type TransactionItemProps = {
  charger_name: string
  start_date: string
  charge_price: string
  onPress: () => void
}

export type TransactionItemFC = (params: TransactionItemProps) => ReactElement
