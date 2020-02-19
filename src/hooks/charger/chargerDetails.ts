/* eslint-disable no-unused-vars */
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
import {Ajax, Defaults} from 'utils'
import {MAP_API, MAP_URL, locationIfNoGPS} from 'utils/const'
import {mergeCoords} from 'utils/mapAndLocation/mapFunctions'
import Axios from 'axios'
import {getFavoriteChargers} from '../actions/rootActions'

type _This = {
  charger: Charger | undefined
}

const lastUsedDummy = [
  {
    address: 'ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ',
    code: '23423',
  },
  {
    address: 'ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ',
    code: '23423',
  },
  {
    address: 'ადფასდფას ადფ  ად ასდფასდ ას დფ ასდფ ასდფ ასდფ ასდ ',
    code: '23423',
  },
]
const chargerTypesDummy = [
  {type: 'ადფასდფას  ', power: '233'},
  {type: 'ადფასდფას  ', power: '233'},
  {type: 'ადფასდფას  ', power: '233'},
]

const services = [
  require('../../../assets/images/icons/arrow_left.png'),
  require('../../../assets/images/icons/arrow_left.png'),
]

export default (
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
): any => {
  const context: AppContextType = useContext(AppContext)
  const [loading, SetLoading] = useState<boolean>(true)
  const [activeChargerType, setActiveChargerType] = useState<number>(0)
  const [charger, setCharger] = useState<Charger | undefined>(
    navigation.getParam('chargerDetails', undefined),
  )

  const chargeWitchCode: React.RefObject<TextInput> = useRef(null)
  const passwordRef: React.RefObject<TextInput> = useRef(null)

  const {t, i18n} = useTranslation()

  const lastUsed = (): any => {
    //TODO: when we get service info
    // context.state
    // Ajax.get()

    return lastUsedDummy
  }

  const chargerTypes = (): any => {
    //TODO: no service
    // Ajax.get()

    return chargerTypesDummy
  }

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    return (): void => {
      didFocus.remove()
    }
  }, [])

  const onScreenFocus = (payload: NavigationEventPayload): void => {
    const {params} = payload.state

    navigation.setParams({chargerDetails: null})

    console.log('====================================')
    console.log(params, 'params, chargerDetails')
    console.log('====================================')
    if (params?.chargerDetails !== undefined) {
      setCharger(params?.chargerDetails)
    }
  }

  const showChargerLocationHandler = (): void => {
    navigation.navigate('Home', {
      mode: HomeNavigateModes.chargerLocateOnMap,
      lat: charger?.lat,
      lng: charger?.lng,
    })
  }

  const chargerLocationDirectionHandler = (): void => {
    navigation.navigate('Home', {
      mode: HomeNavigateModes.showRoutesToCharger,
      lat: charger?.lat,
      lng: charger?.lng,
    })
  }

  const onFavoritePress = () => {
    // Todo Vobi: use async/await
    charger &&
      // eslint-disable-next-line @typescript-eslint/camelcase
      Ajax.post('/add-favorite', {charger_id: charger?.charger_id})
        .then(() => {
          getFavoriteChargers(context.dispatch)
          Defaults.dropdown.alertWithType('success', 'დაემატა წარმატებით')
        })
        .catch(() => {
          Defaults.dropdown.alertWithType('error', 'დაფიქსიდა შეცდომა')
        })
  }

  const mainButtonClickHandler = () => {
    navigation.navigate('ChooseChargeMethod')
  }

  const getDistance = () => {
    return Axios.get(`${MAP_URL}/distancematrix/json?origins=${mergeCoords(
      locationIfNoGPS.lat,
      locationIfNoGPS.lng,
    )}
      &destinations=${mergeCoords(
        charger?.lat ?? locationIfNoGPS.lat,
        charger?.lng ?? locationIfNoGPS.lng,
      )}
      &mode=driving&units=metric&language=${i18n.language}&key=${MAP_API}`)
  }

  return {
    loading,
    SetLoading,
    passwordRef,
    t,
    getDistance,
    onFavoritePress,
    showChargerLocationHandler,
    chargerLocationDirectionHandler,
    chargeWitchCode,
    lastUsed,
    chargerTypes,
    activeChargerType,
    setActiveChargerType,
    services,
    mainButtonClickHandler,
    charger,
  }
}
