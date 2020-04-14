/* eslint-disable @typescript-eslint/camelcase */
import { useRef, RefObject, useEffect } from 'react'
import { TextInput } from 'react-native'
import { useForm } from 'react-hook-form'

import { Helpers, InputValidationHelpers } from 'utils' // Vobi Todo: only components and classes starts with upper case
import { CodeRefType } from 'allTypes'
import services from 'services'

type InputValues = {
  phone: string
  code: string
}
export default (setActivePage: (index: number) => void) => {
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
      { name: 'phone' },
      { validate: InputValidationHelpers.phoneNumberValidation },
    )
    register(
      { name: 'code' },
      { validate: InputValidationHelpers.codeVerification },
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
      const { phone } = getValues()
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

  const buttonClickHandler = async ({
    phone,
    code,
  }: InputValues): Promise<void> => {
    try {
      const { status } = await services.verifyCodeOnRegistration(phone, code)
      if (status == 200) {
        setActivePage(1)
      }
    } catch (error) {
      Helpers.Logger(error)
      if (error.data.status === 401) {
        Helpers.DisplayDropdownWithError(
          'dropDownAlert.registration.incorrectCode',
        )
      } else if (error.data.status === 409) {
        Helpers.DisplayDropdownWithError(
          'dropDownAlert.registration.phoneAlreadyToken',
        )
      } else {
        Helpers.DisplayDropdownWithError()
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
    codeRef,
    buttonClickHandler,
    setValue,
    getValues,
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    triggerValidation,
    receiveCodeHandler,
  }
}
