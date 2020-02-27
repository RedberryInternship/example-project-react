import {useState, useRef} from 'react'
import {TextInput} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Defaults, Ajax, Helpers} from 'utils'
import {Navigation} from 'allTypes'

const {Logger} = Helpers

type This = {
  newPassword: string
  repeatPassword: string
}

type RequestResponse = {
  json_status: string
}

export default (navigation: Navigation) => {
  const [loading, SetLoading] = useState<boolean>(true)
  const newPasswordRef = useRef<TextInput>(null)
  const repeatPasswordRef = useRef<TextInput>(null)

  const {t} = useTranslation()
  const _this = useRef<This>({newPassword: '', repeatPassword: ''})

  const onClickSubmitButton = (): void => {
    if (validateNewPasswordInput() && validateRepeatedPasswordInput()) {
      setNewPassword()
        .then(({json_status}: RequestResponse) => {
          if (json_status === 'Password Changed') {
            helpers.popAlert(
              'dropDownAlert.forgotPassword.passwordChangedSuccessfully',
              'success',
            )
            navigation.navigate('Auth')
          } else {
            throw new Error()
          }
        })
        .catch(err => {
          Logger(err)
          helpers.popAlert('dropDownAlert.generalError', 'error')
        })
    }
  }

  const newPasswordTextHandler = (val: string) => {
    _this.current.newPassword = val
  }

  const newPasswordInputSubmit = () => {
    if (validateNewPasswordInput() === true) {
      repeatPasswordRef?.current?.focus()
    }
  }

  const validateNewPasswordInput = (): boolean => {
    if (_this.current.newPassword.length === 0) {
      Defaults.dropdown?.alertWithType(
        'error',
        t('dropDownAlert.forgotPassword.newPasswordNotFilled'),
      )
      return false
    } else if (_this.current.newPassword.length < 8) {
      Defaults.dropdown?.alertWithType(
        'error',
        t('dropDownAlert.forgotPassword.newPasswordIncorrectLength'),
      )
      return false
    } else {
      return true
    }
  }

  const repeatPasswordTextHandler = (val: string) => {
    _this.current.repeatPassword = val
  }

  const repeatPasswordInputSubmit = () => {
    validateRepeatedPasswordInput()
  }

  const validateRepeatedPasswordInput = (): boolean => {
    if (_this.current.newPassword !== _this.current.repeatPassword) {
      if (_this.current.repeatPassword.length === 0) {
        repeatPasswordRef?.current?.focus()
        Defaults.dropdown?.alertWithType(
          'error',
          t('dropDownAlert.forgotPassword.repeatNewPasswordNotFilled'),
        )
      } else {
        cleanPasswordFieldsAndFocusOnNewPassword()
      }

      return false
    } else {
      return true
    }
  }

  const cleanPasswordFieldsAndFocusOnNewPassword = () => {
    Defaults.dropdown?.alertWithType(
      'error',
      t('dropDownAlert.registration.passwordNotEqual'),
    )

    newPasswordRef?.current?.setNativeProps({
      text: '',
    })
    _this.current.newPassword = ''

    repeatPasswordRef?.current?.setNativeProps({
      text: '',
    })
    _this.current.repeatPassword = ''

    newPasswordRef?.current?.focus()
  }

  const setNewPassword = async () => {
    return await Ajax.post('/reset-password', {
      phone_number: navigation.state.params.phone,
      password: _this.current.newPassword,
    })
  }

  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown?.alertWithType(type, t(text))
    },
  }

  return {
    loading,
    SetLoading,
    newPasswordTextHandler,
    newPasswordInputSubmit,
    repeatPasswordTextHandler,
    repeatPasswordInputSubmit,
    _this,
    t,
    newPasswordRef,
    repeatPasswordRef,
    onClickSubmitButton,
  }
}
