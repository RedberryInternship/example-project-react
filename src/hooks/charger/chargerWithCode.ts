/* eslint-disable no-unused-vars */
import {useState, useRef, useContext} from 'react'
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
} from 'react-navigation'
import {Defaults} from 'utils'

type _This = {
  chargeWitchCode: string
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

export default (
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  const context: AppContextType = useContext(AppContext)
  const [loading, SetLoading] = useState<boolean>(true)
  const [activeChargerType, setActiveChargerType] = useState<number>(0)

  const _this: React.RefObject<_This> = useRef({chargeWitchCode: ''})

  const chargeWitchCode: React.RefObject<TextInput> = useRef(null)
  const passwordRef: any = useRef(null)

  const {t} = useTranslation()

  const codeTextHandler = (val: string) => {
    _this.current!.chargeWitchCode = val
    // Ajax.get()
  }

  const codeInputSubmit = () => {
    if (_this.current?.chargeWitchCode == '') {
      return Defaults.dropdown.alertWithType(
        'error',
        t('dropDownAlert.fillCode'),
      )
    }

    const charger =
      context.state.AllChargers?.filter((val: Charger) => {
        return val.code == _this.current?.chargeWitchCode
      }) ?? []

    if (charger.length == 0) {
      return Defaults.dropdown.alertWithType(
        'error',
        t('dropDownAlert.chargerNotExist'),
      )
    }

    navigation.navigate('ChargerDetail', {chargerDetails: charger[0]})
  }

  const lastUsed = () => {
    context
    // Ajax.get()

    return lastUsedDummy
  }

  const allChargerHandler = () => {
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
  }
}
