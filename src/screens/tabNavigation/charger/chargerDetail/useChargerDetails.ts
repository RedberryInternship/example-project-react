import {
  useEffect,
  useState,
  useRef,
} from 'react'
import { BackHandler } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { NavigationEventPayload } from 'react-navigation'
import { selectUser, selectChargingProcess } from 'state/selectors'
import {
  Navigation,
  getLocaleText,
} from 'utils'
import defaults from 'utils/defaults'

import {
  DisplayDropdownWithError,
  easyAlert,
} from 'utils/inform'
import {
  removeChargerFromFavorites,
  addChargerToFavorites,
} from 'state/actions/userActions'
import {
  Navigation as NavigationType,
  Charger as BaseCharger,
  HomeNavigateModes,
  LanguageType,
} from 'types'
import {
  askForLocationIfNotEnabled,
  isLocationEnabled,
  getDistance,
} from './helpers'
import { Charger } from './types'

export default (navigation: NavigationType) => {
  const state = useSelector(selectUser)
  const { chargingState } = useSelector(selectChargingProcess)
  const dispatch = useDispatch()

  const [activeChargerType, setActiveChargerType] = useState<number>(0)
  const [distance, setDistance] = useState('')

  // const backHandlerRef = useRef<any>()

  const [charger, setCharger] = useState<Charger>(
    navigation.getParam('chargerDetails', undefined),
  )

  const { t } = useTranslation()

  /**
   * Go back handler.
   */
  const goBackHandler = () => {
    const from = navigation.getParam('from')

    if (from === 'ChargerWithCode') {
      navigation.goBack()
    } else {
      Navigation.reset('ChargerStack', 'ChargerWithCode')
      navigation.navigate('Home')
    }
  }

  /**
   * On charger information change count distance
   * and set active charger type.
   */
  useEffect(() => {
    let shouldUpdate = true;
    (async () => {
      const calculatedDistance = await getDistance(charger?.lat ?? '0', charger?.lng ?? '0')
      if (shouldUpdate) {
        setDistance(calculatedDistance)
        setActiveChargerType(charger?.connector_types.length !== 1 ? -1 : 0)
      }
    })()

    return () => {
      shouldUpdate = false
    }
  }, [charger])

  /**
   * Show charger location on map.
   */
  const showChargerLocationHandler = (): void => {
    navigation.navigate('Home', {
      mode: HomeNavigateModes.chargerLocateOnMap,
      lat: parseFloat(charger?.lat ?? '0'),
      lng: parseFloat(charger?.lng ?? '0'),
    })
  }

  /**
   * Go to charger location.
   */
  const chargerLocationDirectionHandler = async (): Promise<void> => {
    await askForLocationIfNotEnabled()

    if (isLocationEnabled()) {
      navigation.navigate('Home', {
        mode: HomeNavigateModes.showRoutesToCharger,
        lat: parseFloat(charger?.lat ?? '0'),
        lng: parseFloat(charger?.lng ?? '0'),
      })
    }
  }

  const onFavoritePress = async (): Promise<void> => {
    /**
     * Handle not authorized user.
     */
    if (!defaults.token) {
      return DisplayDropdownWithError('dropDownAlert.charging.needToLogIn')
    }

    /**
     * Prepare new charger instance with
     * changed favorite status.
     */
    const newCharger = {
      ...charger,
      is_favorite: !charger?.is_favorite,
    } as BaseCharger

    /**
     * Update charger information on navigation and local state.
     */
    const updateCharger = (): void => {
      navigation.setParams({ chargerDetails: newCharger })
      setCharger(newCharger)
    }

    /**
     * Handle add charger to favorites.
     */
    if (charger?.is_favorite === false) {
      dispatch(addChargerToFavorites(charger.id))
      updateCharger()

      /**
       * Handle remove charger from favorites.
       */
    } else if (charger?.is_favorite === true) {
      dispatch(removeChargerFromFavorites(charger.id))
      updateCharger()

      /**
       * Any other case.
       */
    } else {
      DisplayDropdownWithError()
    }
  }

  /**
   * Handle start charging button click.
   */
  const startChargingHandler = (): void => {
    /**
     * Handle unauthorized user.
     */
    if (!defaults.token) {
      easyAlert({
        text: 'dropDownAlert.charging.needToLogIn',
        leftText: 'authentication.authentication',
        onLeftClick: () => navigation.navigate('Auth'),
      })
      return
    }

    /**
     * Handle user without credit card.
     */
    if (state.user?.user_cards.length === 0) {
      easyAlert({
        text: 'chargerDetail.pleaseAddCardFirst',
        leftText: 'settings.add',
        onLeftClick: () => navigation.navigate('CardAdd'),
      })
      return
    }

    /**
     * Allow only 2 charging processes at most.
     */
    if (chargingState.length > 1) {
      DisplayDropdownWithError(t('chargerDetail.maxAllowedCarCharing'))
      return
    }

    /**
     * Select connector if not selected.
     */
    if (activeChargerType === -1) {
      DisplayDropdownWithError(t('chargerDetail.selectConnector'))
      return
    }

    /**
     * Handle charger which is already charging.
     */
    if (
      chargingState.length > 0
      && charger
        ?.connector_types[activeChargerType]
        ?.pivot.id === chargingState[activeChargerType]?.charger_id
    ) {
      DisplayDropdownWithError(t('chargerDetail.chargerIsBusy'))
      return
    }

    /**
     * if everything's alright go to
     * charging method selection.
     */
    navigation.navigate('ChooseChargeMethod', {
      connectorTypeId: charger?.connector_types[activeChargerType]?.pivot.id,
    })
  }

  /**
   * On business service click show
   * information about service.
   */
  const onBusinessServiceClick = (title: LanguageType, description: LanguageType) => {
    defaults.dropdown.alertWithType('info', t(getLocaleText(title)), t(getLocaleText(description)))
  }

  return {
    chargerLocationDirectionHandler,
    showChargerLocationHandler,
    onBusinessServiceClick,
    setActiveChargerType,
    startChargingHandler,
    activeChargerType,
    goBackHandler,
    onFavoritePress,
    distance,
    charger,
  }
}
