/* eslint-disable @typescript-eslint/camelcase */
import {useRef, useEffect} from 'react'
import {TextInput} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Defaults, Ajax, Helpers} from 'utils'
import {Navigation} from 'allTypes'

const {Logger} = Helpers

type This = {
  newPassword: string
  repeatPassword: string
}

export default (navigation: Navigation) => {
  const newPasswordRef = useRef<TextInput>()
  const repeatPasswordRef = useRef<TextInput>()

  const _this = useRef<This>({newPassword: '', repeatPassword: ''})
  const {t} = useTranslation()

  useEffect(() => {
    setTimeout(() => newPasswordRef.current?.focus(), 500)
  }, [])

  const onClickSubmitButton = (): void => {
    validate.newPassword() &&
      validate.repeatPassword() &&
      helpers.setNewPassword()
  }

  const newPassword = {
    textHandler: (val: string): void => {
      _this.current.newPassword = val
    },
    onSubmit: (): void => {
      validate.newPassword() && repeatPasswordRef.current?.focus()
    },
  }
  const repeatPassword = {
    textHandler: (val: string): void => {
      _this.current.repeatPassword = val
    },
    onSubmit: (): void => {
      validate.repeatPassword()
    },
  }

  const validate = {
    newPassword: (): boolean => {
      return (
        validate.isNewPasswordFilled() && validate.isNewPasswordMinLengthValid()
      )
    },
    isNewPasswordFilled: (): boolean => {
      if (_this.current.newPassword.length === 0) {
        helpers.popAlert('dropDownAlert.forgotPassword.newPasswordNotFilled')
        return false
      }
      return true
    },
    isNewPasswordMinLengthValid: (): boolean => {
      if (_this.current.newPassword.length < 8) {
        helpers.popAlert(
          'dropDownAlert.forgotPassword.newPasswordIncorrectLength',
        )
        helpers.resetNewPassword()
        newPasswordRef.current?.focus()
        return false
      }
      return true
    },
    repeatPassword: (): boolean => {
      return (
        validate.isRepeatPasswordFilled() &&
        validate.isRepeatPasswordEqualToNewPassword()
      )
    },
    isRepeatPasswordFilled: (): boolean => {
      if (_this.current.repeatPassword.length === 0) {
        repeatPasswordRef.current?.focus()
        helpers.popAlert(
          'dropDownAlert.forgotPassword.repeatNewPasswordNotFilled',
        )
        return false
      }
      return true
    },
    isRepeatPasswordEqualToNewPassword: (): boolean => {
      if (_this.current.newPassword === _this.current.repeatPassword) {
        return true
      } else {
        helpers.resetFields()
        helpers.popAlert('dropDownAlert.registration.passwordNotEqual')
        return false
      }
    },
  }

  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown?.alertWithType(type, t(text))
    },
    setNewPassword: async (): Promise<void> => {
      try {
        const result = await Ajax.post('/reset-password', {
          phone_number: navigation.state.params?.phone,
          password: _this.current.newPassword,
        })

        if (result.json_status === 'Password Changed') {
          helpers.popAlert(
            'dropDownAlert.forgotPassword.passwordChangedSuccessfully',
            'success',
          )
          navigation.navigate('Auth')
        } else {
          throw new Error()
        }
      } catch (err) {
        Logger(err)
        helpers.popAlert('dropDownAlert.generalError')
      }
    },
    resetFields: (): void => {
      helpers.resetNewPassword()
      helpers.resetRepeatPassword()
      newPasswordRef.current?.focus()
    },

    resetNewPassword: (): void => {
      newPasswordRef.current?.setNativeProps({
        text: '',
      })
      _this.current.newPassword = ''
    },
    resetRepeatPassword: (): void => {
      repeatPasswordRef?.current?.setNativeProps({
        text: '',
      })
      _this.current.repeatPassword = ''
    },
  }

  return {
    onClickSubmitButton,
    newPasswordRef,
    repeatPasswordRef,
    newPassword,
    repeatPassword,
  }
}
