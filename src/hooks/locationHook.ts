import {useEffect, useState, useRef, useContext, RefObject} from 'react'
import {regionFrom, Defaults, Const, Ajax} from 'utils'
import {locationConfig} from 'utils'
import polyline from '@mapbox/polyline'
import RNLocation, {
  Location,
  LocationPermissionStatus,
} from 'react-native-location'
import {HomeContext} from 'screens/tabNavigation/Home'
import {Coords, GoogleGetDirection} from 'allTypes'
import i18next from 'i18next'
import Axios from 'axios'
import {mergeCoords} from 'utils/mapAndLocation/mapFunctions'
import MapView from 'react-native-maps'
import {Alert, Platform} from 'react-native'
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box'
type ThisRef = {
  interval: number
  location: Location | null
  permissionStatus: LocationPermissionStatus | null
  GPSEnabled: boolean
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
    GPSEnabled: false,
  })

  useEffect(() => {
    try {
      RNLocation.getCurrentPermission().then(getPermissionStatus)
      RNLocation.getLatestLocation({timeout: 60000}).then(getLatestLocation)
    } catch (error) {}

    const subscribedPermissionUpdate = RNLocation.subscribeToPermissionUpdates(
      subscribePermissionUpdate,
    )

    return (): void => {
      subscribedPermissionUpdate()
      clearInterval(_this.current.interval)
      LocationServicesDialogBox.stopListener()
    }
  }, [])

  const subscribePermissionUpdate = (
    status: LocationPermissionStatus,
  ): void => {
    setPermissionStatus(status)
    _this.current.permissionStatus = status
    Defaults.locationPermissionStatus = status
    if (status.match(/notDetermined/)) {
      requestPermission()
    } else if (
      status.match(
        /authorizedAlways|authorizedWhenInUse|authorizedFine|authorizedCoarse/,
      )
    ) {
      if (Defaults.modal.current?.state?.config?.type === 5)
        Defaults.modal.current?.customUpdate(false)
    }
    console.log('====================================')
    console.log(status, ' LocationPermissionStatus')
    console.log('====================================')
  }

  const getLatestLocation = (_location: Location | null): void => {
    _this.current.location = _location // for testing on emulator comment out
    _location && navigateByRef(_location.latitude, _location.longitude)
  }

  const getPermissionStatus = (status: LocationPermissionStatus): void => {
    setPermissionStatus(status)
    _this.current.permissionStatus = status
    Defaults.locationPermissionStatus = status
    if (!status.match(/denied|restricted|notDetermined/)) {
      navigateToLocation()
    } else if (status.match(/notDetermined/)) {
      // requestPermission()
    }

    console.log('====================================')
    console.log(status, 'getPermissionStatus LocationPermissionStatus')
    console.log('====================================')
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
        const permission = await locationConfig.requestPermission()
        if (!permission) {
          getLocationViaIP()
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
    const status = await locationConfig.requestPermission()
    if (status) navigateToLocation()
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
