import {
  useImperativeHandle,
  useCallback,
  RefObject,
  useState,
  Ref,
} from 'react'
import MapView from 'react-native-maps'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'state/selectors'
import { Charger } from 'allTypes'
import { getAllChargers, refreshAllChargers } from 'state/actions/userActions'
import {
  NavigationParams,
  NavigationState,
  NavigationScreenProp,
} from 'react-navigation'
import { Defaults, getLocaleText } from 'utils'
import useLocation from './useLocation'

const useMapView = (
  ref: Ref<MapView>,
  mapRef: RefObject<MapView>,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  const state = useSelector(selectUser)
  const dispatch = useDispatch()
  const [polyline, setPolyline] = useState([])
  const { navigateToLocation, navigateByRef, showRoute } = useLocation({
    mapRef,
    setPolyline,
    dispatch,
  })

  // Vobi todo: why callback you don't need it
  const getChargerPins = useCallback(async (): Promise<void> => {
    dispatch(refreshAllChargers())
  }, [dispatch, getAllChargers])

  const mapReady = useCallback((): void => {
    navigateToLocation()
    getChargerPins()
  }, [getChargerPins, navigateToLocation])

  useImperativeHandle(ref, (): any => ({
    animateToCoords: navigateByRef,
    locate: navigateToLocation,
    showRoute,
  }))

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

        Defaults.modal.current?.customUpdate(true, {
          type: 4,
          data: {
            title: getLocaleText(charger.charger_group?.name),
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
    [navigation, Defaults, getLocaleText],
  )
  return {
    mapReady,
    state,
    dispatch,
    mapRef,
    polyline,
    onMarkerPress,
  }
}

export default useMapView
