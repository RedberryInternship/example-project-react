import moment from 'moment'
import SunCalc from 'suncalc'
import RNLocation, { Location } from 'react-native-location'

import Defaults from 'utils/defaults'
import * as Const from 'utils/const'
import services from 'services'
import { isPermissionGrantedRegex } from './permissionsRegex'
import { DisplayDropdownWithError } from 'helpers/inform'

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

type getCoordsAnywayType = {
  lat: number
  lng: number
}
let IPCoords: any = null

export const getCoordsAnyway = async (): Promise<getCoordsAnywayType> => {
  if (isPermissionGrantedRegex(Defaults.locationPermissionStatus)) {
    try {
      const location: Location | null = await RNLocation.getLatestLocation({
        timeout: 6000,
      })
      if (location !== null)
        return { lat: location.latitude, lng: location.longitude }
    } catch (error) {
      DisplayDropdownWithError()
      console.log('====================================')
      console.log("can't get location by gps")
      console.log('====================================')
    }
  }

  try {
    if (IPCoords === null) {
      const { Latitude, Longitude } = await services.getCoordsByIP()

      IPCoords = { lat: Latitude, lng: Longitude }
    }

    return IPCoords
  } catch (error) {
    DisplayDropdownWithError()
    console.log('====================================')
    console.log("can't get location by ip")
    console.log('====================================')
  }

  return Const.locationIfNoGPS
}
