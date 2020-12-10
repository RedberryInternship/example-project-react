import { ChargerMarkerColor } from 'types/enums'

export type ChargerMarkerIcon = {
  width?: number
  height?: number
  groupChargerCount?: number
  pinColorType: ChargerMarkerColor
  privateCharger?: boolean
  fastCharger?: boolean
}
