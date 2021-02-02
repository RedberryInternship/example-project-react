import { ReactElement } from 'react'

type BusinessServiceItemProps = {
  image: string
  onPress: () => void
}

export type BusinessServiceItemFC = (params: BusinessServiceItemProps) => ReactElement
