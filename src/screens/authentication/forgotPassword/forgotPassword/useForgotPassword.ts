// Vobi Done: remove unused imports
import { Navigation } from 'allTypes'
import services from 'services'
import usePhoneVerification from 'hooks/usePhoneVerification'
import { Logger, DisplayDropdownWithError } from 'helpers/inform'
import { useForm } from 'react-hook-form'

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

  const { phoneRef, codeRef, receiveCodeHandler } = usePhoneVerification({
    getValues,
    register,
    errors,
    watch,
    triggerValidation,
  })

  const onButtonClick = async ({ phone, code }: InputValues): Promise<void> => {
    try {
      await services.forgotPasswordRecovery(phone, code)

      navigation.navigate('SetNewPasswords', {
        phone,
      })
    } catch (error) {
      Logger(error)
      switch (error.status) {
        case 401:
          DisplayDropdownWithError('dropDownAlert.forgotPassword.userNotFound')
          break
        case 409:
          DisplayDropdownWithError('dropDownAlert.forgotPassword.userNotFound')
          break

        case 440:
          DisplayDropdownWithError(
            'dropDownAlert.forgotPassword.smsCodeExpired',
          )
          break
        case 403:
          DisplayDropdownWithError(
            'dropDownAlert.forgotPassword.verificationCodeIsIncorrect',
          )
          break
        default:
          DisplayDropdownWithError()
          break
      }
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
