import {useEffect, useState, useRef, useContext} from 'react'
import {Defaults, NavigationActions, regionFrom} from 'utils'
import Config from '../../src/utils/mapAndLocation/location'

// eslint-disable-next-line no-unused-vars
import RNLocation, {
  Location,
  LocationPermissionStatus,
} from 'react-native-location'
import {HomeContext} from 'screens/tabNavigation/home'
import {setLocationHandler} from 'hooks/actions/homeActions'

type Ref = {
  interval: number
  location: Location | null | Location[]
}
const ZOOM_LEVEL: number = 400

export default function useLocation({mapRef}: any) {
  const context: any = useContext(HomeContext)

  const [location, setLocation] = useState<Location | null>(null)
  const [
    permissionStatus,
    setPermissionStatus,
  ] = useState<LocationPermissionStatus | null>(null)

  const ref = useRef<Ref>({interval: 0, location: null})

  useEffect(() => {
    RNLocation.getLatestLocation({timeout: 60000}).then(getLatestLocation)

    RNLocation.getCurrentPermission().then(getPermissionStatus)

    context.dispatch(setLocationHandler(locate.bind(useLocation)))

    // let subscribedLocation = RNLocation.subscribeToLocationUpdates(subscribeToLocationStatus)
    let subscribedPermissionUpdate = RNLocation.subscribeToPermissionUpdates(
      subscribePermissionUpdate,
    )

    return () => {
      // subscribedLocation()
      subscribedPermissionUpdate()
      clearInterval(ref.current.interval)
    }
  }, [])

  const subscribeToLocationStatus = (_location: Location[]) => {
    ref.current.location = _location
    //   setLocation(ref.current.location);
    //   mapRef.current.fitToCoordinates(newProps.data.polyline, {
    //     edgePadding: {
    //         top: 20,
    //         right: 20,
    //         bottom: 100,
    //         left: 20
    //     }, animated: true
    // })
  }

  const subscribePermissionUpdate = (status: LocationPermissionStatus) => {
    setPermissionStatus(status)
    console.log(status, 'LocationPermissionStatus')
    if (!status.match(/ denied | restricted | notDetermined /)) {
      navigateToLocation()
    }
  }

  const getLatestLocation = (_location: Location | null) => {
    setLocation(_location)
    _location && navigateByRef(_location)
  }

  const getPermissionStatus = (status: LocationPermissionStatus) => {
    setPermissionStatus(status)
    if (!status.match(/ denied | restricted | notDetermined /)) {
      navigateToLocation()
    } else if (status.match(/ notDetermined /)) {
      Config.requestPermission.then(granted => {
        if (granted) {
          navigateToLocation()
        }
      })
    }
  }

  const navigateToLocation = () => {
    if (location != null) {
      navigateByRef(location)
    } else {
      RNLocation.getLatestLocation({timeout: 6000}).then(latestLocation => {
        if (latestLocation != null) {
          navigateByRef(latestLocation)
        }
      })
    }
  }

  const navigateByRef = (location: Location) => {
    // return
    mapRef.current &&
      mapRef.current.animateToRegion(
        regionFrom(location.latitude, location.longitude, ZOOM_LEVEL),
        400,
      )
  }

  const locate = () => {
    navigateToLocation()
  }

  useEffect(() => {}, [location])

  return {ref, permissionStatus, location, context, locate}
}
