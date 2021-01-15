import {
  useImperativeHandle,
  useCallback,
  useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'state/selectors'
import { Charger, LocaleStringObject } from 'types'
import { refreshAllChargers } from 'state/actions/userActions'
import { getLocaleText } from 'utils'
import defaults from 'utils/defaults'
import useLocation from './useLocation'
import { UseMapView } from './types'

const useMapView = (
  {
    ref,
    mapRef,
    navigation,
  }: UseMapView,
) => {
  const state = useSelector(selectUser)
  const dispatch = useDispatch()
  const [polyline, setPolyline] = useState([])
  const {
    navigateToLocation,
    navigateByRef,
    showRoute,
  } = useLocation({
    mapRef,
    setPolyline,
  })

  /**
   * Navigate to location and refresh all chargers.
   */
  const mapReady = useCallback((): void => {
    navigateToLocation()
    dispatch(refreshAllChargers())
  }, [navigateToLocation, dispatch])

  /**
   * Bind navigation methods to map ref.
   */
  useImperativeHandle(ref, (): any => ({
    animateToCoords: navigateByRef,
    locate: navigateToLocation,
    showRoute,
  }))

  /**
   * Go to charger details page on marker press.
   */
  const onMarkerPress = useCallback(
    (charger: Charger): void => {
      navigation.navigate('ChargerDetail', {
        chargerDetails: charger,
      })
    },
    [navigation],
  )
  return {
    onMarkerPress,
    polyline,
    mapReady,
    dispatch,
    mapRef,
    state,
  }
}

export default useMapView
