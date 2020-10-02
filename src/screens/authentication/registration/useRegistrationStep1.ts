/* eslint-disable @typescript-eslint/camelcase */
import { useForm } from 'react-hook-form'
import services from 'services'
import usePhoneVerification from 'hooks/usePhoneVerification'
import { remoteLogger, DisplayDropdownWithError } from 'helpers/inform'

type InputValues = {
  phone: string
  code: string
}
export default (setActivePage: (index: number) => void) => {
  const { setValue, getValues, register, handleSubmit, errors, watch, reset, triggerValidation } = useForm({
    validateCriteriaMode: 'all',
    submitFocusError: true,
  })

  const { phoneRef, codeRef, receiveCodeHandler } = usePhoneVerification({
    getValues,
    register,
    errors,
    watch,
    triggerValidation,
  })

  const buttonClickHandler = async ({ phone, code }: InputValues): Promise<void> => {
    try {
      await services.verifyCodeOnRegistration(phone, code)
      setActivePage(1)
    } catch (error) {
      remoteLogger(error)
      if (error.data?.error?.verified === false) {
        DisplayDropdownWithError('dropDownAlert.registration.incorrectCode')
      } else if (error.data.status === 409) {
        DisplayDropdownWithError('dropDownAlert.registration.phoneAlreadyToken')
      } else {
        DisplayDropdownWithError()
      }
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
