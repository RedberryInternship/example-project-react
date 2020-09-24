import { useReducer, useEffect } from 'react'
import {
  AppState,
  ChargingState,
  ChargingStatus,
} from '../../@types/allTypes.d'
import chargerReducer, {
  chargerInitialState,
} from 'hooks/reducers/chargerReducer'
import { chargingState, chargerStateController } from './actions/chargerActions'
import messaging from '@react-native-firebase/messaging'
import { Defaults } from 'utils'
import { getAllChargers } from './actions/rootActions'

export default (state: AppState, dispatch: any) => {
  const [charger, dispatchCharger] = useReducer(
    chargerReducer,
    chargerInitialState,
  )

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      
      const firebaseMSG = JSON.parse(remoteMessage.data?.data);
      
      console.log([ 'FirebaseMSG', firebaseMSG ])     
      
      const state = firebaseMSG as | ChargingState[] | undefined

      if (state) {

        // Vobi Todo: use map instead
        state.every((val, index) => {
          if (
            val.charging_status !== ChargingStatus.INITIATED &&
            charger.chargingState[index]?.charging_status ===
              ChargingStatus.INITIATED &&
            val.charger_id === charger.chargingState[index]?.charger_id
          ) {
            getAllChargers(dispatch)
            return false
          }
        })

        chargerStateController(state, dispatchCharger)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (state.authStatus === 'success') {
      chargingState(dispatchCharger)
    } else {
      Defaults.modal?.current?.customUpdate(false)
    }
  }, [state.authStatus])

  return { charger, dispatchCharger }
}
