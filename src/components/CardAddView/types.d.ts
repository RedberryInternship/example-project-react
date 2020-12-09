import { ReactElement } from 'react'

type CardAddViewProps = {
  onSuccess: () => void
  onFail?: () => void
}

export type CardAddViewFC = (props: CardAddViewProps) => ReactElement
export type UseCardAddViewProps = CardAddViewProps
