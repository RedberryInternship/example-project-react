import { ReactElement } from 'react'
import { ChargingStatus } from 'types'

type CountDownProps = {
  popup?: boolean
} & PartialProps

type PartialProps = {
  startTime?: string
  alarm: boolean
  onFinish?: () => void
  penaltyEnabled: boolean
  chargingStatus: ChargingStatus
}

export type CountDownFC = (props: CountDownProps) => ReactElement

export type UseCountDown = PartialProps
