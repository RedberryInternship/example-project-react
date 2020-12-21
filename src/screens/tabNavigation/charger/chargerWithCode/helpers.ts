import Defaults from 'utils/defaults'
import services from 'services'
import {
  LastUsedChargerResponseObject,
  LastUsedCharger,
} from 'types'

/**
  * Get recently used chargers.
  */
export const recentlyUsedChargers = async (): Promise<LastUsedCharger[]> => {
  if (Defaults.token) {
    const res: LastUsedChargerResponseObject = await services.getUserChargers()
    return res.data
  }
  return []
}
