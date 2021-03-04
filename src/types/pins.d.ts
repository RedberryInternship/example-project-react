import { ChargerMarkerColor } from 'types/enums'

export type ChargerMarkerIcon = {
  width?: number
  height?: number
  pinColorType: ChargerMarkerColor
  privateCharger?: boolean
  fastCharger?: boolean
}
