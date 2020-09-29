import { useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'
import Defaults from 'utils/defaults'

type StatusBarHook = {
  readUserToken: () => void
  readUserLocale: () => void
}

const useStatusBar = ({ readUserToken, readUserLocale }: StatusBarHook) => {
  useEffect(() => {
    readUserToken()
    readUserLocale()
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true)
      StatusBar.setTranslucent(true)
    }
    return () => {
      Defaults.isForeground = null
      Defaults.internetConnected = null
    }
  }, [])
}

export default useStatusBar
