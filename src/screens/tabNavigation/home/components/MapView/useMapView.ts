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
  }, [navigateToLocation])

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
      if (
        charger.charger_group?.chargers
        && charger.charger_group?.chargers.length !== 0
      ) {
        const onChargerSelect = (index: number): void => {
          navigation.navigate('ChargerDetail', {
            chargerDetails: {
              ...charger.charger_group?.chargers?.[index],
              from: 'Home',
            },
          })
        }

        defaults.modal?.current?.customUpdate(true, {
          type: 4,
          data: {
            title: getLocaleText(charger.charger_group?.name as unknown as LocaleStringObject),
            address: getLocaleText(charger.location),
            chargers: charger.charger_group?.chargers ?? [],
            onChargerSelect,
          },
        })
      } else {
        navigation.navigate('ChargerDetail', {
          chargerDetails: { ...charger, from: 'Home' },
        })
      }
    },
    [navigation, defaults, getLocaleText],
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
