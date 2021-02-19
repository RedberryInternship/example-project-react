import { ReactElement } from 'react'

export type MarkerControllerProps = {
  status: string
  groupChargerCount?: number
  privateCharger: boolean
  fastCharger: boolean
  width?: number
  height?: number
}

export type MarkerControllerFC = (props: MarkerControllerProps) => ReactElement
