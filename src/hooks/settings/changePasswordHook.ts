import {useEffect, useRef} from 'react'
import {TextInput} from 'react-native'
import {ProfileFieldChange} from 'allTypes'
import {useTranslation} from 'react-i18next'

import {apiServices, Defaults, Ajax} from '../../utils'

type _This = {
  currentPassword: string
  repetePassword: string
  newPassword: string
}

export default ({navigation, clicked, setClicked}: ProfileFieldChange) => {
  const currentPasswordRef = useRef<TextInput>()
  const repetePasswordRef = useRef<TextInput>()
  const newPasswordRef = useRef<TextInput>()

  const {t} = useTranslation()

  const _this = useRef<_This>({
    currentPassword: '',
    repetePassword: '',
    newPassword: '',
  })

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
      validate.newPassword() &&
      validate.repetePassword() &&
      validate.newPassword() &&
      helpers.trySendingSavePassworRequest()
  }

  const currentPassword = {
    onChangeText: (text: string): void => {
      _this.current.currentPassword = text.trim()
      currentPasswordRef.current?.setNativeProps({
        text: _this.current.currentPassword,
      })
    },
    onSubmit: (): void => {
      validate.currentPassword() && repetePasswordRef.current?.focus()
    },
  }

  const repetePassword = {
    onChangeText: (text: string): void => {
      _this.current.repetePassword = text.trim()
      repetePasswordRef.current?.setNativeProps({
        text: _this.current.repetePassword,
      })
    },
    onSubmit: (): void => {
      validate.currentPassword() &&
        validate.repetePassword() &&
        newPasswordRef.current?.focus()
    },
    onFocus: (): void => {
      validate.currentPassword()
    },
  }

  const newPassword = {
    onChangeText: (text: string): void => {
      _this.current.newPassword = text.trim()
      newPasswordRef.current?.setNativeProps({
        text: _this.current.newPassword,
      })
    },
    onSubmit: (): void => {
      saveNewPassword()
    },
    onFocus: (): void => {
      validate.currentPassword() && validate.repetePassword()
    },
  }

  const validate = {
    currentPassword: (): boolean => {
      return (
        validate.isCurrentPasswordFilled() &&
        validate.isCurrentPasswordLengthValid()
      )
    },
    isCurrentPasswordFilled: (): boolean => {
      if (_this.current.currentPassword !== '') {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.fillCurrentPassword')
        currentPasswordRef.current?.focus()
        return false
      }
    },
    isCurrentPasswordLengthValid: (): boolean => {
      if (_this.current.currentPassword.length > 7) {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.minSize')
        currentPasswordRef.current?.focus()
        helpers.emptyCurrentPassword()
        helpers.emptyRepetePassword()
        helpers.emptyNewPassword()
        return false
      }
    },

    repetePassword: (): boolean => {
      return (
        validate.currentPassword() &&
        validate.isRepetePasswordFilled() &&
        validate.isRepetePasswordLengthValid() &&
        validate.isRepetePasswordIdenticalToCurrentPassword()
      )
    },

    isRepetePasswordFilled: (): boolean => {
      if (_this.current.repetePassword !== '') {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.fillRepetePassword')
        repetePasswordRef.current?.focus()

        return false
      }
    },

    isRepetePasswordLengthValid: (): boolean => {
      if (_this.current.repetePassword.length > 7) {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.minSize')
        helpers.resetFields()
        return false
      }
    },
    isRepetePasswordIdenticalToCurrentPassword: (): boolean => {
      if (_this.current.currentPassword === _this.current.repetePassword) {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.passwordsMismatch')
        helpers.resetFields()
        return false
      }
    },

    newPassword: (): boolean => {
      return (
        validate.currentPassword() &&
        validate.repetePassword() &&
        validate.isNewPasswordFilled() &&
        validate.isNewPasswordLengthValid()
      )
    },
    isNewPasswordFilled: (): boolean => {
      if (_this.current.newPassword !== '') {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.fillNewPassword')
        newPasswordRef.current?.focus()
        return false
      }
    },
    isNewPasswordLengthValid: (): boolean => {
      if (_this.current.newPassword.length > 7) {
        return true
      } else {
        helpers.popAlert('dropDownAlert.editPassword.minSize')
        newPasswordRef.current?.focus()
        helpers.emptyNewPassword()
        return false
      }
    },
  }

  const helpers = {
    trySendingSavePassworRequest: async (): Promise<void> => {
      const dataToSend = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        phone_number: Defaults.userDetail?.phone_number,
        // eslint-disable-next-line @typescript-eslint/camelcase
        old_password: _this.current.currentPassword,
        // eslint-disable-next-line @typescript-eslint/camelcase
        new_password: _this.current.newPassword,
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
        if (e.status === 401) {
          helpers.popAlert('dropDownAlert.editPassword.passwordNotValid')
        } else {
          helpers.popAlert('dropDownAlert.generalError')
        }
        helpers.resetFields()
      }
    },

    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown.alertWithType(type, t(text))
    },

    resetFields: (): void => {
      helpers.emptyCurrentPassword()
      helpers.emptyRepetePassword()
      helpers.emptyNewPassword()
      currentPasswordRef.current?.focus()
    },

    emptyCurrentPassword: (): void => {
      _this.current.currentPassword = ''
      currentPasswordRef.current?.setNativeProps({
        text: '',
      })
    },

    emptyRepetePassword: (): void => {
      _this.current.repetePassword = ''
      repetePasswordRef.current?.setNativeProps({
        text: '',
      })
    },

    emptyNewPassword: (): void => {
      _this.current.newPassword = ''
      newPasswordRef.current?.setNativeProps({
        text: '',
      })
    },
  }

  return {
    currentPasswordRef,
    repetePasswordRef,
    newPasswordRef,
    currentPassword,
    repetePassword,
    newPassword,
  }
}
