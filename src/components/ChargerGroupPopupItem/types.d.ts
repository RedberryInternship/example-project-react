import { ReactElement } from 'react'

type ChargerGroupPopupItemProps = {
  code: string | number | null
  onPress: () => void | null
  active: boolean
  text: string
  fastCharger: boolean
  privateCharger: boolean
  free: boolean
}

export type ChargerGroupPopupItemFC = (props: ChargerGroupPopupItemProps) => ReactElement
