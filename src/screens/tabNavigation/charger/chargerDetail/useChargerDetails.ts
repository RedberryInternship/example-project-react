/* eslint-disable @typescript-eslint/camelcase */
import {useState, useRef, useContext, useEffect} from 'react'
import {TextInput} from 'react-native'
import {useTranslation} from 'react-i18next'

import {AppContext} from '../../../../../App'
import {
  AppContextType,
  Charger,
  HomeNavigateModes,
} from '../../../../../@types/allTypes.d'
import {
  NavigationState,
  NavigationScreenProp,
  NavigationParams,
  NavigationEventPayload,
} from 'react-navigation'
import {Defaults, locationConfig, Helpers} from 'utils'
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

const dummyServices = [images.arrowLeft, images.arrowLeft]

export default (
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  const context: AppContextType = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [activeChargerType, setActiveChargerType] = useState<number>(0)
  const [distance, setDistance] = useState('')

  const [charger, setCharger] = useState<Charger | undefined>(
    navigation.getParam('chargerDetails', undefined),
  )

  const chargeWitchCode: React.RefObject<TextInput> = useRef(null)
  const passwordRef: React.RefObject<TextInput> = useRef(null)

  const {t} = useTranslation()

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    return (): void => {
      didFocus.remove()
    }
  }, [])

  const onScreenFocus = (payload: NavigationEventPayload): void => {
    const {params} = payload.state

    // navigation.setParams({chargerDetails: null})
    if (params?.chargerDetails !== undefined) {
      setCharger(params.chargerDetails)
      getDistance(params.chargerDetails?.lat, params.chargerDetails?.lng)
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
      addToFavorites(charger.id, context.dispatch, updateCharger)
    } else if (charger?.is_favorite === true) {
      deleteToFavorites(charger.id, context.dispatch, updateCharger)
    } else {
      Helpers.DisplayDropdownWithError()
    }
  }

  const mainButtonClickHandler = (): void => {
    navigation.navigate('ChooseChargeMethod', {
      connectorTypeId: charger?.connector_types[activeChargerType]?.pivot.id,
    })
  }

  const getDistance = async (lat: number, lng: number): Promise<any> => {
    try {
      const coords = await getCoordsAnyway()
      const result = await services.getDistance(
        coords.lat,
        coords.lng,
        lat,
        lng,
      )
      if (result?.data.rows?.[0].elements?.[0].status !== 'ZERO_RESULTS')
        setDistance(
          (
            result?.data.rows?.[0].elements?.[0].distance.value / 100
          ).toString(),
        )
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
      navigation.navigate('Home')
    } else if (Defaults.token !== '') {
      navigation.goBack()
    } else {
      navigation.navigate('NotAuthorized')
    }
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
    dummyServices,
    mainButtonClickHandler,
    charger,
    distance,
    headerLeftPress,
  }
}
