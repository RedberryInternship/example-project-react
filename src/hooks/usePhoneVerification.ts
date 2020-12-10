import {
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { TextInput } from 'react-native'
import { InputValidation } from 'utils'
import services from 'services'
import {
  DisplayDropdownWithSuccess,
  DisplayDropdownWithError,
  remoteLogger,
} from 'utils/inform'
import { SendSmsCodeStatus } from 'types'

type CodeRefType = {
  startCodeAnimation: () => void
  activateButton: () => void
  disableActivateButton: () => void
  setDisabledInput: (bool: boolean) => void
}

type ForgotPasswordHook = {
  getValues: () => Record<string, any>
  register: (name: any, options: any) => void
  errors: Record<string, any>
  watch: (name: string) => string
  triggerValidation: (name: string) => Promise<boolean>
}

export default (
  {
    triggerValidation,
    getValues,
    register,
    errors,
    watch,
  }: ForgotPasswordHook,
) => {
  const phoneRef = useRef<TextInput>()
  const codeRef = useRef<TextInput & CodeRefType>()

  const phone: string = watch('phone')

  useEffect(() => {
    register({ name: 'phone' }, { validate: InputValidation.phoneNumberValidation })
    register({ name: 'code' }, { validate: InputValidation.codeVerification })
    setTimeout(() => phoneRef.current?.focus(), 500)
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length) {
      DisplayDropdownWithError(errors[Object.keys(errors)?.[0]]?.message)
    }
  }, [errors])

  /**
   * Validate phone and handle 'Receive Code' button.
   */
  const validatePhone = useCallback(async () => {
    const isValid = await triggerValidation('phone')

    if (isValid) {
      codeRef.current?.activateButton()
    } else {
      codeRef.current?.disableActivateButton()
    }
  }, [phone])

  /**
   * Validate phone upon phone number change.
   */
  useEffect(() => {
    validatePhone()
  }, [phone])

  /**
   * Handle 'Receive Code' click.
   */
  const receiveCodeHandler = async (formType: string): Promise<void> => {
    const validationStatus = await triggerValidation('phone')
    if (!validationStatus) {
      return DisplayDropdownWithError('dropDownAlert.registration.fillPhoneNumber')
    }

    try {
      const { phone } = getValues()
      await services.sendSMSCode(phone, formType)

      codeRef.current?.startCodeAnimation()
      codeRef.current?.focus()
      codeRef.current?.setDisabledInput(false)

      DisplayDropdownWithSuccess('dropDownAlert.registration.codeSentSuccessfully')
    } catch (e) {
      remoteLogger(e)
      if (e.data.status === SendSmsCodeStatus.USER_ALREADY_EXISTS) {
        DisplayDropdownWithError('dropDownAlert.error', 'dropDownAlert.registration.alreadyExists')
      } else if (e.data.status === SendSmsCodeStatus.USER_DOES_NOT_EXISTS) {
        DisplayDropdownWithError('dropDownAlert.error', 'dropDownAlert.forgotPassword.doesNotExist')
      } else {
        DisplayDropdownWithError()
      }
    }
  }

  return {
    receiveCodeHandler,
    phoneRef,
    codeRef,
  }
}
