import { useEffect } from 'react'
import NavigationActions from 'utils/navigation.service'

/**
 * Upon configuration ending, go to home screen.
 */
const useAppReady = () => {
  useEffect(() => {
    NavigationActions.navigate('MainDrawer')
  }, [])
}

export default useAppReady
