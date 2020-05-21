/* eslint-disable @typescript-eslint/camelcase */
import {useRef, useEffect, useCallback} from 'react'
import {TextInput} from 'react-native'

import {Helpers, InputValidationHelpers} from 'utils'
import {Navigation, CodeRefType} from 'allTypes'
import {useForm} from 'react-hook-form'
import services from 'services'
import {usePhoneVerification} from 'hooks'

type InputValues = {
  phone: string
  code: string
}

export default (navigation: Navigation) => {
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    errors,
    watch,
    triggerValidation,
  } = useForm({
    validateCriteriaMode: 'all',
    submitFocusError: true,
  })

  const {phoneRef, codeRef, receiveCodeHandler} = usePhoneVerification({
    getValues,
    register,
    errors,
    watch,
    triggerValidation,
  })

  const onButtonClick = async ({phone, code}: InputValues): Promise<void> => {
    try {
      await services.forgotPasswordRecovery(phone, code)

      navigation.navigate('SetNewPasswords', {
        phone,
      })
    } catch (error) {
      Helpers.Logger(error)
      switch (error.status) {
        case 401:
          Helpers.DisplayDropdownWithError(
            'dropDownAlert.forgotPassword.userNotFound',
          )
          break
        case 409:
          Helpers.DisplayDropdownWithError(
            'dropDownAlert.forgotPassword.userNotFound',
          )
          break

        case 440:
          Helpers.DisplayDropdownWithError(
            'dropDownAlert.forgotPassword.smsCodeExpired',
          )
          break
        case 403:
          Helpers.DisplayDropdownWithError(
            'dropDownAlert.forgotPassword.verificationCodeIsIncorrect',
          )
          break
        default:
          Helpers.DisplayDropdownWithError()
          break
      }
      // phoneRef.current?.setNativeProps({
      //   text: '',
      // })
      // codeRef.current?.setNativeProps({
      //   text: '',
      // })
      // reset()
    }
  }

  return {
    phoneRef,
    setValue,
    handleSubmit,
    onButtonClick,
    watch,
    receiveCodeHandler,
    codeRef,
  }
}
