/* eslint-disable @typescript-eslint/camelcase */
import {useRef} from 'react'
import {TextInput} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Ajax, Defaults, Helpers} from 'utils'
import {Navigation} from 'allTypes'

const {Logger} = Helpers
type This = {
  code: string
  phone: string
}

type CodeRefType = {
  startCodeAnimation: () => void
}

export default (navigation: Navigation) => {
  const phoneRef = useRef<TextInput>()
  const codeRef = useRef<TextInput & CodeRefType>()

  const {t} = useTranslation()

  const This = useRef<This>({
    code: '',
    phone: '',
  })

  const onButtonClick = (): void => {
    validation.validatePhoneNumber() &&
      validation.validateCode() &&
      helpers.tryToVerifyCode()
  }

  const phoneNumber = {
    inputSubmit: (): void => {
      validation.validatePhoneNumber()
    },
  }

  const receiveCode = {
    textHandler: (val: string): void => {
      if (val.length > 4) {
        codeRef.current?.setNativeProps({
          text: This.current.code,
        })
        return
      }

      codeRef.current?.setNativeProps({
        text: val,
      })
      This.current.code = val
    },
    receiveHandler: async (): Promise<void> => {
      if (!validation.validatePhoneNumber()) return

      try {
        await Ajax.post('/send-sms-code', {
          phone_number: This.current.phone,
        })

        codeRef.current?.startCodeAnimation()
        helpers.popAlert(
          'dropDownAlert.registration.codeSentSuccessfully',
          'success',
        )
      } catch (e) {
        Logger(e)
        helpers.popAlert('dropDownAlert.generalError', 'error')
      }
    },
  }

  // validation
  const validation = {
    validateCode: (): boolean => {
      if (This.current.code.length === 0) {
        helpers.popAlert('dropDownAlert.forgotPassword.fillCode', 'error')
        return false
      } else if (This.current.code.length !== 4) {
        helpers.popAlert('dropDownAlert.forgotPassword.smsCodeLength', 'error')
        return false
      } else {
        return true
      }
    },

    validatePhoneNumber: (): boolean => {
      return validation.isPhoneNumberGeorgian()
        ? validation.validateOnGeorgianPhoneCode()
        : validation.validateOnForeignPhoneNumber()
    },
    isPhoneNumberGeorgian: (): boolean => {
      return This.current.phone.slice(0, 4) === '+995' ? true : false
    },
    validateOnGeorgianPhoneCode: (): boolean => {
      if (This.current.phone.length < 5) {
        helpers.popAlert('dropDownAlert.registration.fillPhoneNumber', 'error')
        helpers.resetFields()
        return false
      } else if (This.current.phone.length - 4 !== 9) {
        helpers.popAlert('dropDownAlert.auth.phoneNumberLength', 'error')
        helpers.resetFields()
        return false
      } else {
        codeRef.current?.focus()
        return true
      }
    },
    validateOnForeignPhoneNumber: (): boolean => true,
  }

  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown?.alertWithType(type, t(text))
    },
    tryToVerifyCode: async (): Promise<void> => {
      try {
        await Ajax.post('/verify-code-for-password-recovery', {
          phone_number: This.current.phone,
          code: This.current.code,
        })

        navigation.navigate('SetNewPasswords', {
          phone: This.current.phone,
        })
      } catch (e) {
        Logger(e)
        switch (e.status) {
          case 401:
            helpers.popAlert(
              'dropDownAlert.forgotPassword.userNotFound',
              'error',
            )
            return

          case 409:
            helpers.popAlert(
              'dropDownAlert.forgotPassword.userNotFound',
              'error',
            )
            return

          case 440:
            helpers.popAlert(
              'dropDownAlert.forgotPassword.smsCodeExpired',
              'error',
            )
            return
        }
      }
    },
    resetFields: (): void => {
      phoneRef.current?.setNativeProps({
        text: '',
      })
      codeRef.current?.setNativeProps({
        text: '',
      })

      This.current.phone = ''
      This.current.code = ''

      phoneRef.current?.focus()
    },
  }

  // return statement
  return {
    onButtonClick,
    phoneNumber,
    receiveCode,
    phoneRef,
    codeRef,
    This,
  }
}
