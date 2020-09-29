import { useEffect } from 'react'
import { useNetInfo } from '@react-native-community/netinfo'
import Defaults from 'utils/defaults'
import Helpers from 'utils/helpers'

const troubleshootNetwork = (readUserToken: () => Promise<void>) => {
  const networkState = useNetInfo()
  useEffect(() => {
    if (networkState.isConnected) {
      if (Defaults.internetConnected === false) {
        readUserToken()
      }

      Defaults.internetConnected = true
    } else if (
      !networkState.isConnected &&
      Defaults.internetConnected !== null
    ) {
      Helpers.DisplayDropdownWithError(
        'dropDownAlert.error',
        'dropDownAlert.needInternetConnection',
      )
      Defaults.internetConnected = false
    }
  }, [networkState])

  return networkState
}

export default troubleshootNetwork
