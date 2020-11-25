import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  refreshFavoriteChargers,
  saveUserAndRefresh,
  refreshUserData,
} from 'state/actions/userActions'
import services from 'services'
import { RegisterResponseType } from 'allTypes'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'
import {
  saveJWTTokenAndUserData,
} from 'helpers/user'
import { InputValidationHelpers } from 'utils'

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
) => {
  const dispatch = useDispatch()

  const {
    triggerValidation,
    handleSubmit,
    setValue,
    register,
    control,
    errors,
    watch,
    reset,
  } = useForm({ validateCriteriaMode: 'all' })

  useEffect(() => {
    if (Object.keys(errors).length) {
      DisplayDropdownWithError(errors[Object.keys(errors)?.[0]]?.message)
    }
  }, [errors])

  useEffect(() => {
    register(
      { name: 'termsAndConditions' },
      { validate: InputValidationHelpers.checkboxValidation },
    )
  }, [])

  const buttonClickHandler = async ({ password, repeatPassword }: InputValueTypes)
    : Promise<void> => {
    // TODO: need outside component validation
    if (!repeatPassword && !password) {
      return DisplayDropdownWithError('dropDownAlert.forgotPassword.passwordsNotFilled')
    }

    if (password && password.length < 8) {
      return DisplayDropdownWithError('dropDownAlert.forgotPassword.newPasswordIncorrectLength')
    }

    if (password !== repeatPassword) {
      return DisplayDropdownWithError('dropDownAlert.registration.passwordNotEqual')
    }

    const { phone: phone_number } = getValues1()
    const { name: first_name, surname: last_name, email } = getValues2()

    try {
      const { user, token } = await services.register({
        first_name,
        last_name,
        phone_number,
        email,
        password,
      })
      onSuccessRegistration({ user, token })
    } catch (error) {
      remoteLogger(error)
      if (typeof error.data === 'string') {
        const data: RegisterError = JSON.parse(error.data)

        if (Object.prototype.hasOwnProperty.call(data, 'email')) {
          // Vobi Todo: can't you do if(data.email)
          if (data.email[0] === 'The email has already been taken.') {
            DisplayDropdownWithError('dropDownAlert.registration.emailAlreadyToken')
            setActivePage(1)
          } else {
            DisplayDropdownWithError()
          }
        } else if (Object.prototype.hasOwnProperty.call(data, 'phone_number')) {
          // Vobi Todo: can't you do if(data.phone_number)
          if (data.phone_number[0] === 'The phone number has already been taken.') {
            DisplayDropdownWithError('dropDownAlert.registration.emailAlreadyToken')
            setActivePage(0)
          } else {
            DisplayDropdownWithError()
          }
        } else {
          DisplayDropdownWithError()
        }
      } else {
        DisplayDropdownWithError()
      }
    }
  }
  // Vobi Todo:
  // catch (error) {
  //   if (typeof error.data === 'string') {
  //     const data: RegisterError = JSON.parse(error.data)

  //     if (Object.prototype.hasOwnProperty.call(data, 'email')
  //          && data.email[0] == 'The email has already been taken.') {
  //           Vobi Todo: can't you do if(data.email)
  //       // Vobi Todo: move this error constant and use strict equality
  //         Helpers.DisplayDropdownWithError('dropDownAlert.registration.emailAlreadyToken')
  //         return setActivePage(1)
  //     } else if (Object.prototype.hasOwnProperty.call(data, 'phone_number')
  //                  && data.phone_number[0] == 'The phone number has already been taken.') {
  //              Vobi Todo: can't you do if(data.phone_number)
  //       // Vobi Todo: move this error constant and use strict equality
  //         Helpers.DisplayDropdownWithError('dropDownAlert.registration.emailAlreadyToken')
  //         return setActivePage(0)
  //     }
  //   }
  //   Helpers.DisplayDropdownWithError()
  // }

  const onSuccessRegistration = (data: RegisterResponseType) => {
    saveUserAndRefresh(data.user, data.token)
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
    setValue,
  }
}
