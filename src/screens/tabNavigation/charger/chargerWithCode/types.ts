import { ReactElement } from 'react'

type ChargerItemProps = {
  code: string | number | undefined
  address: string | undefined
  onPress: () => void | undefined
}

export type ChargerItemFC = (params: ChargerItemProps) => ReactElement
