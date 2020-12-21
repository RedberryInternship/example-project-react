import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNetInfo } from '@react-native-community/netinfo'
import { readTokenFromStorageAndUpdateState } from 'state/actions/userActions'
import defaults from 'utils/defaults'
import { DisplayDropdownWithError } from 'utils/inform'

const troubleshootNetwork = () => {
  const dispatch = useDispatch()
  const networkState = useNetInfo()

  useEffect(() => {
    if (networkState.isConnected) {
      if (defaults.internetConnected === false) {
        dispatch(readTokenFromStorageAndUpdateState())
      }

      defaults.internetConnected = true
    } else if (!networkState.isConnected && defaults.internetConnected !== null) {
      DisplayDropdownWithError(
        'dropDownAlert.error',
        'dropDownAlert.needInternetConnection',
      )

      defaults.internetConnected = false
    }
  }, [networkState])
}

export default troubleshootNetwork
