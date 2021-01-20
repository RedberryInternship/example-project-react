import { Alert, Linking, Platform } from 'react-native'
import RNLocation, { LocationPermissionStatus } from 'react-native-location'
import defaults from 'utils/defaults'
import i18next from 'i18next'
import * as Const from 'utils/const'
import { remoteLogger } from './inform'

/**
 * Determine if permission is granted.
 */
export const isPermissionGranted = (
  status: LocationPermissionStatus,
) => status.match(
  /authorizedAlways|authorizedWhenInUse|authorizedFine|authorizedCoarse/,
)

/**
 * Determine if permission is denied.
 */
export const isPermissionDenied = (
  status: LocationPermissionStatus,
) => status.match(/denied|restricted|notDetermined/)

/**
 * Request location permission.
 */
export const requestPermission = async (): Promise<boolean> => {
  const res = await RNLocation.requestPermission({
    ios: 'always',
    android: {
      detail: 'fine',
    },
  })

  return res
}

/**
 * Get and request location.
 */
export const getAndRequestLocation = async (): Promise<boolean> => {
  if (
    !isPermissionGranted(defaults.locationPermission)
    && Platform.OS === 'ios'
  ) {
    onLocationAccessDenied()
    return true
  } if (!isPermissionGranted(defaults.locationPermission)) {
    const status = await requestPermission()

    if (!status) {
      return false
    }
  }
  return true
}

/**
 * Upon location request denied display alert.
 */
const onLocationAccessDenied = (cb?: (status: boolean) => void) => {
  Alert.alert(
    i18next.t('needLocation'),
    i18next.t('locationIsDenied'),
    [
      {
        text: i18next.t('navigateToSettings'),
        onPress: () => {
          cb?.(true)
          Linking.openURL('app-settings:path=LOCATION')
        },
      },
      {
        text: i18next.t('no'),
        onPress: () => {
          cb?.(false)
        },
        style: 'destructive',
      },
    ],
    { cancelable: true },
  )
}

/**
 * Determine if location is enabled.
 */
export const isLocationEnabled = () => (
  defaults.locationPermission
  && isPermissionDenied(defaults.locationPermission)
)

/**
 * Determine if location is not determined.
 */
export const isLocationNotDetermined = () => (
  defaults.locationPermission.match(/notDetermined/)
)

/**
 * Update current location.
 */
export const retrieveLocation = async () => {
  if (defaults.location?.lat && defaults.location?.lng) {
    return
  }

  try {
    const currentLocation = await RNLocation.getLatestLocation({ timeout: 3000 })

    defaults.location = {
      lat: currentLocation?.latitude ?? Const.locationIfNoGPS.lat,
      lng: currentLocation?.longitude ?? Const.locationIfNoGPS.lng,
    }
  } catch (e) {
    remoteLogger(e)
    defaults.location = {
      lat: Const.locationIfNoGPS.lat,
      lng: Const.locationIfNoGPS.lng,
    }
  }
}
