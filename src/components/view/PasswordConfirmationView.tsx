import React, {ReactElement, useEffect} from 'react'
import {Controller} from 'react-hook-form'

import {Colors, Helpers} from 'utils'
import BaseInput from 'components/baseUI/BaseInput'
import images from 'assets/images'

type PasswordConfirmationViewProps = {
  errors: Record<string, any>
  watch: (name: string) => string
  control: any
}
const PasswordConfirmationView = ({
  errors,
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
