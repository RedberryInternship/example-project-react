/* eslint-disable @typescript-eslint/camelcase */
import {useState, useContext, useEffect, useCallback} from 'react'

import {
  Navigation,
  UserSettingsInfoType,
  SettingsListFieldType,
  UserSettingEnum,
  AppContextType,
  UserCard,
} from '../../../../../@types/allTypes.d'

import {AppContext} from '../../../../../App'
// import {useBaseActionSheetPicker} from 'components'
import {editUserInfo} from 'hooks/actions/rootActions'
import useBaseActionSheetPicker from 'react-native-platform-specific-hook-selector'
import {useTranslation} from 'react-i18next'

export default (navigation: Navigation) => {
  const {state, dispatch}: AppContextType = useContext(AppContext)
  const [userData, setUserData] = useState<UserSettingsInfoType | null>(null)

  const {t} = useTranslation()

  const [selectedItem, renderPicker] = useBaseActionSheetPicker({
    cancelText: t('cancel'),
    title: t('settings.chooseMapMode'),
  })

  useEffect(() => {
    if (selectedItem) {
      let _selectedItem = ''
      switch (selectedItem) {
        case t('settings.mapColorLight'):
          _selectedItem = 'settings.mapColorLight'
          break
        case t('settings.mapColorDark'):
          _selectedItem = 'settings.mapColorDark'
          break

        default:
          _selectedItem = 'settings.automatic'
          break
      }
      editUserInfo(dispatch, _selectedItem, UserSettingEnum.mapMode)
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
        user_cards,
        mapMode,
      } = state.user
      setUserData({
        first_name,
        last_name,
        email: email ?? '',
        phone_number,
        password: '',
        activeCard: userCard(user_cards),
        mapMode: mapMode ?? 'settings.automatic',
        user_cars: '',
      })
    } else setUserData(null)
  }

  const userCard = useCallback(
    (userCards: UserCard[]): string => {
      const activeCard = userCards.find((val) => val.default === 1)
      if (activeCard) {
        return activeCard.masked_pan
      } else return ''
    },
    [state],
  )

  const onPressHandler = (item: SettingsListFieldType, value: string): void => {
    if (item.type === UserSettingEnum.mapMode) {
      renderPicker([
        t('settings.automatic'),
        t('settings.mapColorLight'),
        t('settings.mapColorDark'),
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
