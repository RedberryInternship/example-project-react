import { ReactElement } from 'react'

type FinishedProps = {
  bottomDescription: string
  price: number
  consumedMoney: number
  refundMoney: number
  chargerTypeFAST: boolean
}

export type FinishedFC = (props: FinishedProps) => ReactElement
