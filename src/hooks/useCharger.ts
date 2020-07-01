import {useRef, useReducer, useEffect} from 'react'
import {
  AppState,
  ChargerState,
  ChargingState,
  ChargingStatus,
} from '../../@types/allTypes.d'
import chargerReducer, {
  chargerInitialState,
} from 'hooks/reducers/chargerReducer'
import {chargingState, chargerStateController} from './actions/chargerActions'
import messaging from '@react-native-firebase/messaging'
import {Defaults, Helpers} from 'utils'
import {getAllChargers} from './actions/rootActions'

export default (state: AppState, dispatch: any) => {
  const [charger, dispatchCharger] = useReducer(
    chargerReducer,
    chargerInitialState,
  )
  // const timeInterval = useRef<any>()

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(JSON.stringify(remoteMessage, null, 2), 'remoteMessage')
      const state = remoteMessage.data as ChargingState[] | undefined
      if (state) {
        state.every((val, index) => {
          if (
            val.charging_status !== ChargingStatus.INITIATED &&
            charger.chargingState[index].charging_status ===
              ChargingStatus.INITIATED
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

  // useEffect(() => {
  //   if (charger.chargingState.length && state.authStatus === 'success') {
  //     timeInterval.current = setTimeout(() => {
  //       chargingState(dispatchCharger)
  //     }, 30000)
  //   }
  // }, [charger])

  return {charger, dispatchCharger}
}
