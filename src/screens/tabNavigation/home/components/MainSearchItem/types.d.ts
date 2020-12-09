import { ReactElement } from 'react'

type MainSearchItemProps = {
  mainTitle: string
  text: string
  onPress: () => void
}

export type MainSearchItemFC = (params: MainSearchItemProps) => ReactElement
