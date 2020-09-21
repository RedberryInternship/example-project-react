import {
  useContext,
  Ref,
  useImperativeHandle,
  RefObject,
  useState,
  useCallback,
} from 'react'
import MapView from 'react-native-maps'

import { AppContextType, Charger } from 'allTypes'

import { getAllChargers } from 'hooks/actions/rootActions'
import AppContext from 'hooks/contexts/app'
import useLocation from './useLocation'

import {
  NavigationParams,
  NavigationState,
  NavigationScreenProp,
} from 'react-navigation'
import { Defaults, getLocaleText } from 'utils'

const useMapView = (
  ref: Ref<MapView>,
  mapRef: RefObject<MapView>,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  const { state, dispatch }: AppContextType = useContext(AppContext)
  const [polyline, setPolyline] = useState([])
  const { navigateToLocation, navigateByRef, showRoute } = useLocation({
    mapRef,
    setPolyline,
    dispatch,
  })

  const getChargerPins = useCallback((): void => {
    getAllChargers(dispatch)
  }, [dispatch, getAllChargers])

  const mapReady = useCallback((): void => {
    navigateToLocation()
    getChargerPins()
  }, [getChargerPins, navigateToLocation])

  useImperativeHandle(ref, (): any => ({
    animateToCoords: navigateByRef,
    locate: navigateToLocation,
    showRoute: showRoute,
  }))

  const onMarkerPress = useCallback(
    (charger: Charger): void => {
      if (
        charger.charger_group?.chargers &&
        charger.charger_group?.chargers.length !== 0
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
            onChargerSelect: onChargerSelect,
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
