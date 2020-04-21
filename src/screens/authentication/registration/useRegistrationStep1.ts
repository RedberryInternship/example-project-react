/* eslint-disable @typescript-eslint/camelcase */
import {useForm} from 'react-hook-form'

import {Helpers} from 'utils' // Vobi Todo: only components and classes starts with upper case
import services from 'services'
import {usePhoneVerification} from 'hooks'

type InputValues = {
  phone: string
  code: string
}
export default (setActivePage: (index: number) => void) => {
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

  const {phoneRef, codeRef, receiveCodeHandler} = usePhoneVerification({
    getValues,
    register,
    errors,
    watch,
    triggerValidation,
  })

  const buttonClickHandler = async ({
    phone,
    code,
  }: InputValues): Promise<void> => {
    try {
      const {status} = await services.verifyCodeOnRegistration(phone, code)
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
