import { useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'

const useStatusBar = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true)
      StatusBar.setTranslucent(true)
    }
  }, [])
}

export default useStatusBar
