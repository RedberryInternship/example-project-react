/* eslint-disable @typescript-eslint/camelcase */

import {Helpers} from 'utils'
import {Navigation} from 'allTypes'
import {useForm} from 'react-hook-form'
import services from 'services'

type InputValueTypes = {
  password: string
  repeatPassword: string
}

export default (navigation: Navigation) => {
  const {control, handleSubmit, errors, watch, reset} = useForm({
    validateCriteriaMode: 'all',
    submitFocusError: true,
  })

  const onClickSubmitButton = async ({
    password,
    repeatPassword,
  }: InputValueTypes): Promise<void> => {
    if (!repeatPassword && !password)
      return Helpers.DisplayDropdownWithError(
        'dropDownAlert.forgotPassword.passwordsNotFilled',
      )
    else if (password && password.length < 8) {
      return Helpers.DisplayDropdownWithError(
        'dropDownAlert.forgotPassword.newPasswordIncorrectLength',
      )
    } else if (password !== repeatPassword) {
      return Helpers.DisplayDropdownWithError(
        'dropDownAlert.registration.passwordNotEqual',
      )
    }
    try {
      await services.resetPassword(navigation.state.params?.phone, password)

      Helpers.DisplayDropdownWithSuccess(
        'dropDownAlert.forgotPassword.passwordChangedSuccessfully',
      )
      navigation.navigate('Auth')
    } catch (err) {
      Helpers.Logger(err)
      Helpers.DisplayDropdownWithError()
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
