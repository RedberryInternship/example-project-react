import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'state/selectors'
import { useAppState } from '@react-native-community/hooks'
import { refreshAllChargers } from 'state/actions/userActions'
import { refreshChargingProcesses } from 'state/actions/chargingProcessActions'
import {
  setAppInBackground,
  setAppInForeground,
  isAppInBackground,
} from 'helpers/app'
import { UserState } from 'allTypes'

const useAppLife = () => {
  const userState: UserState = useSelector(selectUser)
  const dispatch = useDispatch()
  const currentAppState = useAppState()

  useEffect(() => {
    /**
     * Determine if application is in active state.
     */
    const isApplicationActive = () => currentAppState === 'active'

    /**
     * Determine if user is authenticated.
     */
    const isAuthenticated = () => userState.authStatus === 'success'

    /**
     * Determine if app is in background.
     */
    const determineIfAppWentToBackground = () => currentAppState.match(/inactive|background/)

    if (isApplicationActive()) {
      if (isAppInBackground()) {
        isAuthenticated() && dispatch(refreshChargingProcesses())
        dispatch(refreshAllChargers())
      }
      setAppInForeground()
    } else if (determineIfAppWentToBackground()) {
      setAppInBackground()
    }
  }, [currentAppState])

  return {
    currentAppState,
  }
}

export default useAppLife
