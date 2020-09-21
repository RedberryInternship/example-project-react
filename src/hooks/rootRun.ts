import { useEffect, useState, useRef, useReducer, useCallback } from 'react'
import { StatusBar, Platform, StatusBarStyle } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import { useAppState } from '@react-native-community/hooks'
import { useAsyncStorage } from '@react-native-community/async-storage'
import { useTranslation } from 'react-i18next'

import rootReducer, { initialState } from './reducers/rootReducer'
import { rootAction, getAllChargers } from './actions/rootActions'
import {
  Defaults,
  NavigationActions,
  determineTimePeriod,
  useFirebase,
  Helpers,
} from 'utils'
import useCharger from './useCharger'
import { chargingState } from './actions/chargerActions'
import { UserMeResponseType } from 'allTypes'

export default () => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  useFirebase(state)

  const { charger, dispatchCharger } = useCharger(state, dispatch)
  const currentAppState = useAppState()
  const networkState = useNetInfo()
  const { t, i18n } = useTranslation()
  const [token, setToken] = useState<null | string>('')
  const [locale, setLocale] = useState<null | string>('')
  const { getItem, setItem } = useAsyncStorage('token')
  const { getItem: getUserDetail, setItem: setUserDetail } = useAsyncStorage('userDetail')
  const {
    getItem: getLocaleStorage,
    setItem: setLocaleStorage,
  } = useAsyncStorage('locale')
  const [appReady, setAppReady] = useState(false)
  const [navigationState, setNavigationState] = useState(false)

  Defaults.modal = useRef(null)

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

  useEffect(() => {
    if (currentAppState === 'active') {
      if (Defaults.isForeground === false) {
        if (state.authStatus === 'success') chargingState(dispatchCharger)
        getAllChargers(dispatch)
      }
      Defaults.isForeground = true
    } else if (currentAppState.match(/inactive|background/)) {
      Defaults.isForeground = false
    }
  }, [currentAppState])

  useEffect(() => {
    if (networkState.isConnected) {
      if (Defaults.internetConnected === false) {
        readUserToken()
      }

      Defaults.internetConnected = true
    } else if (
      !networkState.isConnected &&
      Defaults.internetConnected !== null
    ) {
      Helpers.DisplayDropdownWithError(
        'dropDownAlert.error',
        'dropDownAlert.needInternetConnection',
      )
      Defaults.internetConnected = false
    }
  }, [networkState])

  const readUserToken = async (): Promise<void> => {
    const _token = await getItem()
    let user: UserMeResponseType | null = null
    if (_token) {
      const _user = await getUserDetail()
      user = _user != null ? JSON.parse(_user) : ''
    }

    rootAction({ token: _token ?? '', user }, dispatch)
    setToken(_token)
  }

  const readUserLocale = async (): Promise<void> => {
    let _locale: 'en' | 'ka' | 'ru' | null = await getLocaleStorage()
    if (_locale === null) {
      _locale = 'ka'
      setLocaleStorage('ka')
    } else {
      i18n.changeLanguage(_locale)
    }

    Defaults.locale = _locale
    setLocale(_locale)
  }

  const setNavigationTopLevelElement = (ref: any): void => {
    if (ref == null) return
    NavigationActions.setTopLevelNavigator(ref)
    setNavigationState(true)
  }

  useEffect(() => {
    if (navigationState && locale !== '' && token != '') {
      setAppReady(true)
      onReady()
    } else setAppReady(false)
  }, [token, navigationState, locale])

  const onReady = (): void => {
    NavigationActions.navigate('MainDrawer')
  }

  const dropDownInactiveBarColor = useCallback((): StatusBarStyle => {
    if (Defaults.activeRoute !== 'Home') {
      return 'light-content'
    } else {
      return determineTimePeriod() ? 'dark-content' : 'light-content'
    }
  }, [determineTimePeriod, Defaults])
  return {
    currentAppState,
    networkState,
    token,
    setNavigationTopLevelElement,
    appReady,
    locale,
    t,
    state,
    dispatch,
    dropDownInactiveBarColor,
    charger,
    dispatchCharger,
  }
}
