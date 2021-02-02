import {
  useCallback,
  useEffect,
} from 'react'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import polyline from '@mapbox/polyline'
import RNLocation, {
  LocationPermissionStatus,
  Location,
} from 'react-native-location'
import {
  requestPermission as locationRequestPermission,
  isLocationNotDetermined,
  isPermissionGranted,
  isLocationEnabled,
} from 'utils/location'
import defaults from 'utils/defaults'
import * as Const from 'utils/const'

import services from 'services'
import { refreshAllChargers } from 'state/actions/userActions'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'utils/inform'
import { Coords } from 'types'
import { regionFrom, getCoordsAnyway } from 'utils/map'
import {
  UseLocationProps,
  LocationOptions,
} from './types'
import { LocationCoordinatesErrors } from './enums'

const ZOOM_LEVEL = 400

const locationOptions: LocationOptions = {
  interval: 0,
  location: null,
  permissionStatus: null,
  GPSEnabled: false,
}

const useLocation = ({ mapRef, setPolyline }: UseLocationProps) => {
  const dispatch = useDispatch()

  /**
   * Handle navigation by reference.
   */
  const navigateByRef = useCallback(
    (
      lat: number,
      lng: number,
      zoomLevel: number = ZOOM_LEVEL,
      duration = 400,
    ): void => {
      mapRef.current?.animateToRegion(regionFrom(lat, lng, zoomLevel), duration)
    },
    [mapRef],
  )

  const getLatestLocation = useCallback(
    async (location: Location | null): Promise<void> => {
      locationOptions.location = location // for testing on emulator comment out
      defaults.location = {
        lat: location?.latitude ?? Const.locationIfNoGPS.lat,
        lng: location?.longitude ?? Const.locationIfNoGPS.lng,
      }

      dispatch(refreshAllChargers())
      location && navigateByRef(location.latitude, location.longitude)
    },
    [dispatch, navigateByRef],
  )

  const navigateToLocation = useCallback(
    async (location: Coords = null): Promise<void> => {
      if (location) {
        navigateByRef(location.lat, location.lng)
      } else {
        try {
          if (!isPermissionGranted(defaults.locationPermission) || !Const.platformIOS) {
            const status = await locationRequestPermission()
            if (!status) {
              return
            }
          }

          const coords = await getCoordsAnyway()
          navigateByRef(coords.lat, coords.lng)
        } catch (error) {
          remoteLogger(error)
        }
      }
    },
    [navigateByRef],
  )

  const requestPermission = useCallback(async (): Promise<any> => {
    const status = await locationRequestPermission()
    if (status) navigateToLocation()
  }, [navigateToLocation])

  const subscribePermissionUpdate = useCallback(
    (status: LocationPermissionStatus): void => {
      defaults.locationPermission = status
      if (isLocationNotDetermined()) {
        requestPermission()
      } else if (isPermissionGranted(status)) {
        navigateToLocation()
        if (defaults.modal?.current?.state?.config?.type === 5) {
          defaults.modal.current?.customUpdate(false)
        }
      }
    },
    [
      navigateToLocation,
      requestPermission,
    ],
  )

  /**
   * Handle permission status.
   */
  const getPermissionStatus = useCallback(
    (status: LocationPermissionStatus): void => {
      locationOptions.permissionStatus = status
      defaults.locationPermission = status
      if (isLocationEnabled()) {
        navigateToLocation()
      } else {
        requestPermission()
      }
    },
    [navigateToLocation, requestPermission],
  )

  useEffect(() => {
    let subscribedPermissionUpdate: any = null;

    (async () => {
      /**
       * Retrieve and set permission status.
       */
      try {
        const retrievedPermission = await RNLocation.getCurrentPermission()
        getPermissionStatus(retrievedPermission)
      } catch (error) {
        remoteLogger(error)
      }

      if (Platform.OS === 'android') {
        await RNLocation.requestPermission({
          android: { detail: 'coarse' },
        })
        await RNLocation.checkPermission({
          android: { detail: 'coarse' },
        })
      }

      /**
       * Get and set current location.
       */
      const retrievedLocation = await RNLocation.getLatestLocation({ timeout: 6000 })
      getLatestLocation(retrievedLocation)

      subscribedPermissionUpdate = RNLocation
        .subscribeToPermissionUpdates(subscribePermissionUpdate)
    })()

    return (): void => {
      /**
       * Remove subscriptions at unmount.
       */
      subscribedPermissionUpdate && subscribedPermissionUpdate()
      clearInterval(locationOptions.interval)
    }
  }, [getPermissionStatus, getLatestLocation, subscribePermissionUpdate])

  /**
   * Show route handler.
   */
  const showRoute = useCallback(
    async (finishLat: number, finishLng: number, showRoute = true): Promise<void> => {
      if (!showRoute) {
        setPolyline([])
        return
      }

      try {
        /**
         * Get coordinates and also direction.
         */
        const coords = await getCoordsAnyway()
        const res = await services.getDirection(coords.lat, coords.lng, finishLat, finishLng)

        /**
         * Throw errors at invalid data.
         */
        if (res.data.status === LocationCoordinatesErrors.NoRouteFound) {
          const error = new Error()
          error.name = LocationCoordinatesErrors.NoRouteFound
          throw error
        }
        if (res.data.status !== LocationCoordinatesErrors.Ok) {
          const error = new Error()
          error.name = LocationCoordinatesErrors.NotOk

          throw error
        }

        /**
         * Configure routes.
         */
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

        /**
         * Handle errors.
         */
      } catch (error) {
        if (error === LocationCoordinatesErrors.NoRouteFound) {
          DisplayDropdownWithError('dropDownAlert.home.noRouteFound')
        }
        remoteLogger(error)
      }
    },
    [mapRef, setPolyline],
  )

  return {
    navigateToLocation,
    navigateByRef,
    showRoute,
  }
}

export default useLocation
