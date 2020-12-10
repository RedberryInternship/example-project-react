import { useForm } from 'react-hook-form'
import services from 'services'
import usePhoneVerification from 'hooks/usePhoneVerification'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'utils/inform'
import { EnterPhoneAndCode } from './types'

/**
 * Registration first step hook.
 */
export default (setActivePage: (index: number) => void) => {
  const {
    triggerValidation,
    handleSubmit,
    getValues,
    setValue,
    register,
    errors,
    watch,
    reset,
  } = useForm(
    {
      validateCriteriaMode: 'all',
      submitFocusError: true,
    },
  )

  const {
    receiveCodeHandler,
    phoneRef,
    codeRef,
  } = usePhoneVerification({
    getValues,
    register,
    errors,
    watch,
    triggerValidation,
  })

  /**
   * Verify code and go to next page.
   */
  const buttonClickHandler: EnterPhoneAndCode = async ({ phone, code }) => {
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
    buttonClickHandler,
    receiveCodeHandler,
    triggerValidation,
    handleSubmit,
    getValues,
    register,
    setValue,
    phoneRef,
    codeRef,
    errors,
    watch,
    reset,
  }
}
