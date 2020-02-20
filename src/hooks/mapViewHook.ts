import {useContext, Ref, useImperativeHandle, RefObject, useState} from 'react'
import useLocation from './locationHook'
import {AppContextType} from 'allTypes'
import {getAllChargers} from 'hooks/actions/rootActions'
import {AppContext} from '../../App'
import MapView from 'react-native-maps'

const useMap = (ref: Ref<MapView>, mapRef: RefObject<MapView>): any => {
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
  return {
    location,
    mapReady,
    state,
    dispatch,
    mapRef,
    polyline,
  }
}

export default useMap
