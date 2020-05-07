/* eslint-disable @typescript-eslint/camelcase */
import {useRef, useEffect} from 'react'

import {Helpers} from 'utils'
import {rootAction} from 'hooks/actions/rootActions'
import {BaseInputRefObject} from 'allTypes'
import {useForm} from 'react-hook-form'
import services from 'services'

type RegisterError = {
  email: Array<string>
  phone_number: Array<string>
}

type InputValueTypes = {
  password: string
  repeatPassword: string
}

export default (
  setActivePage: (index: number) => void,
  getValues1: () => Record<string, string>,
  getValues2: () => Record<string, string>,
  dispatch: (arg0: Function) => void,
) => {
  const {
    control,
    handleSubmit,
    errors,
    watch,
    reset,
    triggerValidation,
  } = useForm({
    validateCriteriaMode: 'all',
  })

  useEffect(() => {
    if (Object.keys(errors).length)
      Helpers.DisplayDropdownWithError(
        errors[Object.keys(errors)?.[0]]?.message,
      )
  }, [errors])

  const buttonClickHandler = async ({
    password,
    repeatPassword,
  }: InputValueTypes): Promise<void> => {
    //TODO: need outside component validation
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

    const {phone: phone_number} = getValues1()
    const {name: first_name, surname: last_name, email} = getValues2()

    try {
      const data = await services.register({
        first_name,
        last_name,
        phone_number,
        email,
        password,
      })
      onSuccessRegistration(data)
    } catch (error) {
      if (typeof error.data === 'string') {
        const data: RegisterError = JSON.parse(error.data)

        if (Object.prototype.hasOwnProperty.call(data, 'email')) {
          if (data.email[0] == 'The email has already been taken.') {
            Helpers.DisplayDropdownWithError(
              'dropDownAlert.registration.emailAlreadyToken',
            )
            setActivePage(1)
          } else {
            Helpers.DisplayDropdownWithError()
          }
        } else if (Object.prototype.hasOwnProperty.call(data, 'phone_number')) {
          if (
            data.phone_number[0] == 'The phone number has already been taken.'
          ) {
            Helpers.DisplayDropdownWithError(
              'dropDownAlert.registration.emailAlreadyToken',
            )
            setActivePage(0)
          } else {
            Helpers.DisplayDropdownWithError()
          }
        } else {
          Helpers.DisplayDropdownWithError()
        }
      } else {
        Helpers.DisplayDropdownWithError()
      }
    }
  }

  const onSuccessRegistration = async (data: any) => {
    rootAction(data, dispatch)
    setActivePage(3)
  }

  return {
    buttonClickHandler,
    control,
    handleSubmit,
    errors,
    watch,
    reset,
    triggerValidation,
  }
}
