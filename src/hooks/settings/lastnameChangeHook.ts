import {useState, useRef, useContext, useEffect} from 'react'
import {Defaults, apiServices, Ajax} from 'utils'
import {useTranslation} from 'react-i18next'
import {AppContext} from '../../../App'
import {editUserInfo} from 'hooks/actions/rootActions'
import {ProfileFieldChange, BaseInputRefProp} from 'allTypes'
import {TextInputProps} from 'react-native'

export default ({navigation, clicked, setClicked}: ProfileFieldChange) => {
  const {t} = useTranslation()
  const {dispatch} = useContext(AppContext)
  const [lastname, setLastname] = useState<string>(
    navigation.getParam('value', ''),
  )
  const lastnameInputRef = useRef<TextInputProps & BaseInputRefProp>(null)

  // when clicked on save button, save hook released.
  useEffect(() => {
    if (clicked === true) {
      saveLastname()
      setClicked(false)
    }
  }, [clicked])

  const saveLastname = (): void => {
    if (validate.isEmpty()) {
      helpers.popAlert('dropDownAlert.editLastname.lastNameNotEmpty')
      return
    }

    if (validate.isLessThenMinSize()) {
      helpers.makeLastnameFieldEmpty()
      helpers.popAlert('dropDownAlert.editLastname.minSize')
      return
    }

    helpers.sendLastnameToSaveAndUpdateTheState()
  }

  const onChangeText = (text: string): void => {
    setLastname(text)
  }

  const onSubmitEditing = (): void => {
    saveLastname()
  }

  // validations
  const validate = {
    isEmpty: (): boolean => {
      if (lastname.trim() === '') {
        return true
      } else {
        return false
      }
    },
    isLessThenMinSize: (): boolean => {
      if (lastname.trim().length < 3) {
        setClicked(false)
        return true
      } else {
        return false
      }
    },
  }

  // helpers
  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown?.alertWithType(type, t(text))
    },
    makeLastnameFieldEmpty: (): void => {
      setLastname('')
    },
    sendLastnameToSaveAndUpdateTheState: async (): Promise<void> => {
      try {
        const result = await Ajax.post(apiServices.post_update_user_info, {
          // eslint-disable-next-line @typescript-eslint/camelcase
          last_name: lastname,
        })

        if (result.updated === true) {
          helpers.goToSettingsScreen()
          helpers.popAlert(
            'dropDownAlert.editLastname.lastNameChangeSuccess',
            'success',
          )
          editUserInfo(dispatch, lastname, 'last_name')
        } else {
          throw new Error('Something Went Wrong...')
        }
      } catch (err) {
        helpers.popAlert('dropDownAlert.generalError')
      }
    },
    goToSettingsScreen: (): void => {
      navigation.navigate('Settings')
    },
  }

  return {
    onChangeText,
    onSubmitEditing,
    lastnameInputRef,
    lastname,
  }
}
