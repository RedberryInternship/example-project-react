/* eslint-disable import/prefer-default-export */
import { Alert, Linking, Platform } from 'react-native'
import { isPermissionGrantedRegex } from 'utils/mapAndLocation/permissionsRegex'
import locationConfig from 'utils/mapAndLocation/location'
import Defaults from 'utils/defaults'
import i18next from 'i18next'

export const getAndRequestLocation = async (): Promise<boolean> => {
  if (
    !isPermissionGrantedRegex(Defaults.locationPermission)
    && Platform.OS === 'ios'
  ) {
    onLocationAccessDenied()
    return true
  } if (!isPermissionGrantedRegex(Defaults.locationPermission)) {
    const status = await locationConfig.requestPermission()

    if (!status) return false
  }
  return true
}

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
