/* eslint-disable @typescript-eslint/camelcase */
import {useState, useContext, useEffect} from 'react'

import {
  Navigation,
  UserSettingsInfoType,
  SettingsListFieldType,
  UserSettingEnum,
} from '../../../../../@types/allTypes.d'

import {AppContext} from '../../../../../App'
import {useBaseActionSheetPicker} from 'components'
import {editUserInfo} from 'hooks/actions/rootActions'

export default (navigation: Navigation) => {
  const {state, dispatch}: any = useContext(AppContext)
  const [userData, setUserData] = useState<UserSettingsInfoType | null>(null)
  const {selectedItem, renderPicker} = useBaseActionSheetPicker()

  useEffect(() => {
    if (selectedItem) {
      editUserInfo(dispatch, selectedItem, UserSettingEnum.mapMode)
    }
  }, [selectedItem])

  useEffect(() => {
    structureSettingsInfoObj()
  }, [state])

  const structureSettingsInfoObj = (): void => {
    const activeCardNumber = '********* 9281'

    if (state?.user) {
      const {
        first_name,
        last_name,
        email,
        phone_number,
        user_cards: activeCard,
        mapMode,
      } = state.user
      setUserData({
        first_name,
        last_name,
        email,
        phone_number,
        password: '',
        activeCard: '', // TODO: need real data
        mapMode: mapMode ?? 'settings.automatic',
        user_cars: '',
      })
    } else setUserData(null)
  }

  const onPressHandler = (item: SettingsListFieldType, value: string): void => {
    if (item.type === UserSettingEnum.mapMode) {
      renderPicker([
        'settings.automatic',
        'settings.mapColorLight',
        'settings.mapColorDark',
      ])
    } else {
      navigation.navigate('ProfileChange', {
        type: item.type,
        name: item.editableComponentName,
        inputName: item.name,
        value: value,
      })
    }
  }
  return {userData, state, dispatch, onPressHandler}
}
