import { ReactElement } from 'react'

type CountDownProps = {
  popup?: boolean
} & PartialProps

type PartialProps = {
  startTime?: string
  alarm: boolean
  onFinish?: () => void
}

export type CountDownFC = (props: CountDownProps) => ReactElement

export type UseCountDown = PartialProps
