import {useEffect, useContext} from 'react'
import {Defaults, NavigationActions, Ajax} from 'utils'

import RNLocation, {Location} from 'react-native-location'
import useLocation from './locationHook'
import {MapView} from 'react-native-maps'
import {Chargers, AppContextType} from 'allTypes'
import {getAllChargers} from 'hooks/actions/rootActions'
import {AppContext} from '../../App'
import {Alert, StatusBar} from 'react-native'

export default function useMap(mapRef) {
  const {state, dispatch}: AppContextType = useContext(AppContext)

  // const mapRef : RefObject<MapView> = useRef(null);

  const location = useLocation({mapRef})

  useEffect(() => {
    return () => {
      StatusBar.setBarStyle('light-content')
    }
  }, [])

  const mapReady = () => {
    location.locate()
    getChargerPins()
  }

  const getChargerPins = () => {
    getAllChargers(dispatch)
  }

  useEffect(() => {
    console.log('====================================')
    console.log(state, 'context.state')
    console.log('====================================')
  }, [state])

  return {
    location,
    mapReady,
    state,
    dispatch,
  }
}
