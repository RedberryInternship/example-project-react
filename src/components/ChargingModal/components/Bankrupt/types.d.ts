import { ReactElement } from 'react'

type BankruptProps = {
  bottomDescription: string
  price: number
}

export type BankruptFC = (props: BankruptProps) => ReactElement
