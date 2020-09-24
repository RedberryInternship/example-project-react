import { useEffect, useRef, useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import services from 'services'
import { AppState } from 'allTypes'

// Vobi Todo: this is not util this is hook
const useFirebase = ({ authStatus }: AppState): void => {
  
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

  //2
  const requestUserPermission = useCallback(async () => {
    const FCMAuthStatus = await messaging().requestPermission()
    const enabled =
      FCMAuthStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      FCMAuthStatus === messaging.AuthorizationStatus.PROVISIONAL
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

  //3
  const getToken = useCallback(async (): Promise<void> => {
    let fcmToken: string | null = await AsyncStorage.getItem('fcmToken')

    if (!fcmToken) {
      try {
        fcmToken = await messaging().getToken()
      } catch (error) {
        // Vobi Todo: log this error to sentry
        console.log('error', 'on get token')
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
