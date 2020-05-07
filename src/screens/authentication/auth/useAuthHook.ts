/* eslint-disable @typescript-eslint/camelcase */
import {useRef, useEffect} from 'react'
import {TextInput} from 'react-native'
import {useForm} from 'react-hook-form'

import {Helpers, InputValidationHelpers} from 'utils'
import {rootAction} from 'hooks/actions/rootActions'
import {Navigation} from 'allTypes'
import services from 'services'

type User = {
  id: number
  old_id: number | string
  role: number
  phone_number: string
  first_name: string
  last_name: string
  email: string
  active: number
  verified: number
  email_verified_at: string
  temp_password: string
  created_at: Date
  updated_at: Date
}

type UserDataType = {
  access_token: string
  user: User
  token_type: string
  expires_in: number
}

type InputValues = {
  phone: string
  password: string
}

export default (navigation: Navigation, dispatch: any) => {
  const phoneRef = useRef<TextInput>()

  const {control, setValue, register, handleSubmit, errors, watch} = useForm({
    validateCriteriaMode: 'all',
  })

  useEffect(() => {
    register(
      {name: 'phone'},
      {validate: InputValidationHelpers.phoneNumberValidation},
    )
  }, [])

  useEffect(() => {
    if (errors.phone)
      Helpers.DisplayDropdownWithError(
        'dropDownAlert.error',
        errors.phone.message,
      )
    else if (errors.password)
      Helpers.DisplayDropdownWithError('dropDownAlert.auth.passwordNotEmpty')
  }, [errors])

  const buttonClickHandler = async ({
    phone,
    password,
  }: InputValues): Promise<void> => {
    try {
      const {access_token, user}: UserDataType = await services.loginUser(
        phone,
        password,
      )
      rootAction(
        {
          token: access_token,
          user: user,
        },
        dispatch,
      )
      navigation.navigate('Home')
    } catch (error) {
      if (error?.data?.error === 'User Not Found') {
        Helpers.DisplayDropdownWithError('dropDownAlert.auth.userNotFound')
      }
      Helpers.DisplayDropdownWithError()
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
