/* eslint-disable @typescript-eslint/camelcase */
import { useRef, useEffect, useCallback } from 'react'
import { TextInput } from 'react-native'

import { Helpers, InputValidationHelpers } from 'utils'
import { CodeRefType, SendSmsCodeStatus } from '../../@types/allTypes.d'
import services from 'services'

type useForgotPasswordProps = {
  getValues: () => Record<string, any>
  register: (name: any, options: any) => void
  errors: Record<string, any>
  watch: (name: string) => string
  triggerValidation: (name: string) => Promise<boolean>
}
export default ({
  getValues,
  register,
  errors,
  watch,
  triggerValidation,
}: useForgotPasswordProps) => {
  const phoneRef = useRef<TextInput>()
  const codeRef = useRef<TextInput & CodeRefType>()

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

  const validatePhone = useCallback(async () => {
    const isValid = await triggerValidation('phone')

    if (isValid) codeRef.current?.activateButton()
    else codeRef.current?.disableActivateButton()
  }, [phone])

  useEffect(() => {
    validatePhone()
  }, [phone])

  const receiveCodeHandler = async (formType: string): Promise<void> => {
    if (!(await triggerValidation('phone')))
      return Helpers.DisplayDropdownWithError(
        'dropDownAlert.registration.fillPhoneNumber',
      )
    try {
      const { phone } = getValues()
      await services.sendSMSCode(phone,formType)

      codeRef.current?.startCodeAnimation()
      codeRef.current?.focus()
      codeRef.current?.setDisabledInput(false)

      Helpers.DisplayDropdownWithSuccess(
        'dropDownAlert.registration.codeSentSuccessfully',
      )
    } catch (e) {
    
      if(e.data.status == SendSmsCodeStatus.USER_ALREADY_EXISTS)
      {
        Helpers.DisplayDropdownWithError(
          'dropDownAlert.error',
          'dropDownAlert.registration.alreadyExists',
        )
      }
      else if(e.data.status == SendSmsCodeStatus.USER_DOES_NOT_EXISTS)
      {
        Helpers.DisplayDropdownWithError(
          'dropDownAlert.error',
          'dropDownAlert.forgotPassword.doesNotExist',
        )
      }
      else
      {
        Helpers.DisplayDropdownWithError()
        Helpers.Logger(e)
      }
    }
  }

  return {
    phoneRef,
    codeRef,
    receiveCodeHandler,
  }
}