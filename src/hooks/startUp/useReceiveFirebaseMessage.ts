import { useEffect, useContext } from 'react'
import { ChargingState, ChargingStatus } from '../../../@types/allTypes.d'
import {
  chargingState,
  chargerStateController,
} from 'hooks/actions/chargerActions'
import messaging from '@react-native-firebase/messaging'
import { Defaults } from 'utils'
import { getAllChargers } from 'hooks/actions/rootActions'
import AppContext from 'hooks/contexts/app'
import ChargersContext from 'hooks/contexts/charger'

export default () => {
  const applicationContext = useContext(AppContext)
  const chargersContext = useContext(ChargersContext)

  const appState = applicationContext.state
  const appDispatch = applicationContext.dispatch
  const chargerState = chargersContext.state
  const chargerDispatch = chargersContext.dispatch

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const firebaseMSG = JSON.parse(remoteMessage.data?.data ?? '')

      console.log(['FirebaseMSG', firebaseMSG])

      const state = firebaseMSG as ChargingState[] | undefined

      if (state) {
        // Vobi Todo: use map instead
        state.every((val, index) => {
          if (
            val.charging_status !== ChargingStatus.INITIATED &&
            chargerState.chargingState[index]?.charging_status ===
              ChargingStatus.INITIATED &&
            val.charger_id === chargerState.chargingState[index]?.charger_id
          ) {
            getAllChargers(appDispatch)
            return false
          }
        })

        chargerStateController(state, chargerDispatch)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (appState.authStatus === 'success') {
      chargingState(chargerDispatch)
    } else {
      Defaults.modal?.current?.customUpdate(false)
    }
  }, [appState.authStatus])
}
