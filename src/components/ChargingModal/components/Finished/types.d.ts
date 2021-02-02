import { ReactElement } from 'react'

type FinishedProps = {
  price: number
  consumedMoney: number
  refundMoney: number
}

export type FinishedFC = (props: FinishedProps) => ReactElement
