/* eslint-disable @typescript-eslint/camelcase */
import {useRef, useEffect} from 'react'
import {TextInput} from 'react-native'

import {Helpers, InputValidationHelpers} from 'utils'
import {Navigation} from 'allTypes'
import {useForm} from 'react-hook-form'
import services from 'services'

type CodeRefType = {
  startCodeAnimation: () => void
  activateButton: () => void
  disableActivateButton: () => void
  setDisabledInput: (bool: boolean) => void
}

type InputValues = {
  phone: string
  code: string
}

export default (navigation: Navigation) => {
  const phoneRef = useRef<TextInput>()
  const codeRef = useRef<TextInput & CodeRefType>()

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    triggerValidation,
  } = useForm({
    validateCriteriaMode: 'all',
    submitFocusError: true,
  })

  const phone: string = watch('phone')

  useEffect(() => {
    register(
      {name: 'phone'},
      {validate: InputValidationHelpers.phoneNumberValidation},
    )
    register(
      {name: 'code'},
      {validate: InputValidationHelpers.codeVerification},
    )
    setTimeout(() => phoneRef.current?.focus(), 500)
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length)
      Helpers.DisplayDropdownWithError(
        errors[Object.keys(errors)?.[0]]?.message,
      )
  }, [errors])

  useEffect(() => {
    /**
     * redberry: the worst way to handle change, but no other way
     * why not async? because useEffect callback can't be async function
     * and this is little function and so let left this way
     */
    triggerValidation('phone').then((status: boolean) =>
      status
        ? codeRef.current?.activateButton()
        : codeRef.current?.disableActivateButton(),
    )
  }, [phone])

  const receiveCodeHandler = async (): Promise<void> => {
    if (!(await triggerValidation('phone')))
      return Helpers.DisplayDropdownWithError(
        'dropDownAlert.registration.fillPhoneNumber',
      )
    try {
      const {phone} = getValues()
      await services.sendSMSCode(phone)

      codeRef.current?.startCodeAnimation()
      codeRef.current?.focus()
      codeRef.current?.setDisabledInput(false)

      Helpers.DisplayDropdownWithSuccess(
        'dropDownAlert.registration.codeSentSuccessfully',
      )
    } catch (e) {
      Helpers.Logger(e)
      Helpers.DisplayDropdownWithError()
    }
  }

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
        default:
          Helpers.DisplayDropdownWithError()
          break
      }
      phoneRef.current?.setNativeProps({
        text: '',
      })
      codeRef.current?.setNativeProps({
        text: '',
      })
      reset()
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
