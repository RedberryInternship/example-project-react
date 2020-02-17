import {useContext, Ref, useImperativeHandle, RefObject, useRef} from 'react'
import useLocation from './locationHook'
import {AppContextType, Location} from 'allTypes'
import {getAllChargers} from 'hooks/actions/rootActions'
import {AppContext} from '../../App'
import MapView from 'react-native-maps'

const useMap = (ref: Ref<MapView>): any => {
  const {state, dispatch}: AppContextType = useContext(AppContext)
  const mapRef: RefObject<MapView> = useRef(null)

  const location = useLocation({mapRef})

  const mapReady = (): void => {
    location.navigateToLocation()
    getChargerPins()
  }

  const getChargerPins = (): void => {
    getAllChargers(dispatch)
  }

  useImperativeHandle(ref, (): any => ({
    ...mapRef.current,
    locate: location.navigateToLocation,
    showRoute: location.showRoute,
  }))

  return {
    location,
    mapReady,
    state,
    dispatch,
    mapRef,
  }
}

export default useMap
