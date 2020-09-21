import { LocationPermissionStatus } from 'react-native-location'

export const isPermissionGrantedRegex = (status: LocationPermissionStatus) =>
  status.match(
    /authorizedAlways|authorizedWhenInUse|authorizedFine|authorizedCoarse/,
  )
export const isPermissionDeniedRegex = (status: LocationPermissionStatus) =>
  status.match(/denied|restricted|notDetermined/)
