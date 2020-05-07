import React, {ReactElement, useEffect} from 'react'
import {Controller} from 'react-hook-form'

import {Colors, InputValidationHelpers, Helpers} from 'utils'
import {BaseInput} from 'components'
import images from 'assets/images'

type PasswordConfirmationViewProps = {
  errors: Record<string, any>
  watch: (name: string) => string
  control: any
}
const PasswordConfirmationView = ({
  errors,
  watch,
  control,
}: PasswordConfirmationViewProps): ReactElement => {
  useEffect(() => {
    if (Object.keys(errors).length)
      Helpers.DisplayDropdownWithError(
        errors[Object.keys(errors)?.[0]]?.message,
      )
  }, [errors])

  return (
    <>
      <Controller
        as={BaseInput}
        name="password"
        // rules={{
        //   validate: InputValidationHelpers.passwordConfirmValidation(
        //     watch('repeatPassword'),
        //   ),
        // }}
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.lock}
        imageStyle={{tintColor: Colors.primaryBlue}}
        testID={'passwordInput'}
        secure={true}
        title={'authentication.registration.password'}
      />
      <Controller
        as={BaseInput}
        name="repeatPassword"
        // rules={{
        //   validate: InputValidationHelpers.passwordConfirmValidation(
        //     watch('password'),
        //   ),
        // }}
        control={control}
        onChange={(args) => args[0].nativeEvent.text}
        image={images.lock}
        imageStyle={{tintColor: Colors.primaryBlue}}
        returnKeyType={'send'}
        testID={'RepeatpasswordInput'}
        secure={true}
        title={'authentication.registration.repeatPassword'}
      />
    </>
  )
}

export default PasswordConfirmationView
