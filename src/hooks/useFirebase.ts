import {
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import services from 'services'
import { remoteLogger } from 'utils/inform'

const useFirebase = (): void => {
  const { authStatus } = useSelector(selectUser)
  const onTokenRefreshListener = useRef<any>()

  /**
   * Retrieve firebase token from firebase or async storage.
   */
  const getToken = useCallback(async (): Promise<void> => {
    let fcmToken: string | null = await AsyncStorage.getItem('fcmToken')

    if (!fcmToken) {
      try {
        fcmToken = await messaging().getToken()
      } catch (error) {
        remoteLogger(error)
      }
      if (fcmToken) {
        AsyncStorage.setItem('fcmToken', fcmToken)
        authStatus === 'success' && services.setUserFirebaseToken(fcmToken)
      }
    }
  }, [authStatus])

  /**
   * Upon having firebase permission get token.
   */
  const requestUserPermission = useCallback(async () => {
    const FCMAuthStatus = await messaging().requestPermission()

    const isAuthorized = FCMAuthStatus === messaging.AuthorizationStatus.AUTHORIZED
    const isProvisional = FCMAuthStatus === messaging.AuthorizationStatus.PROVISIONAL
    const enabled = isAuthorized || isProvisional
    enabled && getToken()
  }, [getToken])

  /**
   * Set new token when it refreshes.
   */
  const tokenRefresh = useCallback(
    async (newFCMToken: string): Promise<void> => {
      AsyncStorage.setItem('fcmToken', newFCMToken)

      if (authStatus === 'success') {
        services.setUserFirebaseToken(newFCMToken)
      }
    },
    [authStatus],
  )

  /**
   * On app start up refresh firebase connection.
   */
  const initialRun = useCallback(async () => {
    await requestUserPermission()

    onTokenRefreshListener.current = messaging().onTokenRefresh(tokenRefresh)
  }, [requestUserPermission, tokenRefresh])

  /**
   * Connect with firebase.
   */
  useEffect(() => {
    if (authStatus === 'success') {
      initialRun()
      return () => {
        onTokenRefreshListener.current()
      }
    }
  }, [initialRun, authStatus])

  /**
   * Upon authorization update user's firebase token.
   */
  useEffect(() => {
    (async () => {
      if (authStatus === 'success') {
        try {
          const fcmToken: string | null = await AsyncStorage.getItem('fcmToken')
          fcmToken && services.setUserFirebaseToken(fcmToken)
        } catch (error) {
          remoteLogger(error)
        }
      }
    })()
  }, [authStatus])
}

export default useFirebase
