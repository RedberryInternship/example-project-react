import { useEffect } from 'react'
import Navigation from 'utils/navigation'

/**
 * Upon configuration ending, go to home screen.
 */
const useAppReady = () => {
  useEffect(() => {
    Navigation.navigate('MainDrawer')
  }, [])
}

export default useAppReady
