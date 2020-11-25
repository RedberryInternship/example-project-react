import React, { useState, useRef } from 'react'
import { TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from 'react-navigation'
import { selectUser } from 'state/selectors'
import Defaults from 'utils/defaults'
import services from 'services'
import {
  LastUsedChargerResponseObject,
  HomeNavigateModes,
  LastUsedCharger,
  Charger,
} from '../../../../../@types/allTypes.d'

// SARU

type _This = {
  chargeWitchCode: string
}

// Vobi todo: move this in hooks
export default (navigation: NavigationScreenProp<NavigationState, NavigationParams>) => {
  const state = useSelector(selectUser)
  const [loading, SetLoading] = useState<boolean>(true)
  const [activeChargerType, setActiveChargerType] = useState<number>(0)

  // Vobi Todo: _this is not React's practice why do you need it
  const _this: React.RefObject<_This> = useRef({ chargeWitchCode: '' })

  // Vobi Todo: move this as state
  const chargeWitchCode: React.RefObject<TextInput> = useRef(null)
  const passwordRef: any = useRef(null)

  const { t } = useTranslation()

  const codeTextHandler = (val: string) => {
    _this.current!.chargeWitchCode = val
    // Ajax.get()
  }

  const codeInputSubmit = () => {
    if (_this.current?.chargeWitchCode === '') {
      return Defaults.dropdown?.alertWithType('error', t('dropDownAlert.fillCode'))
    }

    const charger = state
      .AllChargers
      ?.filter((val: Charger) => val.code == _this.current?.chargeWitchCode) ?? []

    if (charger.length === 0) {
      return Defaults.dropdown?.alertWithType('error', t('dropDownAlert.chargerNotExist'))
    }
    navigateToChargerDetailScreen(charger[0])
  }

  const navigateToChargerDetailScreen = (charger: Charger): void => {
    navigation.navigate('ChargerDetail', { chargerDetails: charger })
  }

  const lastUsed = async (): Promise<LastUsedCharger[]> => {
    if (Defaults.token !== '') {
      const res: LastUsedChargerResponseObject = await services.getUserChargers()
      // charger_connector_type
      return res.data
    }
    return []
  }

  const allChargerHandler = (): void => {
    navigation.navigate('Home', { mode: HomeNavigateModes.showAllChargers })
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
    navigateToChargerDetailScreen,
  }
}
