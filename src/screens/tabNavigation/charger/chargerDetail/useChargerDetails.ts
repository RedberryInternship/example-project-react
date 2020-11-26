import React, {
  useEffect,
  useState,
  useRef,
} from 'react'
import { TextInput, BackHandler } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  NavigationEventPayload,
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from 'react-navigation'
import { selectUser, selectChargingProcess } from 'state/selectors'
import {
  NavigationActions,
  getLocaleText,
  Defaults,
  Const,
} from 'utils'
import { getAndRequestLocation } from 'helpers/location'
import {
  DisplayDropdownWithError,
  remoteLogger,
  easyAlert,
} from 'helpers/inform'
import services from 'services'
import { getCoordsAnyway } from 'utils/mapAndLocation/mapFunctions'
import { isPermissionDeniedRegex } from 'utils/mapAndLocation/permissionsRegex'
import {
  removeChargerFromFavorites,
  addChargerToFavorites,
} from 'state/actions/userActions'
import {
  HomeNavigateModes,
  LanguageType,
  Charger,
} from '../../../../../@types/allTypes.d'

export default (navigation: NavigationScreenProp<NavigationState, NavigationParams>) => {
  const state = useSelector(selectUser)
  const { chargingState } = useSelector(selectChargingProcess)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(true)
  const [activeChargerType, setActiveChargerType] = useState<number>(0)
  const [distance, setDistance] = useState('')

  const backHandlerRef = useRef<any>()

  const [charger, setCharger] = useState<(Charger & { from?: string }) | undefined>(
    navigation.getParam('chargerDetails', undefined))

  const chargeWitchCode: React.RefObject<TextInput> = useRef(null)
  const passwordRef: React.RefObject<TextInput> = useRef(null)

  const { t } = useTranslation()

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    const willBlur = navigation
      .addListener('willBlur', () => backHandlerRef.current && backHandlerRef.current.remove())
    backHandlerRef.current = BackHandler.addEventListener('hardwareBackPress', headerLeftPress)

    return (): void => {
      didFocus.remove()
      willBlur.remove()
      backHandlerRef.current && backHandlerRef.current.remove()
    }
  }, [])

  useEffect(() => {
    getDistance(charger?.lat ?? '0', charger?.lng ?? '0')
    setActiveChargerType(charger?.connector_types.length !== 1 ? -1 : 0)
  }, [charger])

  const onScreenFocus = (payload: NavigationEventPayload): void => {
    backHandlerRef.current = BackHandler.addEventListener('hardwareBackPress', headerLeftPress)
    const { params } = payload.state
    if (params?.chargerDetails !== undefined) {
      setCharger(params.chargerDetails)
    }
  }

  const showChargerLocationHandler = (): void => {
    navigation.navigate('Home', {
      mode: HomeNavigateModes.chargerLocateOnMap,
      lat: parseFloat(charger?.lat ?? '0'),
      lng: parseFloat(charger?.lng ?? '0'),
    })
  }

  const chargerLocationDirectionHandler = async (): Promise<void> => {
    if (
      (Defaults.locationPermissionStatus
        && isPermissionDeniedRegex(Defaults.locationPermissionStatus))
      || !Const.platformIOS
    ) {
      const status = await getAndRequestLocation()
      if (!status) return DisplayDropdownWithError('dropDownAlert.pleaseAllowLocation')
    }

    if (!Defaults.locationPermissionStatus.match(/denied|restricted|notDetermined/)) {
      navigation.navigate('Home', {
        mode: HomeNavigateModes.showRoutesToCharger,
        lat: parseFloat(charger?.lat ?? '0'),
        lng: parseFloat(charger?.lng ?? '0'),
      })
    }
  }

  const onFavoritePress = async (): Promise<void> => {
    if (!Defaults.token) return DisplayDropdownWithError('dropDownAlert.charging.needToLogIn')

    const newCharger = {
      ...charger,
      is_favorite: !charger?.is_favorite,
    } as Charger

    const updateCharger = (): void => {
      navigation.setParams({ chargerDetails: newCharger })
      setCharger(newCharger)
    }

    if (charger?.is_favorite === false) {
      dispatch(addChargerToFavorites(charger.id))
      updateCharger()
    } else if (charger?.is_favorite === true) {
      dispatch(removeChargerFromFavorites(charger.id))
      updateCharger()
    } else {
      DisplayDropdownWithError()
    }
  }

  const mainButtonClickHandler = (): void => {
    if (!Defaults.token) {
      easyAlert({
        text: 'dropDownAlert.charging.needToLogIn',
        leftText: 'authentication.authentication',
        onLeftClick: () => navigation.navigate('Auth'),
      })
      return
    } if (state.user?.user_cards.length === 0) {
      easyAlert({
        text: 'chargerDetail.pleaseAddCardFirst',
        leftText: 'settings.add',
        onLeftClick: () => navigation.navigate('CardAdd'),
      })
      return
    } if (chargingState.length > 1) {
      DisplayDropdownWithError(t('chargerDetail.maxAllowedCarCharing'))
      return
    } if (activeChargerType === -1) {
      DisplayDropdownWithError(t('chargerDetail.selectConnector'))
      return
    } if (
      chargingState.length > 0
      && charger
        ?.connector_types[activeChargerType]
        ?.pivot.id === chargingState[activeChargerType]?.charger_id
    ) {
      DisplayDropdownWithError(t('chargerDetail.chargerIsBusy'))
      return
    }
    navigation.navigate('ChooseChargeMethod', {
      connectorTypeId: charger?.connector_types[activeChargerType]?.pivot.id,
    })
  }

  const getDistance = async (lat: string, lng: string): Promise<any> => {
    try {
      const coords = await getCoordsAnyway()
      const result = await services.getDistance(coords.lat, coords.lng, lat, lng)
      if (result?.data.rows?.[0].elements?.[0].status !== 'ZERO_RESULTS') {
        setDistance(result?.data.rows?.[0].elements?.[0].distance.text)
      } else {
        setDistance('0')
        DisplayDropdownWithError('dropDownAlert.charging.noRouteFound')
      }
    } catch (error) {
      remoteLogger(error)
      DisplayDropdownWithError()
    }
  }

  const headerLeftPress = (): boolean => {
    if (charger?.from === 'Home') {
      NavigationActions.reset('ChargerStack', 'ChargerWithCode')
      navigation.navigate('Home')
    } else if (Defaults.token !== '') {
      navigation.goBack()
    } else {
      navigation.navigate('NotAuthorized')
    }
    return true
  }

  const onBusinessServiceClick = (title: LanguageType, description: LanguageType) => {
    Defaults.dropdown.alertWithType('info', t(getLocaleText(title)), t(getLocaleText(description)))
  }
  return {
    chargerLocationDirectionHandler,
    showChargerLocationHandler,
    mainButtonClickHandler,
    onBusinessServiceClick,
    setActiveChargerType,
    activeChargerType,
    headerLeftPress,
    onFavoritePress,
    chargeWitchCode,
    passwordRef,
    setLoading,
    distance,
    loading,
    charger,
    t,
  }
}
