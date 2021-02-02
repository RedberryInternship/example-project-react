import { ReactElement } from 'react'
import { ChargingStatus } from 'types'

type BeforeFineLVL2FullChargeProps = {
  time: string
  bottomDescription: string
  price: number
  consumedMoney: number
  refundMoney: number
  onFine: boolean
  onFinish: () => void
  penalty_enabled: boolean
  charging_status: ChargingStatus
}

export type BeforeFineLVL2FullChargeFC = (props: BeforeFineLVL2FullChargeProps) => ReactElement
