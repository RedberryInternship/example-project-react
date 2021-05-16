import { ReactElement } from 'react'

type ModalPopupChargerItemProps = {
  type: number
  val: number
  amountTestID?: string
}

export type ModalPopupChargerItemFC = (props: ModalPopupChargerItemProps) => ReactElement
