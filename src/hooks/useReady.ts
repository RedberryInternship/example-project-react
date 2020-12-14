import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import Navigation from 'utils/navigation'

const globalAuth = null

/**
 * Upon configuration ending, go to home screen.
 */
const useAppReady = () => {
  const [auth, setAuth] = useState<null | string>(null)

  const { authStatus } = useSelector(selectUser)

  useEffect(() => {
    console.log(['auth-status', authStatus])
  }, [authStatus])

  useEffect(() => {
    Navigation.navigate('MainDrawer')
  }, [])
}

export default useAppReady
