import {useEffect, useState, useRef, useReducer} from 'react'
import {useAppState} from 'react-native-hooks'
import {useNetInfo} from '@react-native-community/netinfo'
import {useAsyncStorage} from '@react-native-community/async-storage'
import {Defaults, NavigationActions} from 'utils'
import {useTranslation} from 'react-i18next'
import rootReducer, {initialState} from './reducers/rootReducer'
import {rootAction} from './actions/rootActions'
import {StatusBar, Platform, Alert} from 'react-native'

export function useRoot() {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  const currentAppState = useAppState()
  const networkState = useNetInfo()
  const {t, i18n} = useTranslation()

  const [token, setToken] = useState<null | string>('')
  const [locale, setLocale] = useState<null | string>('')

  const {getItem, setItem} = useAsyncStorage('token')
  const {getItem: getUserDetail, setItem: setUserDetail} = useAsyncStorage(
    'userDetail',
  )
  const {
    getItem: getLocaleStorage,
    setItem: setLocaleStorage,
  } = useAsyncStorage('locale')

  const [appReady, setAppReady] = useState(false)
  const [navigationState, setNavigationState] = useState(false)

  const _this: any = useRef(null)

  Defaults.modal = useRef(null)

  useEffect(() => {
    // setItem("token");
    // AsyncStorage.clear()

    readUserToken()
    readUserLocale()
    // onReady()
    console.log('remounted', appReady, ' appReady')
    // Todo Vobi: remove all console.logs
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true)
      StatusBar.setTranslucent(true)
    }
  }, [])

  useEffect(() => {
    if (currentAppState === 'active') {
      //call userState Update
    } else if (currentAppState.match(/inactive|background/)) {
      //do some background tasks
    }

    if (networkState.isConnected) {
      //call userState Update
    } else if (!networkState.isConnected) {
      //show alert
    }
    // Todo Vobi: What is the purpose of this listener delete unused code
  }, [currentAppState, networkState])

  const readUserToken = async () => {
    const _token = await getItem()
    let user: string | null = ''
    if (_token) {
      user = await getUserDetail()
      user = user != null ? JSON.parse(user) : ''
    }

    rootAction({token: _token, user}, dispatch)
    setToken(_token)
  }

  const readUserLocale = async () => {
    let _locale: 'en' | 'ka' | 'ru' | null = await getLocaleStorage()
    // Todo Vobi: javascript's variables shouldn't be named like this
    // Todo Vobi: It's an OOP syntax which tells developers that this method is private for class and should be called from outside
    // Todo Vobi: i don't understand why we implement this here

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
    console.log(
      'settingNavigationTopLevelElement',
      ref,
      NavigationActions()._navigator,
    )

    if (ref == null) return

    NavigationActions().setTopLevelNavigator(ref)
    setNavigationState(true)
    // if(__DEV__) userStatusHandler() // for development
  }

  useEffect(() => {
    // onReady()

    if (navigationState && locale !== '' && token != '') {
      setAppReady(true)
      userStatusHandler()
    } else setAppReady(false)
  }, [token, navigationState, locale])

  const onReady = () => {
    NavigationActions().navigate('MainDrawer')
    // NavigationActions().navigate('Auth')
    // NavigationActions().navigate("ForgotPassword")
    // NavigationActions().navigate("Registration")
    // NavigationActions().navigate('Settings')
    // NavigationActions().navigate("ProfileChange");
    // NavigationActions().navigate("ChargerWithCode");
    NavigationActions().navigate('ChargerDetail')
    // NavigationActions().navigate('NotAuthorized')
    // NavigationActions().navigate('ChoosingCard')
    // NavigationActions().navigate("ChooseChargeMethod");
    // NavigationActions().navigate("Charging");
    // NavigationActions().navigate('Favourites')
    // NavigationActions().navigate('Faq')
    // NavigationActions().navigate('Charging')
    // NavigationActions().navigate('Tariffs')
    // NavigationActions().navigate('Favorites')
    // NavigationActions().navigate('Contact')
    // NavigationActions().navigate('Notifications')
    // NavigationActions().navigate('Partners')
    // NavigationActions().navigate('TransactionList')

    console.log(Defaults.token, 'App ready to boot')
  }

  const userStatusHandler = () => {
    // if(!appReady ) return

    if (state.user == '') {
      onReady()
    } else if (state.user != null || state.user != '') {
      //ajax for user state
      onReady()
    }
  }
  return {
    currentAppState,
    networkState,
    token,
    setNavigationTopLevelElement,
    appReady,
    locale,
    t,
    _this,
    state,
    dispatch,
  }
}
