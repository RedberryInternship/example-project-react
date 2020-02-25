import {useState, useEffect, useRef, useContext} from 'react'
import {TextInputProps} from 'react-native'
import {AppContext} from '../../../App'
import {Defaults, Ajax, apiServices} from '../../utils'
import {editUserInfo} from '../../hooks/actions/rootActions'
import {useTranslation} from 'react-i18next'
import {ProfileFieldChange, BaseInputRefProp} from 'allTypes'

export default ({navigation, clicked, setClicked}: ProfileFieldChange) => {
  const [email, setEmail] = useState<string>(navigation.getParam('value'))
  const {dispatch} = useContext(AppContext)
  const {t} = useTranslation()
  const emailInputRef = useRef<TextInputProps & BaseInputRefProp>(null)

  // When User Clicks Save Btn
  useEffect(() => {
    if (clicked === true) {
      saveEmail()
      setClicked(false)
    }
  }, [clicked])

  const saveEmail = (): void => {
    // If Empty => save email
    if (validate.isEmailEmpty()) {
      helpers.sendRequestToSaveEmailAndUpdateState()
    }
    // False => check email validity
    else {
      if (validate.isEmailValid()) {
        helpers.sendRequestToSaveEmailAndUpdateState()
      } else {
        helpers.popAlert('dropDownAlert.editEmail.incorrectFormat', 'error')
        helpers.emptyEmailField()
      }
    }
  }

  const onChangeText = (text: string): void => {
    setEmail(text.trim())
    emailInputRef.current?.setNativeProps({
      text: text.trim(),
    })
  }

  const onSubmit = (): void => {
    saveEmail()
  }

  // validation
  const validate = {
    isEmailEmpty: (): boolean => {
      return email.trim() === ''
    },

    isEmailValid: (): boolean => {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      return emailRegex.test(email.trim())
    },
  }

  // helpers
  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown.alertWithType(type, t(text))
    },

    sendRequestToSaveEmailAndUpdateState: async (): Promise<void> => {
      try {
        const result = await Ajax.post(apiServices.post_update_user_info, {
          email: email,
        })

        if (result.updated === true) {
          editUserInfo(dispatch, email, 'email')
          helpers.goToSettingsScreen()
          helpers.popAlert(
            'dropDownAlert.editEmail.editedSuccssesfully',
            'success',
          )
        } else {
          throw new Error('Something Went Wrong...')
        }
      } catch (err) {
        helpers.popAlert('dropDownAlert.generalError')
        helpers.emptyEmailField()
      }
    },

    emptyEmailField: (): void => {
      setEmail('')
    },

    goToSettingsScreen: (): void => {
      navigation.navigate('Settings')
    },
  }

  return {
    email,
    onChangeText,
    onSubmit,
    emailInputRef,
  }
}
