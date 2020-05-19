/* eslint-disable @typescript-eslint/camelcase */
import {useState, useRef, useContext, useEffect} from 'react'
import {TextInput, Alert} from 'react-native'
import {useTranslation} from 'react-i18next'

import {AppContext} from '../../../../../App'
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
  StackActions,
} from 'react-navigation'
import {
  Defaults,
  locationConfig,
  Helpers,
  NavigationActions,
  getLocaleText,
} from 'utils'
import {
  deleteToFavorites,
  addToFavorites,
} from '../../../../hooks/actions/rootActions'
import images from 'assets/images'
import services from 'services'
import {
  isPermissionDeniedRegex,
  getCoordsAnyway,
} from 'utils/mapAndLocation/mapFunctions'

export default (
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  const {state, dispatch}: AppContextType = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [activeChargerType, setActiveChargerType] = useState<number>(0)
  const [distance, setDistance] = useState('')

  const [charger, setCharger] = useState<
    (Charger & {from?: string}) | undefined
  >(navigation.getParam('chargerDetails', undefined))

  const chargeWitchCode: React.RefObject<TextInput> = useRef(null)
  const passwordRef: React.RefObject<TextInput> = useRef(null)

  const {t} = useTranslation()

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    return (): void => {
      didFocus.remove()
    }
  }, [])

  useEffect(() => {
    getDistance(charger?.lat ?? '0', charger?.lng ?? '0')
  }, [charger])

  const onScreenFocus = (payload: NavigationEventPayload): void => {
    const {params} = payload.state
    console.log('====================================')
    console.log(params, 'chargerDetailScreen')
    console.log('====================================')
    // navigation.setParams({chargerDetails: null})
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
      Defaults.locationPermissionStatus &&
      isPermissionDeniedRegex(Defaults.locationPermissionStatus)
    ) {
      const status = await locationConfig.requestPermission()
      if (!status) return Helpers.DisplayDropdownWithError()
    }
    navigation.navigate('Home', {
      mode: HomeNavigateModes.showRoutesToCharger,
      lat: parseFloat(charger?.lat ?? '0'),
      lng: parseFloat(charger?.lng ?? '0'),
    })
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
      navigation.setParams({chargerDetails: newCharger})
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
    if (!Defaults.token)
      return Helpers.DisplayDropdownWithError(
        t('dropDownAlert.charging.needToLogIn'),
      )
    else if (Defaults.userDetail?.user_cards.length === 0) {
      return Helpers.DisplayDropdownWithError(
        t('chargerDetail.pleaseAddCardFirst'),
      )
    } else if (state.chargingState.length > 1) {
      return Helpers.DisplayDropdownWithError(
        t('chargerDetail.maxAllowedCarCharing'),
      )
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
  const headerLeftPress = (): void => {
    if (charger?.from === 'home') {
      NavigationActions.reset('ChargerStack', 'ChargerWithCode')
      navigation.navigate('Home')
    } else if (Defaults.token !== '') {
      navigation.goBack()
    } else {
      navigation.navigate('NotAuthorized')
    }
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
