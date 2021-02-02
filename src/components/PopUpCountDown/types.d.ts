import { ReactElement } from 'react'
import { ChargingStatus } from 'types'

type Props = {
  startTime: string
  alarm: boolean
  onFinish: any
  warningLevel: number
  penaltyEnabled: boolean
  chargingStatus: ChargingStatus
}

export type PopUpCountDownFC = (props: Props) => ReactElement
