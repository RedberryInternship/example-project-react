/* eslint-disable @typescript-eslint/camelcase */
import {useEffect} from 'react'

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

  useEffect(() => {
    if (Object.keys(errors).length)
      Helpers.DisplayDropdownWithError(
        errors[Object.keys(errors)?.[0]]?.message,
      )
  }, [errors])

  const onClickSubmitButton = async ({
    password,
  }: InputValueTypes): Promise<void> => {
    try {
      const {json_status} = await services.resetPassword(
        navigation.state.params?.phone,
        password,
      )

      if (json_status === 'Password Changed') {
        Helpers.DisplayDropdownWithSuccess(
          'dropDownAlert.forgotPassword.passwordChangedSuccessfully',
        )
        navigation.navigate('Auth')
      } else {
        throw new Error()
      }
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
  }
}
