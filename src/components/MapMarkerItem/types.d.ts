import { ReactElement } from 'react'

type MapMarkerItemProps = {
  lat: number
  lng: number
  groupChargerCount: number
  onPress: () => void
  fastCharger: boolean
  privateCharger: boolean
  status: string
}

export type MapMarkerItemFC = (props: MapMarkerItemProps) => ReactElement