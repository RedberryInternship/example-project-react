import moment from 'moment'
import SunCalc from 'suncalc'
import RNLocation, {
  Location,
  LocationPermissionStatus,
} from 'react-native-location'
import {
  check,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
  request,
} from 'react-native-permissions'

import {Defaults, Const, Helpers} from 'utils'
import services from 'services'
import {Alert} from 'react-native'

type RegionFrom = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export function regionFrom(
  lat: number,
  lng: number,
  zoomLevel: number,
): RegionFrom {
  zoomLevel = zoomLevel / 2
  const circumference = 40075
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000
  const angularDistance = zoomLevel / circumference

  const latitudeDelta = zoomLevel / oneDegreeOfLatitudeInMeters
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat),
    ),
  )
  return {
    latitude: lat,
    longitude: lng,
    latitudeDelta,
    longitudeDelta,
  }
}

export function determineTimePeriod() {
  if (Defaults.userDetail?.mapMode === 'settings.mapColorDark') return false
  else if (Defaults.userDetail?.mapMode === 'settings.mapColorLight')
    return true
  else {
    const times = SunCalc.getTimes(new Date(), 41.716667, 44.783333)
    return moment(moment()).isBetween(times.sunrise, times.sunset)
  }
}

export const mergeCoords = (
  lat: number | string,
  lng: number | string,
): string => {
  return lat + ',' + lng
}

type getCoordsAnywayType = {
  lat: number
  lng: number
}
let IPCoords: any = null

export const getCoordsAnyway = async (): Promise<getCoordsAnywayType> => {
  // checkMultiple([
  //   PERMISSIONS.IOS.LOCATION_ALWAYS,
  //   PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  // ])
  //   .then((result) => {
  //     console.log('====================================')
  //     console.log(result, 'checkMultiple result')
  //     console.log('====================================')
  //     request(PERMISSIONS.IOS.LOCATION_ALWAYS)
  //       .then((result) => {
  //         console.log('====================================')
  //         console.log(result, 'LOCATION_ALWAYS result')
  //         console.log('====================================')
  //       })
  //       .catch((error) => {
  //         Alert.alert('LOCATION_ALWAYS')
  //       })
  //     request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
  //       .then((result) => {
  //         console.log('====================================')
  //         console.log(result, 'LOCATION_WHEN_IN_USE result')
  //         console.log('====================================')
  //       })
  //       .catch((error) => {
  //         Alert.alert('LOCATION_WHEN_IN_USE')
  //       })
  //   })
  //   .catch((error) => {
  //     Alert.alert('main')
  //   })

  // RNLocation.getLatestLocation({
  //   timeout: 6000,
  // }).then((val) => {
  //   console.log('====================================')
  //   console.log(val, 'valval')
  //   console.log('====================================')
  // })
  if (isPermissionGrantedRegex(Defaults.locationPermissionStatus)) {
    try {
      const location: Location | null = await RNLocation.getLatestLocation({
        timeout: 6000,
      })
      if (location !== null)
        return {lat: location.latitude, lng: location.longitude}
      // else {
      //   Helpers.DisplayDropdownWithError('ver moiZebna')
      // }
    } catch (error) {
      Helpers.DisplayDropdownWithError()
      console.log('====================================')
      console.log("can't get location by gps")
      console.log('====================================')
    }
  }

  try {
    if (IPCoords === null) {
      const {Latitude, Longitude} = await services.getCoordsByIP()

      IPCoords = {lat: Latitude, lng: Longitude}
    }

    return IPCoords
  } catch (error) {
    Helpers.DisplayDropdownWithError()
    console.log('====================================')
    console.log("can't get location by ip")
    console.log('====================================')
  }

  return Const.locationIfNoGPS
}

export const isPermissionGrantedRegex = (status: LocationPermissionStatus) =>
  status.match(
    /authorizedAlways|authorizedWhenInUse|authorizedFine|authorizedCoarse/,
  )
export const isPermissionDeniedRegex = (status: LocationPermissionStatus) =>
  status.match(/denied|restricted|notDetermined/)
