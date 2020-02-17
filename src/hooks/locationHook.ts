import {useEffect, useState, useRef, useContext} from 'react'
import {regionFrom, Defaults, Const} from 'utils'
import Config from '../../src/utils/mapAndLocation/location'

import RNLocation, {
  Location,
  LocationPermissionStatus,
} from 'react-native-location'
import {HomeContext} from 'screens/tabNavigation/home'
import {setLocationHandler} from 'hooks/actions/homeActions'
import {Coords} from 'allTypes'
import i18n from 'i18next'
import Axios from 'axios'
import {mergeCoords} from 'utils/mapAndLocation/mapFunctions'

type ThisRef = {
  interval: number
  location: Location | null
}
const ZOOM_LEVEL = 400

const useLocation = ({mapRef}: any) => {
  const context: any = useContext(HomeContext)

  const [
    permissionStatus,
    setPermissionStatus,
  ] = useState<LocationPermissionStatus | null>(null)

  const _this = useRef<ThisRef>({interval: 0, location: null})

  useEffect(() => {
    RNLocation.getLatestLocation({timeout: 60000}).then(getLatestLocation)

    RNLocation.getCurrentPermission().then(getPermissionStatus)

    context.dispatch(setLocationHandler(navigateToLocation.bind(useLocation)))

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

  const subscribeToLocationStatus = (_location: Location[]): void => {
    _this.current.location = _location[0]
    //   setLocation(ref.current.location);
    //   mapRef.current.fitToCoordinates(newProps.data.polyline, {
    //     edgePadding: {
    //         top: 20,
    //         right: 20,
    //         bottom: 100,
    //         left: 20
    //     }, animated: true
    // })
  } // Todo Vobi: remove this function if it is not use and delete commented code

  const subscribePermissionUpdate = (
    status: LocationPermissionStatus,
  ): void => {
    setPermissionStatus(status)
    console.log(status, 'LocationPermissionStatus')
    if (!status.match(/ denied | restricted | notDetermined /)) {
      navigateToLocation()
    }
  }

  const getLatestLocation = (_location: Location | null): void => {
    _this.current.location = _location
    _location && navigateByRef(_location.latitude, _location.longitude)
  }

  const getPermissionStatus = (status: LocationPermissionStatus): void => {
    setPermissionStatus(status)
    if (!status.match(/ denied | restricted | notDetermined /)) {
      navigateToLocation()
    } else if (status.match(/ notDetermined /)) {
      Config.requestPermission.then(granted => {
        if (granted) navigateToLocation()
      })
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
          i18n.t('dropDownAlert.generalError'),
        )
      }
    }
  }

  const navigateByRef = (lat: number, lng: number): void => {
    mapRef.current &&
      mapRef.current.animateToRegion(regionFrom(lat, lng, ZOOM_LEVEL), 400)
  }

  const showRoute = async (
    finishLat: number,
    finishLng: number,
  ): Promise<void> => {
    const res = await Axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${mergeCoords(
        _this.current.location?.latitude ?? Const.locationIfNoGPS.lat,
        _this.current.location?.longitude ?? Const.locationIfNoGPS.lng,
      )}&destination=${mergeCoords(finishLat, finishLng)}&mode=driving&key=${
        Const.MAP_API
      }`,
    )
  }

  return {
    _this,
    permissionStatus,
    context,
    navigateToLocation,
    showRoute,
  }
}

export default useLocation
