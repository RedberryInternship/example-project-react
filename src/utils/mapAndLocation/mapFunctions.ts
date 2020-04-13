import moment from 'moment'
import SunCalc from 'suncalc'
import RNLocation, {
  Location,
  LocationPermissionStatus,
} from 'react-native-location'

import {Defaults, Const, Helpers} from 'utils'
import services from 'services'

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

export const getCoordsAnyway = async (): Promise<getCoordsAnywayType> => {
  try {
    const location: Location | null = await RNLocation.getLatestLocation({
      timeout: 30000,
    })
    if (location !== null)
      return {lat: location.latitude, lng: location.longitude}
    // else {
    //   Helpers.DisplayDropdownWithError()
    // }
  } catch (error) {
    Helpers.DisplayDropdownWithError()
    console.log('====================================')
    console.log("can't get location by gps")
    console.log('====================================')
  }

  try {
    const {Latitude, Longitude} = await services.getCoordsByIP()
    return {lat: Latitude, lng: Longitude}
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
