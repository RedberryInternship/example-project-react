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
import { remoteLogger } from 'helpers/inform'

const useFirebase = (): void => {
  const state = useSelector(selectUser)
  const { authStatus } = state

  const onTokenRefreshListener = useRef<any>()

  useEffect(() => {
    initialRun()
    return () => {
      onTokenRefreshListener.current()
    }
  }, [])

  const initialRun = useCallback(async () => {
    await requestUserPermission()

    onTokenRefreshListener.current = messaging().onTokenRefresh(tokenRefresh)
  }, [])

  // 2
  const requestUserPermission = useCallback(async () => {
    const FCMAuthStatus = await messaging().requestPermission()
    const enabled = FCMAuthStatus === messaging.AuthorizationStatus.AUTHORIZED
      || FCMAuthStatus === messaging.AuthorizationStatus.PROVISIONAL
    if (enabled) {
      getToken()
    }
  }, [getToken])

  const tokenRefresh = useCallback(
    async (newFCMToken: string): Promise<void> => {
      AsyncStorage.setItem('fcmToken', newFCMToken)
      authStatus === 'success' && services.setUserFirebaseToken(newFCMToken)
    },
    [services, AsyncStorage, authStatus],
  )

  // 3
  const getToken = useCallback(async (): Promise<void> => {
    let fcmToken: string | null = await AsyncStorage.getItem('fcmToken')

    if (!fcmToken) {
      try {
        fcmToken = await messaging().getToken()
      } catch (error) {
        // Vobi Done: log this error to sentry
        remoteLogger(error)
      }
      if (fcmToken) {
        AsyncStorage.setItem('fcmToken', fcmToken)
        authStatus === 'success' && services.setUserFirebaseToken(fcmToken)
      }
    }
  }, [services, AsyncStorage, authStatus])

  useEffect(() => {
    if (authStatus === 'success') {
      AsyncStorage.getItem('fcmToken').then((fcmToken: string | null) => {
        fcmToken && services.setUserFirebaseToken(fcmToken)
      })
    }
  }, [authStatus])
}

export default useFirebase
