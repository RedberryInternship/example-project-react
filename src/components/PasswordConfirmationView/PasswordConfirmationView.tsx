import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Colors } from 'utils'
import { DisplayDropdownWithError } from 'utils/inform'
import BaseInput from 'components/BaseInput'
import PasswordRulesLabel from 'components/PasswordRulesLabel'
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
        image={images.password}
        imageStyle={{ tintColor: Colors.primaryBlue }}
        testID="PasswordInput"
        secure
        title="authentication.registration.password"
      />
      <PasswordRulesLabel />
      <Controller
        as={BaseInput}
        name="repeatPassword"
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.password}
        imageStyle={{ tintColor: Colors.primaryBlue }}
        returnKeyType="send"
        testID="RepeatPasswordInput"
        secure
        title="authentication.registration.repeatPassword"
      />
    </>
  )
}

export default PasswordConfirmationView
