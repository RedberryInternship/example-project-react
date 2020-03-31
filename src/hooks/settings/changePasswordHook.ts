/* eslint-disable @typescript-eslint/camelcase */
import {useEffect, useRef} from 'react'
import {TextInput} from 'react-native'
import {ProfileFieldChange, BaseInputRefProp} from 'allTypes'
import {useTranslation} from 'react-i18next'

import {apiServices, Defaults, Ajax, Helpers} from '../../utils'

type ThisType = {
  currentPassword: string
  setNewPassword: string
  repeatNewPassword: string
}

const {Logger} = Helpers

export default ({navigation, clicked, setClicked}: ProfileFieldChange) => {
  const currentPasswordRef = useRef<TextInput & BaseInputRefProp>()
  const setNewPasswordRef = useRef<TextInput & BaseInputRefProp>()
  const repeatNewPasswordRef = useRef<TextInput & BaseInputRefProp>()

  const {t} = useTranslation()

  const This = useRef<ThisType>({
    currentPassword: '',
    setNewPassword: '',
    repeatNewPassword: '',
  }) // Vobi Todo: this must be state

  useEffect(() => {
    if (clicked === true) {
      saveNewPassword()
      setClicked(false)
    }
  }, [clicked])

  useEffect(() => {
    setTimeout(currentPasswordRef.current?.focus, 500)
  }, [])

  const saveNewPassword = (): void => {
    validate.currentPassword() &&
      validate.setNewPassword() &&
      validate.repeatNewPassword() &&
      helpers.trySendingSavePasswordRequest()
  }

  const currentPassword = {
    onChangeText: (text: string): void => {
      This.current.currentPassword = text.trim()
      currentPasswordRef.current?.setNativeProps({
        text: This.current.currentPassword,
      })
    },
    onSubmit: (): void => {
      validate.currentPassword() && setNewPasswordRef.current?.focus()
    },
  }

  const setNewPassword = {
    onChangeText: (text: string): void => {
      This.current.setNewPassword = text.trim()
      setNewPasswordRef.current?.setNativeProps({
        text: This.current.setNewPassword,
      })
    },
    onSubmit: (): void => {
      validate.currentPassword() &&
        validate.setNewPassword() &&
        repeatNewPasswordRef.current?.focus()
    },
    onFocus: (): void => {
      validate.currentPassword()
    }, // Vobi Todo: use react hook form and move validations into one folder
  }

  const repeatNewPassword = {
    onChangeText: (text: string): void => {
      This.current.repeatNewPassword = text.trim()
      repeatNewPasswordRef.current?.setNativeProps({
        text: This.current.repeatNewPassword,
      })
    },
    onSubmit: (): void => {
      saveNewPassword()
    },
    onFocus: (): void => {
      validate.currentPassword() && validate.setNewPassword()
    },
  }

  const validate = {
    currentPassword: (): boolean => {
      return (
        validate.isCurrentPasswordFilled() &&
        validate.isCurrentPasswordLengthValid()
      )
    }, // Vobi Todo: React hook form will avoid you to write this code
    isCurrentPasswordFilled: (): boolean => {
      if (This.current.currentPassword !== '') {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.fillCurrentPassword')
        currentPasswordRef.current?.focus()
        return false
      }
    },
    isCurrentPasswordLengthValid: (): boolean => {
      if (This.current.currentPassword.length > 7) {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.minSize')
        currentPasswordRef.current?.focus()
        helpers.emptyCurrentPassword()
        helpers.emptySetNewPassword()
        helpers.emptyNewPassword()
        return false
      }
    },

    setNewPassword: (): boolean => {
      return (
        validate.currentPassword() &&
        validate.isSetNewPasswordFilled() &&
        validate.isSetNewPasswordLengthValid()
      )
    },

    isSetNewPasswordFilled: (): boolean => {
      if (This.current.setNewPassword !== '') {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.fillNewPassword')
        setNewPasswordRef.current?.focus()

        return false
      }
    },

    isSetNewPasswordLengthValid: (): boolean => {
      if (This.current.setNewPassword.length > 7) {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.minSize')
        helpers.resetFields()
        return false
      }
    },

    repeatNewPassword: (): boolean => {
      return (
        validate.currentPassword() &&
        validate.setNewPassword() &&
        validate.isRepeatNewPasswordFilled() &&
        validate.isRepeatNewPasswordLengthValid() &&
        validate.isRepeatNewPasswordIdenticalToSetNewPassword()
      )
    },
    isRepeatNewPasswordFilled: (): boolean => {
      if (This.current.repeatNewPassword !== '') {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.fillRepeatPassword')
        repeatNewPasswordRef.current?.focus()
        return false
      }
    },
    isRepeatNewPasswordLengthValid: (): boolean => {
      if (This.current.repeatNewPassword.length > 7) {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.minSize')
        helpers.emptySetNewPassword()
        helpers.emptyNewPassword()
        setNewPasswordRef.current?.focus()
        return false
      }
    },

    isRepeatNewPasswordIdenticalToSetNewPassword: (): boolean => {
      if (This.current.setNewPassword === This.current.repeatNewPassword) {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.passwordsMismatch')
        helpers.emptySetNewPassword()
        helpers.emptyNewPassword()
        setNewPasswordRef.current?.focus()
        return false
      }
    },
  }

  const helpers = {
    trySendingSavePasswordRequest: async (): Promise<void> => {
      const dataToSend = {
        phone_number: Defaults.userDetail?.phone_number,
        old_password: This.current.currentPassword,
        new_password: This.current.repeatNewPassword,
      }

      try {
        const result = await Ajax.post(
          apiServices.post_edit_password,
          dataToSend,
        )
        if (result.status_code === 200) {
          helpers.popAlert('dropDownAlert.editPassword.success', 'success')
          navigation.navigate('Settings')
        } else {
          throw new Error()
        }
      } catch (e) {
        Logger(e)
        if (e.status === 401) {
          helpers.popAlert('dropDownAlert.editPassword.passwordNotValid')
        } else {
          helpers.popAlert('dropDownAlert.generalError')
        }
        helpers.resetFields()
      }
    },

    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown?.alertWithType(type, t(text))
    },

    resetFields: (): void => {
      helpers.emptyCurrentPassword()
      helpers.emptySetNewPassword()
      helpers.emptyNewPassword()
      currentPasswordRef.current?.focus()
    },

    emptyCurrentPassword: (): void => {
      This.current.currentPassword = ''
      currentPasswordRef.current?.setNativeProps({
        text: '',
      })
    },

    emptySetNewPassword: (): void => {
      This.current.setNewPassword = ''
      setNewPasswordRef.current?.setNativeProps({
        text: '',
      })
    },

    emptyNewPassword: (): void => {
      This.current.repeatNewPassword = ''
      repeatNewPasswordRef.current?.setNativeProps({
        text: '',
      })
    },
  }

  return {
    currentPasswordRef,
    setNewPasswordRef,
    repeatNewPasswordRef,
    currentPassword,
    setNewPassword,
    repeatNewPassword,
  }
}
