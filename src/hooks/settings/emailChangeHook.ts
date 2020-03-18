import {useState, useEffect, useRef, useContext} from 'react'
import {TextInput} from 'react-native'
import {AppContext} from '../../../App'
import {Defaults, Ajax, apiServices, Helpers} from '../../utils'
import {editUserInfo} from '../../hooks/actions/rootActions'
import {useTranslation} from 'react-i18next'
import {ProfileFieldChange, BaseInputRefProp} from 'allTypes'

const {Logger} = Helpers
export default ({navigation, clicked, setClicked}: ProfileFieldChange) => {
  const [email, setEmail] = useState<string>(navigation.getParam('value'))
  const {dispatch} = useContext(AppContext)
  const {t} = useTranslation()
  const emailInputRef = useRef<TextInput & BaseInputRefProp>()

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
      return email === '' // Vobi todo: this is bad way to validate user input 
    },

    isEmailValid: (): boolean => {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // Vobi Todo: for example here if you want to use this function you wont be able to do it
      return emailRegex.test(email) // Vobi Todo: move this kind of validations inside utils for example
      // Vobi Todo: create file validationUtils.js
      // Vobi Todo: declare function isEmail which will return a boolean depending on input
      // Vobi Todo: and then you can reuse it wherever you want
      // Vobi Todo: i would recommend react-hook-form for forms https://react-hook-form.com
      // Vobi Todo: it has so many great features and good performance
    },
  }

  // helpers
  const helpers = { // Vobi Todo why are helpers declared here helpers are one of the biggest code in the project
    // Vobi Todo: you should have global helper folder and move all code inside
    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown?.alertWithType(type, t(text))
    },

    sendRequestToSaveEmailAndUpdateState: async (): Promise<void> => {
      try {
        const result = await Ajax.post(apiServices.post_update_user_info, {
          email: email,
        }) // Vobi Todo: i think you are using Ajax wrong way i will write it inside Ajax file

        if (result.updated === true) {
          editUserInfo(dispatch, email, 'email')
          helpers.goToSettingsScreen()
          helpers.popAlert(
            'dropDownAlert.editEmail.editedSuccessfully',
            'success',
          )
        } else {
          throw new Error('Something Went Wrong...')
        }
      } catch (err) {
        Logger(err)
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
