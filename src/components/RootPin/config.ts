import { ChargerMarkerColor } from 'types'

export const pinColorTypes = {
  [ChargerMarkerColor.group]: { startColor: '#019AF0', stopColor: '#1066E4' },
  [ChargerMarkerColor.free]: { startColor: '#3BEF55', stopColor: '#33D74B' },
  [ChargerMarkerColor.busy]: { startColor: '#FFDA00', stopColor: '#FFEA72' },
  [ChargerMarkerColor.notWorking]: {
    startColor: '#FF6F6F',
    stopColor: '#FF3B3B',
  },
  [ChargerMarkerColor.notPresent]: { startColor: '#000000', stopColor: '#2f3337' },
}
