import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNetInfo } from '@react-native-community/netinfo'
import { readTokenFromStorageAndUpdateState } from 'state/actions/userActions'
import defaults from 'utils/defaults'
import { DisplayDropdownWithWarning } from 'utils/inform'

const useTroubleshootNetwork = () => {
  const dispatch = useDispatch()
  const networkState = useNetInfo()

  useEffect(() => {
    if (networkState.isConnected) {
      if (defaults.internetConnected === false) {
        dispatch(readTokenFromStorageAndUpdateState())
      }

      defaults.internetConnected = true
    } else if (!networkState.isConnected && defaults.internetConnected !== null) {
      DisplayDropdownWithWarning('dropDownAlert.needInternetConnection')
      defaults.internetConnected = false
    }
  }, [networkState, dispatch])
}

export default useTroubleshootNetwork
