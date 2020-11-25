import {
  useCallback,
  RefObject,
  useEffect,
  useState,
  useRef,
} from 'react'
import { Platform } from 'react-native'
import MapView from 'react-native-maps'
import { useDispatch } from 'react-redux'
import polyline from '@mapbox/polyline'
import { useTranslation } from 'react-i18next'
import RNLocation, { Location, LocationPermissionStatus } from 'react-native-location'

import { isPermissionGrantedRegex } from 'utils/mapAndLocation/permissionsRegex'
import { getCoordsAnyway } from 'utils/mapAndLocation/mapFunctions'
import {
  locationConfig,
  regionFrom,
  Defaults,
  Const,
} from 'utils'
import services from 'services'
import { refreshAllChargers } from 'state/actions/userActions'
import { remoteLogger, DisplayDropdownWithError } from 'helpers/inform'
import { Coords } from 'allTypes'

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
  dispatch: (data: any) => void
}

const useLocation = ({ mapRef, setPolyline, dispatch }: useLocationProps) => {
  const userDispatch = useDispatch()
  const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus | null>(null)
  const { t } = useTranslation()
  const _this = useRef<ThisRef>({
    interval: 0,
    location: null,
    permissionStatus: null,
    GPSEnabled: false,
  })

  const navigateByRef = useCallback(
    (lat: number, lng: number, zoomLevel: number = ZOOM_LEVEL, duration = 400): void => {
      mapRef.current?.animateToRegion(regionFrom(lat, lng, zoomLevel), duration)
    },
    [mapRef],
  )

  const getPermissionStatus = useCallback(
    (status: LocationPermissionStatus): void => {
      setPermissionStatus(status)
      _this.current.permissionStatus = status
      Defaults.locationPermissionStatus = status
      if (!status.match(/denied|restricted|notDetermined/)) {
        navigateToLocation()
      } else {
        requestPermission()
      }
    },
    [permissionStatus],
  )

  const getLatestLocation = useCallback(
    async (_location: Location | null): Promise<void> => {
      _this.current.location = _location // for testing on emulator comment out
      Defaults.location = {
        lat: _location?.latitude ?? 0,
        lng: _location?.longitude ?? 0,
      }

      userDispatch(refreshAllChargers())

      _location && navigateByRef(_location.latitude, _location.longitude)
    },
    [dispatch, navigateByRef],
  )

  const navigateToLocation = useCallback(
    async (location: Coords = null): Promise<void> => {
      if (location) navigateByRef(location.lat, location.lng)
      else {
        try {
          if (!isPermissionGrantedRegex(Defaults.locationPermissionStatus) || !Const.platformIOS) {
            const status = await locationConfig.requestPermission()
            if (!status) return
          }
          const coords = await getCoordsAnyway()

          navigateByRef(coords.lat, coords.lng)
        } catch (error) {
          remoteLogger(error)
          DisplayDropdownWithError()
        }
      }
    },
    [navigateByRef],
  )

  const requestPermission = useCallback(async (): Promise<any> => {
    const status = await locationConfig.requestPermission()
    if (status) navigateToLocation()
  }, [navigateToLocation])

  const subscribePermissionUpdate = useCallback(
    (status: LocationPermissionStatus): void => {
      setPermissionStatus(status)
      Defaults.locationPermissionStatus = status
      if (status.match(/notDetermined/)) {
        requestPermission()
      } else if (isPermissionGrantedRegex(status)) {
        navigateToLocation()
        if (Defaults.modal.current?.state?.config?.type === 5) {
          Defaults.modal.current?.customUpdate(false)
        }
      }
    },
    [
      isPermissionGrantedRegex,
      setPermissionStatus,
      navigateToLocation,
      requestPermission,
      permissionStatus,
      Defaults,
    ],
  )

  useEffect(() => {
    try {
      RNLocation.getCurrentPermission().then(getPermissionStatus)
    } catch (error) {
      remoteLogger(error)
    }

    let subscribedPermissionUpdate: any = null;
    (async () => {
      if (Platform.OS === 'android') {
        await RNLocation.requestPermission({
          android: { detail: 'coarse' },
        })
        await RNLocation.checkPermission({
          android: { detail: 'coarse' },
        })
      }
      RNLocation.getLatestLocation({ timeout: 6000 }).then(getLatestLocation)
      subscribedPermissionUpdate = RNLocation
        .subscribeToPermissionUpdates(subscribePermissionUpdate)
    })()

    return (): void => {
      subscribedPermissionUpdate && subscribedPermissionUpdate()
      clearInterval(_this.current.interval)
    }
  }, [getPermissionStatus, getLatestLocation, subscribePermissionUpdate])

  const showRoute = useCallback(
    async (finishLat: number, finishLng: number, showRoute = true): Promise<void> => {
      if (!showRoute) {
        setPolyline([])
        return
      }

      const coords = await getCoordsAnyway()
      try {
        const res = await services.getDirection(coords.lat, coords.lng, finishLat, finishLng)

        if (res.data.status === 'ZERO_RESULTS') throw 'ZERO_RESULTS'
        if (res.data.status !== 'OK') throw 'ERROR'
        const array = polyline.decode(res.data.routes[0].overview_polyline.points)
        const coordsBetween = array.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }))

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
        if (error === 'ERROR') DisplayDropdownWithError()
        else if (error === 'ZERO_RESULTS') {
          DisplayDropdownWithError('dropDownAlert.home.noRouteFound')
        }
        // Vobi Done: log error to sentry if none matches
        else remoteLogger(error)
      }
    },
    [mapRef, polyline],
  )

  return {
    _this,
    permissionStatus,
    navigateToLocation,
    showRoute,
    navigateByRef,
  }
}

export default useLocation
