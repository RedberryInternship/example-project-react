import {
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

  /**
   * Map mode and map mode picker setters.
   */
  const [selectedItem, renderPicker] = useBaseActionSheetPicker({
    cancelText: t('cancel'),
    title: t('settings.chooseMapMode'),
  })

  /**
   * Map mode update handler.
   */
  useEffect(() => {
    if (selectedItem) {
      let newSelectedItem = ''
      switch (selectedItem) {
        case t('settings.mapColorLight'):
          newSelectedItem = 'settings.mapColorLight'
          break
        case t('settings.mapColorDark'):
          newSelectedItem = 'settings.mapColorDark'
          break

        default:
          newSelectedItem = 'settings.automatic'
          break
      }

      setUserDetail(UserSettingEnum.mapMode, newSelectedItem)
      setUserDataInStorage()
      dispatch(editUserInfo(newSelectedItem, UserSettingEnum.mapMode))
    }
  }, [selectedItem])

  /**
   * Set user data on local state, whenever
   * state change happens.
   */
  useEffect(() => {
    /**
     * Select default user card.
     */
    const selectDefaultUserCard = (userCards: UserCard[]): string => {
      const activeCard = userCards.find((val) => val.default === 1)
      if (activeCard) {
        return activeCard.masked_pan
      }

      return ''
    }

    if (state.user) {
      /**
       * Destructure user state.
       */
      const {
        first_name,
        last_name,
        email,
        phone_number,
        user_cards,
        mapMode,
      } = state.user

      /**
       * Set user state.
       */
      setUserData(
        {
          first_name,
          last_name,
          email: email ?? '',
          phone_number,
          password: '',
          activeCard: selectDefaultUserCard(user_cards),
          mapMode: mapMode ?? 'settings.automatic',
          user_cars: '',
        },
      )
    } else {
      setUserData(null)
    }
  }, [state])

  /**
   * Go to change specific setting page.
   */
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
    onPressHandler,
    userData,
  }
}
