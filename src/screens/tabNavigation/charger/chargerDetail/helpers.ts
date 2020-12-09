import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'
import defaults from 'utils/defaults'
import services from 'services'
import * as Const from 'utils/const'
import { getCoordsAnyway } from 'utils/mapAndLocation/mapFunctions'
import { isPermissionDeniedRegex } from 'utils/mapAndLocation/permissionsRegex'
import { getAndRequestLocation } from 'helpers/location'

/**
 * Calculate distance to charger.
 */
export const getDistance = async (lat: string, lng: string): Promise<any> => {
  try {
    const coords = await getCoordsAnyway()
    const result = await services.getDistance(coords.lat, coords.lng, lat, lng)
    if (result?.data.rows?.[0].elements?.[0].status !== 'ZERO_RESULTS') {
      return result?.data.rows?.[0].elements?.[0].distance.text
    }

    DisplayDropdownWithError('dropDownAlert.charging.noRouteFound')
    return '0'
  } catch (error) {
    remoteLogger(error)
    DisplayDropdownWithError()
    return '0'
  }
}

/**
 * Determine if location is enabled.
 */
export const isLocationEnabled = () => (
  defaults.locationPermission
  && isPermissionDeniedRegex(defaults.locationPermission)
)

/**
 * Ask for location allowance
 * if not enabled.
 */
export const askForLocationIfNotEnabled = async () => {
  if (isLocationEnabled() || !Const.platformIOS) {
    const status = await getAndRequestLocation()
    if (!status) {
      return DisplayDropdownWithError('dropDownAlert.pleaseAllowLocation')
    }
  }
}
