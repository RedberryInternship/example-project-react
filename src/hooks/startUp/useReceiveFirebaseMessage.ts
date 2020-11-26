import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  refreshChargingProcesses,
  updateChargingProcesses,
} from 'state/actions/chargingProcessActions'
import { selectUser, selectChargingProcess } from 'state/selectors'
import messaging from '@react-native-firebase/messaging'
import { Defaults } from 'utils'
import { refreshAllChargers } from 'state/actions/userActions'
import { ChargingStatus } from 'utils/enums'
import { ChargingState } from '../../../@types/allTypes.d'

export default () => {
  const userState = useSelector(selectUser)
  const dispatch = useDispatch()
  const chargingProcesses = useSelector(selectChargingProcess)

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const firebaseMSG = JSON.parse(remoteMessage.data?.data ?? '')

      console.log(['FirebaseMSG', firebaseMSG])

      const state = firebaseMSG as ChargingState[] | undefined

      if (state) {
        // Vobi Todo: use map instead
        state.every((val, index) => {
          if (
            val.charging_status !== ChargingStatus.INITIATED
            && chargingProcesses.chargingState[index]?.charging_status
            === ChargingStatus.INITIATED
            && val.charger_id === chargingProcesses.chargingState[index]?.charger_id
          ) {
            dispatch(refreshAllChargers())
            return false
          }
          return true
        })

        updateChargingProcesses(state)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (userState.authStatus === 'success') {
      dispatch(refreshChargingProcesses())
    } else {
      Defaults.modal?.current?.customUpdate(false)
    }
  }, [userState.authStatus])
}
