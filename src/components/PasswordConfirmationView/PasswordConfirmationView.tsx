import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Colors } from 'utils'
import { DisplayDropdownWithError } from 'helpers/inform'
import { BaseInput } from 'components'
import images from 'assets/images'
import { PasswordConfirmationViewFC } from './types'

const PasswordConfirmationView: PasswordConfirmationViewFC = (
  {
    errors,
    control,
  },
) => {
  useEffect(() => {
    if (Object.keys(errors).length) {
      DisplayDropdownWithError(errors[Object.keys(errors)?.[0]]?.message)
    }
  }, [errors])

  return (
    <>
      <Controller
        as={BaseInput}
        name="password"
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.lock}
        imageStyle={{ tintColor: Colors.primaryBlue }}
        testID="passwordInput"
        secure
        title="authentication.registration.password"
      />
      <Controller
        as={BaseInput}
        name="repeatPassword"
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.lock}
        imageStyle={{ tintColor: Colors.primaryBlue }}
        returnKeyType="send"
        testID="RepeatpasswordInput"
        secure
        title="authentication.registration.repeatPassword"
      />
    </>
  )
}

export default PasswordConfirmationView
