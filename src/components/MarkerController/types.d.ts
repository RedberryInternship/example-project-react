import { ReactElement } from 'react'

export type MarkerControllerProps = {
  active: boolean
  status: string
  groupChargerCount?: number
  privateCharger: boolean
  fastCharger: boolean
  free: boolean
  width?: number
  height?: number
}

export type MarkerControllerFC = (props: MarkerControllerProps) => ReactElement
