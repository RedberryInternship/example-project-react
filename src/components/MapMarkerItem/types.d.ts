import { ReactElement } from 'react'

type MapMarkerItemProps = {
  lat: number
  lng: number
  onPress: () => void
  fastCharger: boolean
  privateCharger: boolean
  status: string
  testID: string
}

export type MapMarkerItemFC = (props: MapMarkerItemProps) => ReactElement
