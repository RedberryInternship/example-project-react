import { ReactElement } from 'react'

type BeforeFineLVL2FullChargeProps = {
  time: string
  bottomDescription: string
  price: number
  consumedMoney: number
  refundMoney: number
  onFine: boolean
  onFinish: () => void
}

export type BeforeFineLVL2FullChargeFC = (props: BeforeFineLVL2FullChargeProps) => ReactElement
