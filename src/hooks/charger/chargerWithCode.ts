/* eslint-disable no-unused-vars */
import {useState, useRef, useContext, useEffect} from 'react'
import {Alert, TextInput} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  NavigationState,
  NavigationScreenProp,
  NavigationParams,
} from 'react-navigation'

import {AppContext} from '../../../App'
import {
  AppContextType,
  Charger,
  HomeNavigateModes,
  LastUsedCharger,
  LastUsedChargerResponseObject,
} from '../../../@types/allTypes.d'
import {Defaults, Ajax} from 'utils'

type _This = {
  chargeWitchCode: string
}

const LastUsedChargersStatic: LastUsedCharger[] | null = null

export default (
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  const context: AppContextType = useContext(AppContext)
  const [loading, SetLoading] = useState<boolean>(true)
  const [activeChargerType, setActiveChargerType] = useState<number>(0)
  const [lastUsedChargers, setLastUsedChargers] = useState<
    LastUsedCharger[] | null
  >(LastUsedChargersStatic)

  const _this: React.RefObject<_This> = useRef({chargeWitchCode: ''}) // Vobi Todo: _this is not React's practice why do you need it

  const chargeWitchCode: React.RefObject<TextInput> = useRef(null) // Vobi Todo: move this as state
  const passwordRef: any = useRef(null)

  const {t} = useTranslation()

  const codeTextHandler = (val: string) => {
    _this.current!.chargeWitchCode = val
    // Ajax.get()
  }

  const codeInputSubmit = () => {
    if (_this.current?.chargeWitchCode == '') {
      return Defaults.dropdown?.alertWithType(
        'error',
        t('dropDownAlert.fillCode'),
      )
    }

    const charger =
      context.state.AllChargers?.filter((val: Charger) => {
        return val.code == _this.current?.chargeWitchCode
      }) ?? []

    if (charger.length == 0) {
      return Defaults.dropdown?.alertWithType(
        'error',
        t('dropDownAlert.chargerNotExist'),
      )
    }
    navigateToChargerDetailScreen(charger[0])
  }

  const navigateToChargerDetailScreen = (charger: Charger): void => {
    navigation.navigate('ChargerDetail', {chargerDetails: charger})
  }

  const lastUsed = async (): Promise<LastUsedCharger[]> => {
    if (Defaults.token !== '') {
      const res: LastUsedChargerResponseObject = await Ajax.get(
        '/user-chargers',
      )
      return res.data
    } else {
      return []
    }
  }

  const allChargerHandler = (): void => {
    navigation.navigate('Home', {mode: HomeNavigateModes.showAllChargers})
  }

  return {
    loading,
    SetLoading,
    codeTextHandler,
    codeInputSubmit,
    _this,
    passwordRef,
    t,
    chargeWitchCode,
    lastUsed,
    allChargerHandler,
    activeChargerType,
    setActiveChargerType,
    lastUsedChargers,
    navigateToChargerDetailScreen,
  }
}
