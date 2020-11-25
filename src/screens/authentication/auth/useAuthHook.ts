import { useRef, useEffect } from 'react'
import { TextInput } from 'react-native'
import { useForm } from 'react-hook-form'
import { saveUserAndRefresh } from 'state/actions/userActions'
import { InputValidationHelpers } from 'utils'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'
import { Navigation } from 'allTypes'
import services from 'services'

type InputValues = {
  phone: string
  password: string
}

export default (navigation: Navigation, dispatch: any) => {
  const phoneRef = useRef<TextInput>()

  const {
    control, setValue, register, handleSubmit, errors, watch,
  } = useForm({
    validateCriteriaMode: 'all',
  })

  useEffect(() => {
    register({ name: 'phone' }, { validate: InputValidationHelpers.phoneNumberValidation })
  }, [])

  useEffect(() => {
    if (errors.phone) DisplayDropdownWithError('dropDownAlert.error', errors.phone.message)
    else if (errors.password) DisplayDropdownWithError('dropDownAlert.auth.passwordNotEmpty')
  }, [errors])

  const buttonClickHandler = async ({ phone, password }: InputValues): Promise<void> => {
    try {
      const { access_token, user } = await services.loginUser(phone, password)

      dispatch(saveUserAndRefresh(user, access_token))

      navigation.navigate('Home')
    } catch (error) {
      remoteLogger(error)
      if (error.status === '406' || error?.data?.status === '406') {
        DisplayDropdownWithError('dropDownAlert.thisUserIsBlocked')
      }
      if (error?.data?.error === 'User Not Found') {
        DisplayDropdownWithError('dropDownAlert.auth.userNotFound')
      }
      DisplayDropdownWithError()
      phoneRef.current?.focus()
    }
  }

  return {
    buttonClickHandler,
    phoneRef,
    control,
    setValue,
    register,
    handleSubmit,
    errors,
    watch,
  }
}
