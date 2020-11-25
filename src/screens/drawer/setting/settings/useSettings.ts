import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editUserInfo } from 'state/actions/userActions'
import useBaseActionSheetPicker from 'react-native-platform-specific-hook-selector'
import { useTranslation } from 'react-i18next'
import { selectUser } from 'state/selectors'
import {
  setUserData as setUserDataInStorage,
  setUserDetail,
} from 'helpers/user'
import {
  Navigation,
  UserSettingsInfoType,
  SettingsListFieldType,
  UserSettingEnum,
  UserCard,
  UserState,
} from '../../../../../@types/allTypes.d'

export default (navigation: Navigation) => {
  const state: UserState = useSelector(selectUser)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState<UserSettingsInfoType | null>(null)

  const { t } = useTranslation()

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

      setUserDetail(UserSettingEnum.mapMode, _selectedItem)
      setUserDataInStorage()
      dispatch(editUserInfo(_selectedItem, UserSettingEnum.mapMode))
    }
  }, [selectedItem])

  useEffect(() => {
    structureSettingsInfoObj()
  }, [state])

  // Vobi Todo: what is purpose of this function if it is only used in useEffect
  const structureSettingsInfoObj = (): void => {
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
      } return ''
      // Vobi Todo: choose one approach
      // if() { return } else { return }
      // if() return else return
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
        value,
      })
    }
  }
  return {
    userData, state, dispatch, onPressHandler,
  }
}
