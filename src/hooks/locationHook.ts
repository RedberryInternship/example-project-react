import {useEffect, useState, useRef, useContext, RefObject} from 'react'
import {regionFrom, Defaults, Const, Ajax} from 'utils'
import Config from '../../src/utils/mapAndLocation/location'
import polyline from '@mapbox/polyline'
import RNLocation, {
  Location,
  LocationPermissionStatus,
} from 'react-native-location'
import {HomeContext} from 'screens/tabNavigation/home'
import {Coords, GoogleGetDirection} from 'allTypes'
import i18next from 'i18next'
import Axios from 'axios'
import {mergeCoords} from 'utils/mapAndLocation/mapFunctions'
import MapView from 'react-native-maps'

type ThisRef = {
  interval: number
  location: Location | null
  permissionStatus: LocationPermissionStatus | null
}
const ZOOM_LEVEL = 400

type useLocationProps = {
  mapRef: RefObject<MapView>
  setPolyline: (data: any) => void
}
const useLocation = ({mapRef, setPolyline}: useLocationProps) => {
  const context: any = useContext(HomeContext)

  const [
    permissionStatus,
    setPermissionStatus,
  ] = useState<LocationPermissionStatus | null>(null)

  const _this = useRef<ThisRef>({
    interval: 0,
    location: null,
    permissionStatus: null,
  })

  useEffect(() => {
    RNLocation.getLatestLocation({timeout: 60000}).then(getLatestLocation)

    RNLocation.getCurrentPermission().then(getPermissionStatus)

    // let subscribedLocation = RNLocation.subscribeToLocationUpdates(subscribeToLocationStatus)
    const subscribedPermissionUpdate = RNLocation.subscribeToPermissionUpdates(
      subscribePermissionUpdate,
    )

    return (): void => {
      // subscribedLocation()
      subscribedPermissionUpdate()
      clearInterval(_this.current.interval)
    }
  }, [])

  const subscribePermissionUpdate = (
    status: LocationPermissionStatus,
  ): void => {
    setPermissionStatus(status)
    console.log(status, 'LocationPermissionStatus')
    if (!status.match(/denied|restricted|notDetermined/)) {
      navigateToLocation()
    }
  }

  const getLatestLocation = (_location: Location | null): void => {
    _this.current.location = _location // for testing on emulator comment out
    _location && navigateByRef(_location.latitude, _location.longitude)
  }

  const getPermissionStatus = (status: LocationPermissionStatus): void => {
    setPermissionStatus(status)
    _this.current.permissionStatus = status
    if (!status.match(/denied|restricted/)) {
      navigateToLocation()
      console.log('sdf', status)
    } else if (status.match(/notDetermined/)) {
      requestPermission()
    }
  }

  const navigateToLocation = async (
    _location: Coords = null,
  ): Promise<void> => {
    if (_location) navigateByRef(_location.lat, _location.lng)
    else if (_this.current.location != null) {
      navigateByRef(
        _this.current.location.latitude,
        _this.current.location.longitude,
      )
    } else {
      try {
        if (
          _this.current.permissionStatus?.match(
            /denied|restricted|notDetermined/,
          )
        ) {
          const permission = await Config.requestPermission
          if (!permission) getLocationViaIP()
          return
        }
        const latestLocation: Location | null = await RNLocation.getLatestLocation(
          {
            timeout: 6000,
          },
        )

        if (latestLocation != null) {
          navigateByRef(latestLocation.latitude, latestLocation.longitude)
        }
      } catch (error) {
        Defaults.dropdown.alertWithType(
          'error',
          i18next.t('dropDownAlert.generalError'),
        )
      }
    }
  }

  const requestPermission = async (): Promise<any> => {
    Config.requestPermission.then(granted => {
      if (granted) navigateToLocation()
    })
  }

  const navigateByRef = (
    lat: number,
    lng: number,
    zoomLevel: number = ZOOM_LEVEL,
    duration = 400,
  ): void => {
    mapRef.current?.animateToRegion(regionFrom(lat, lng, zoomLevel), duration)
  }

  const showRoute = async (
    finishLat: number,
    finishLng: number,
    showRoute = true,
  ): Promise<void> => {
    if (!showRoute) {
      setPolyline([])
      return
    }
    try {
      const res = await Axios.get<GoogleGetDirection>(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${mergeCoords(
          _this.current.location?.latitude ?? Const.locationIfNoGPS.lat,
          _this.current.location?.longitude ?? Const.locationIfNoGPS.lng,
        )}&destination=${mergeCoords(finishLat, finishLng)}&mode=driving&key=${
          Const.MAP_API
        }`,
      )

      if (res.data.status === 'ZERO_RESULTS') throw 'ZERO_RESULTS'
      if (res.data.status !== 'OK') throw 'ERROR'
      const array = polyline.decode(res.data.routes[0].overview_polyline.points)
      const coordsBetween = array.map(point => {
        return {
          latitude: point[0],
          longitude: point[1],
        }
      })

      setPolyline(coordsBetween)
      mapRef.current?.fitToCoordinates(coordsBetween, {
        edgePadding: {
          top: 20,
          right: 20,
          bottom: 80,
          left: 20,
        },
        animated: true,
      })
    } catch (error) {
      if (error === 'ERROR')
        Defaults.dropdown.alertWithType(
          'error',
          i18next.t('dropDownAlert.generalError'),
        )
      else if (error === 'ZERO_RESULTS')
        Defaults.dropdown.alertWithType(
          'error',
          i18next.t('dropDownAlert.home.noRouteFound'),
        )
    }
  }

  const getLocationViaIP = async (): Promise<string | undefined> => {
    try {
      const res = await Ajax.get('/geo-ip')
      navigateByRef(
        res?.Latitude ?? Const.locationIfNoGPS.lat,
        res?.Longitude ?? Const.locationIfNoGPS.lng,
        10000,
      )
    } catch (error) {
      Defaults.dropdown.alertWithType(
        'error',
        i18next.t('dropDownAlert.generalError'),
      )
      return
    }
  }

  return {
    _this,
    permissionStatus,
    context,
    navigateToLocation,
    showRoute,
    navigateByRef,
  }
}

export default useLocation
