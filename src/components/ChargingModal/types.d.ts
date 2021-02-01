import { ChargingFinishedPopupEnum, ChargingStatus } from 'types'
import { ReactElement } from 'react'

type Data = {
  title: string
  description: string
  bottomDescription: string
  price: number
  time: string
  consumedMoney: number
  refundMoney: number
  onFine: boolean
  onFinish: () => void
  chargerTypeFAST: boolean
  penalty_enabled?: boolean
  charging_status: ChargingStatus
}

type ChargingModalProps = {
  onPress: () => void
  subType?: ChargingFinishedPopupEnum
  data: Data
}

export type ChargingModalFC = (props: ChargingModalProps) => ReactElement
