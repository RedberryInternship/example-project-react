import {useContext, Ref, useImperativeHandle, RefObject, useState} from 'react'
import useLocation from './locationHook'
import {AppContextType, Charger} from 'allTypes'
import {getAllChargers} from 'hooks/actions/rootActions'
import {AppContext} from '../../App'
import MapView from 'react-native-maps'
import {Alert} from 'react-native'

import {
  NavigationParams,
  NavigationState,
  NavigationScreenProp,
} from 'react-navigation'
import {Defaults, getLocaleText} from 'utils'

const useMap = (
  ref: Ref<MapView>,
  mapRef: RefObject<MapView>,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
): any => {
  const {state, dispatch}: AppContextType = useContext(AppContext)
  const [polyline, setPolyline] = useState([])
  const location = useLocation({mapRef, setPolyline})

  const mapReady = (): void => {
    location.navigateToLocation()
    getChargerPins()
  }

  const getChargerPins = (): void => {
    getAllChargers(dispatch)
  }
  useImperativeHandle(ref, (): any => ({
    animateToCoords: location.navigateByRef,
    locate: location.navigateToLocation,
    showRoute: location.showRoute,
  }))

  const onMarkerPress = (charger: Charger): void => {
    if (
      charger.charger_group?.chargers &&
      charger.charger_group?.chargers.length !== 0
    ) {
      const onChargerSelect = (index: number): void => {
        if (index === -1) {
          navigation.navigate('ChargerDetail', {chargerDetails: charger})
        } else {
          navigation.navigate('ChargerDetail', {
            chargerDetails: charger.charger_group?.chargers?.[index],
          })
        }
      }

      Defaults.modal.current?.customUpdate(true, {
        type: 4,
        data: {
          title: getLocaleText(charger.name),
          address: getLocaleText(charger.location),
          chargers: charger,
          onChargerSelect: onChargerSelect,
        },
      })
    } else {
      navigation.navigate('ChargerDetail', {chargerDetails: charger})
    }
  }
  return {
    location,
    mapReady,
    state,
    dispatch,
    mapRef,
    polyline,
    onMarkerPress,
  }
}

export default useMap
