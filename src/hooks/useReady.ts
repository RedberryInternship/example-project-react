import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import Navigation from 'utils/navigation'

/**
 * Upon configuration ending, go to home screen.
 */
const useAppReady = () => {
  const userData = useSelector(selectUser)
  // useEffect(() => {
  // console.log(['auth-status', authStatus])
  // }, [authStatus])

  useEffect(() => {
    Navigation.navigate('MainDrawer')
  }, [])
}

export default useAppReady
