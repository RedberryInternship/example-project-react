import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  refreshChargingProcesses,
  updateChargingProcesses,
} from 'state/actions/chargingProcessActions'
import { selectUser } from 'state/selectors'
import messaging from '@react-native-firebase/messaging'
import defaults from 'utils/defaults'
import { ChargingState } from 'types'

/**
 * Take care of firebase messages upon
 * charging process.
 */
const useReceiveFirebaseMessage = () => {
  const { authStatus } = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const firebaseMSG = JSON.parse(remoteMessage.data?.data ?? '')

      console.groupCollapsed('FirebaseMSG')
      console.info(firebaseMSG)
      console.groupEnd()

      const state = firebaseMSG as ChargingState[] | undefined
      state && dispatch(updateChargingProcesses(state))
    })

    return () => unsubscribe()
  }, [dispatch])

  useEffect(() => {
    if (authStatus === 'success') {
      dispatch(refreshChargingProcesses())
    } else {
      defaults.modal?.current?.customUpdate(false)
    }
  }, [authStatus, dispatch])
}

export default useReceiveFirebaseMessage
