/* eslint-disable @typescript-eslint/camelcase */

import { Navigation } from 'allTypes'
import { useForm } from 'react-hook-form'
import services from 'services'
import {
  Logger,
  DisplayDropdownWithError,
  DisplayDropdownWithSuccess,
} from 'helpers/inform'

type InputValueTypes = {
  password: string
  repeatPassword: string
}

export default (navigation: Navigation) => {
  const { control, handleSubmit, errors, watch, reset } = useForm({
    validateCriteriaMode: 'all',
    submitFocusError: true,
  })

  const onClickSubmitButton = async ({
    password,
    repeatPassword,
  }: InputValueTypes): Promise<void> => {
    //TODO: need outside component validation
    if (!repeatPassword && !password)
      return DisplayDropdownWithError(
        'dropDownAlert.forgotPassword.passwordsNotFilled',
      )
    else if (password && password.length < 8) {
      return DisplayDropdownWithError(
        'dropDownAlert.forgotPassword.newPasswordIncorrectLength',
      )
    } else if (password !== repeatPassword) {
      return DisplayDropdownWithError(
        'dropDownAlert.registration.passwordNotEqual',
      )
    }
    try {
      await services.resetPassword(navigation.state.params?.phone, password)

      DisplayDropdownWithSuccess(
        'dropDownAlert.forgotPassword.passwordChangedSuccessfully',
      )
      navigation.navigate('Auth')
    } catch (err) {
      Logger(err)
      DisplayDropdownWithError()
      reset()
    }
  }

  return {
    control,
    onClickSubmitButton,
    handleSubmit,
    watch,
    errors,
  }
}
