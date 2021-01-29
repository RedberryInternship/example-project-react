import { ReactElement } from 'react'

type Props = {
  startTime: string
  alarm: boolean
  onFinish: any
  warningLevel: number
  penaltyEnabled: boolean
}

export type PopUpCountDownFC = (props: Props) => ReactElement
