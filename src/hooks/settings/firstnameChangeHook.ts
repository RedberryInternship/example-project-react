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
  const [firstname, setFirstname] = useState<string>(
    navigation.getParam('value', ''),
  )
  const firstnameInputRef = useRef<TextInputProps & BaseInputRefProp>(null)

  // when clicked on save button, save hook released.
  useEffect(() => {
    if (clicked === true) {
      saveFirstname()
      setClicked(false)
    }
  }, [clicked])

  const saveFirstname = (): void => {
    if (validate.isEmpty()) {
      helpers.popAlert('dropDownAlert.editFirstname.firstNameNotEmpty')
      return
    }

    if (validate.isLessThenMinSize()) {
      helpers.makeFirstnameFieldEmpty()
      helpers.popAlert('dropDownAlert.editFirstname.minSize')
      return
    }

    helpers.sendFirstnameToSaveAndUpdateState()
  }

  const onChangeText = (text: string): void => {
    setFirstname(text)
  }

  const onSubmitEditing = (): void => {
    saveFirstname()
  }

  // validations
  const validate = {
    isEmpty: (): boolean => {
      if (firstname.trim() === '') {
        return true
      } else {
        return false
      }
    },
    isLessThenMinSize: (): boolean => {
      if (firstname.trim().length < 3) {
        return true
      } else {
        return false
      }
    },
  }

  // helpers
  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown.alertWithType(type, t(text))
    },
    makeFirstnameFieldEmpty: (): void => {
      setFirstname('')
    },
    sendFirstnameToSaveAndUpdateState: async (): Promise<void> => {
      try {
        const result = await Ajax.post(apiServices.post_update_user_info, {
          // eslint-disable-next-line @typescript-eslint/camelcase
          first_name: firstname,
        })

        if (result.updated === true) {
          helpers.goToSettingsScreen()
          helpers.popAlert(
            'dropDownAlert.editFirstname.firstNameChangeSucess',
            'success',
          )
          editUserInfo(dispatch, firstname, 'first_name')
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
    firstnameInputRef,
    firstname,
  }
}
