import { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  chargingState,
  chargerStateController,
} from 'hooks/actions/chargerActions'
import { selectUser } from 'state/selectors'
import messaging from '@react-native-firebase/messaging'
import { Defaults } from 'utils'
import { refreshAllChargers } from 'state/actions/userActions'
import ChargersContext from 'hooks/contexts/charger'
import {
  ChargingState,
  ChargingStatus,
} from '../../../@types/allTypes.d'

export default () => {
  const chargersContext = useContext(ChargersContext)

  const userState = useSelector(selectUser)
  const userDispatch = useDispatch()
  const chargerState = chargersContext.state
  const chargerDispatch = chargersContext.dispatch

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const firebaseMSG = JSON.parse(remoteMessage.data?.data ?? '')

      console.log(['FirebaseMSG', firebaseMSG])

      const state = firebaseMSG as ChargingState[] | undefined

      if (state) {
        // Vobi Todo: use map instead
        state.every(async (val, index) => {
          if (
            val.charging_status !== ChargingStatus.INITIATED
            && chargerState.chargingState[index]?.charging_status
            === ChargingStatus.INITIATED
            && val.charger_id === chargerState.chargingState[index]?.charger_id
          ) {
            userDispatch(refreshAllChargers())
            return false
          }
        })

        chargerStateController(state, chargerDispatch)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (userState.authStatus === 'success') {
      chargingState(chargerDispatch)
    } else {
      Defaults.modal?.current?.customUpdate(false)
    }
  }, [userState.authStatus])
}
