/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-unused-vars */ // Vobi Todo: do not have unused vars
import {useState, useRef, useContext, useEffect} from 'react'
import {Alert, TextInput} from 'react-native'
import {useTranslation} from 'react-i18next'
import {AppContext} from '../../../App'
import {
  AppContextType,
  Charger,
  HomeNavigateModes,
} from '../../../@types/allTypes.d'
import {
  NavigationState,
  NavigationScreenProp,
  NavigationParams,
  NavigationEventPayload,
} from 'react-navigation'
import {Ajax, Defaults, locationConfig, Helpers} from 'utils'
import {MAP_API, MAP_URL, locationIfNoGPS} from 'utils/const'
import {mergeCoords} from 'utils/mapAndLocation/mapFunctions'
import Axios from 'axios'
import {deleteToFavorites, addToFavorites} from '../actions/rootActions'

type _This = {
  charger: Charger | undefined
}

const services = [
  require('../../../assets/images/icons/arrow_left.png'),
  require('../../../assets/images/icons/arrow_left.png'),
]

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

  const {t, i18n} = useTranslation()

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
      lat: charger?.lat,
      lng: charger?.lng,
    })
  }

  const chargerLocationDirectionHandler = async (): Promise<void> => {
    if (
      Defaults.locationPermissionStatus?.match(
        /denied|restricted|notDetermined/,
      ) // Vobi Todo: move this as helper
    ) {
      const status = await locationConfig.requestPermission()
      if (!status) {
        Defaults.dropdown?.alertWithType(
          'error',
          t('dropDownAlert.generalError'),
        )
        return
      }
    }
    navigation.navigate('Home', {
      mode: HomeNavigateModes.showRoutesToCharger,
      lat: charger?.lat,
      lng: charger?.lng,
    })
  }

  const onFavoritePress = (): void => {
    if (!Defaults.token)
      return Defaults.dropdown?.alertWithType(
        'error',
        t('dropDownAlert.charging.needToLogIn'),
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
      Helpers.DisplayGeneralError()
    }
  }

  const mainButtonClickHandler = (): void => {
    navigation.navigate('ChooseChargeMethod')
  }

  const getDistance = async (lat: number, lng: number): Promise<any> => {
    try {
      const result: any = await Axios.get(`${MAP_URL}/distancematrix/json?origins=${mergeCoords(
        locationIfNoGPS.lat,
        locationIfNoGPS.lng,
      )}
        &destinations=${mergeCoords(
          lat ?? locationIfNoGPS.lat,
          lng ?? locationIfNoGPS.lng,
        )}
        &mode=driving&units=metric&language=${i18n.language}&key=${MAP_API}`)

      if (result?.data.rows?.[0].elements?.[0].status !== 'ZERO_RESULTS')
        setDistance(result?.data.rows?.[0].elements?.[0].distance.value)
      else {
        setDistance('0')
        Defaults.dropdown?.alertWithType(
          'error',
          t('dropDownAlert.charging.noRouteFound'),
        )
      }
    } catch (error) {
      Helpers.DisplayGeneralError()
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
    services,
    mainButtonClickHandler,
    charger,
    distance,
  }
}
