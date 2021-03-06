import { useForm } from 'react-hook-form'
import usePhoneVerification from 'hooks/usePhoneVerification'
import services from 'services'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'utils/inform'
import { useNavigation } from '@react-navigation/native'
import { ForgotPassword } from './types'

export default () => {
  const { navigate } = useNavigation()
  const {
    triggerValidation,
    handleSubmit,
    getValues,
    setValue,
    register,
    errors,
    watch,
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

  /**
   * Try recovering password.
   */
  const onButtonClick: ForgotPassword = async ({ phone, code }) => {
    try {
      await services.forgotPasswordRecovery(phone, code)
      navigate('SetNewPasswords', { phone })
    } catch (error) {
      remoteLogger(error)
      switch (error.status) {
        case 401:
          DisplayDropdownWithError('dropDownAlert.forgotPassword.userNotFound')
          break
        case 409:
          DisplayDropdownWithError('dropDownAlert.forgotPassword.userNotFound')
          break

        case 440:
          DisplayDropdownWithError('dropDownAlert.forgotPassword.smsCodeExpired')
          break
        case 403:
          DisplayDropdownWithError('dropDownAlert.forgotPassword.verificationCodeIsIncorrect')
          break
        default:
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
