import { useEffect, useRef, useContext } from 'react'
import Defaults from 'utils/defaults'
import { useAppState } from '@react-native-community/hooks'
import { getAllChargers } from 'hooks/actions/rootActions'
import { chargingState } from 'hooks/actions/chargerActions'
import AppContext from 'hooks/contexts/app'
import ChargersContext from 'hooks/contexts/charger'

const useAppLife = () => {
  const applicationContext = useContext(AppContext)
  const chargersContext = useContext(ChargersContext)

  const appState = applicationContext.state
  const appDispatch = applicationContext.dispatch
  const chargerDispatch = chargersContext.dispatch

  Defaults.modal = useRef(null)
  const currentAppState = useAppState()

  useEffect(() => {
    if (currentAppState === 'active') {
      if (Defaults.isForeground === false) {
        if (appState.authStatus === 'success') chargingState(chargerDispatch)
        getAllChargers(appDispatch)
      }
      Defaults.isForeground = true
    } else if (currentAppState.match(/inactive|background/)) {
      Defaults.isForeground = false
    }
  }, [currentAppState])

  return {
    currentAppState,
  }
}

export default useAppLife
