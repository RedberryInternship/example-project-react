/* eslint-disable @typescript-eslint/camelcase */
import { useState, useRef, useContext, useEffect } from 'react'
import { TextInput, BackHandler, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'

import AppContext from 'hooks/contexts/app';
import ChargerContext from 'hooks/contexts/charger'
import {
  AppContextType,
  Charger,
  HomeNavigateModes,
  LanguageType,
} from '../../../../../@types/allTypes.d'
import {
  NavigationState,
  NavigationScreenProp,
  NavigationParams,
  NavigationEventPayload,
} from 'react-navigation'
import {
  Defaults,
  Helpers,
  NavigationActions,
  getLocaleText,
  Const,
} from 'utils'
import {
  deleteToFavorites,
  addToFavorites,
} from '../../../../hooks/actions/rootActions'
import services from 'services'
import {
  isPermissionDeniedRegex,
  getCoordsAnyway,
} from 'utils/mapAndLocation/mapFunctions'

export default (
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  const { state, dispatch }: AppContextType = useContext(AppContext)

  const {
    state: { chargingState },
    dispatch: chargerDispatch,
  } = useContext(ChargerContext)

  const [loading, setLoading] = useState<boolean>(true)
  const [activeChargerType, setActiveChargerType] = useState<number>(0)
  const [distance, setDistance] = useState('')

  const backHandlerRef = useRef<any>()

  const [charger, setCharger] = useState<
    (Charger & { from?: string }) | undefined
  >(navigation.getParam('chargerDetails', undefined))

  const chargeWitchCode: React.RefObject<TextInput> = useRef(null)
  const passwordRef: React.RefObject<TextInput> = useRef(null)

  const { t } = useTranslation()

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    const willBlur = navigation.addListener(
      'willBlur',
      () => backHandlerRef.current && backHandlerRef.current.remove(),
    )
    backHandlerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      headerLeftPress,
    )

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
    backHandlerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      headerLeftPress,
    )
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
      (Defaults.locationPermissionStatus &&
        isPermissionDeniedRegex(Defaults.locationPermissionStatus)) ||
      !Const.platformIOS
    ) {
      const status = await Helpers.getAndRequestLocation();
      if (!status) return Helpers.DisplayDropdownWithError('dropDownAlert.pleaseAllowLocation')
    }

    if (!Defaults.locationPermissionStatus.match(
      /denied|restricted|notDetermined/,
    )) {
      navigation.navigate('Home', {
        mode: HomeNavigateModes.showRoutesToCharger,
        lat: parseFloat(charger?.lat ?? '0'),
        lng: parseFloat(charger?.lng ?? '0'),
      })
    }
  }

  const onFavoritePress = (): void => {
    if (!Defaults.token)
      return Helpers.DisplayDropdownWithError(
        'dropDownAlert.charging.needToLogIn',
      )

    const newCharger = {
      ...charger,
      is_favorite: !charger?.is_favorite,
    } as Charger

    const updateCharger = (): void => {
      navigation.setParams({ chargerDetails: newCharger })
      setCharger(newCharger)
    }

    if (charger?.is_favorite === false) {
      addToFavorites(charger.id, dispatch, updateCharger)
    } else if (charger?.is_favorite === true) {
      deleteToFavorites(charger.id, dispatch, updateCharger)
    } else {
      Helpers.DisplayDropdownWithError()
    }
  }

  const mainButtonClickHandler = (): void => {
    if (!Defaults.token) {
      Helpers.easyAlert({
        text: 'dropDownAlert.charging.needToLogIn',
        leftText: 'authentication.authentication',
        onLeftClick: () => navigation.navigate('Auth'),
      })
      return
    } else if (state.user?.user_cards.length === 0) {
      Helpers.easyAlert({
        text: 'chargerDetail.pleaseAddCardFirst',
        leftText: 'settings.add',
        onLeftClick: () => navigation.navigate('CardAdd'),
      })
      return
    } else if (chargingState.length > 1) {
      Helpers.DisplayDropdownWithError(t('chargerDetail.maxAllowedCarCharing'))
      return
    } else if (activeChargerType === -1) {
      Helpers.DisplayDropdownWithError(t('chargerDetail.selectConnector'))
      return
    }else if (chargingState.length > 0 &&
      charger?.connector_types[activeChargerType]?.pivot.id === chargingState[activeChargerType]?.charger_id) {
      Helpers.DisplayDropdownWithError(t('chargerDetail.chargerIsBusy'))
      return
    }
    navigation.navigate('ChooseChargeMethod', {
      connectorTypeId: charger?.connector_types[activeChargerType]?.pivot.id,
    })
  }

  const getDistance = async (lat: string, lng: string): Promise<any> => {
    try {
      const coords = await getCoordsAnyway()
      const result = await services.getDistance(
        coords.lat,
        coords.lng,
        lat,
        lng,
      )
      if (result?.data.rows?.[0].elements?.[0].status !== 'ZERO_RESULTS')
        setDistance(result?.data.rows?.[0].elements?.[0].distance.text)
      else {
        setDistance('0')
        Helpers.DisplayDropdownWithError('dropDownAlert.charging.noRouteFound')
      }
    } catch (error) {
      Helpers.DisplayDropdownWithError()
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

  const onBusinessServiceClick = (
    title: LanguageType,
    description: LanguageType,
  ) => {
    Defaults.dropdown.alertWithType(
      'info',
      t(getLocaleText(title)),
      t(getLocaleText(description)),
    )
  }
  return {
    loading,
    setLoading,
    passwordRef,
    t,
    onFavoritePress,
    showChargerLocationHandler,
    chargerLocationDirectionHandler,
    chargeWitchCode,
    activeChargerType,
    setActiveChargerType,
    mainButtonClickHandler,
    charger,
    distance,
    headerLeftPress,
    onBusinessServiceClick,
  }
}
