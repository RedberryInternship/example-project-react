import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { saveUserAndRefresh } from 'state/actions/userActions'
import services from 'services'
import { RegisterResponseType } from 'allTypes'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'
import { InputValidationHelpers } from 'utils'
import { RegisterError, RepeatPassword } from './types'

/**
 * Registration third step hook.
 */
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
    /**
     * Display react-hook-form error.
     */
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

  /**
   * Repeat password, validate and go to next page.
   */
  const buttonClickHandler: RepeatPassword = async ({ password, repeatPassword }) => {
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

        if (data.email && isEmailAlreadyTaken(data.email)) {
          DisplayDropdownWithError('dropDownAlert.registration.emailAlreadyToken')
          setActivePage(1)
        } else if (data.phone_number && isPhoneNumberAlreadyTaken(data.phone_number)) {
          DisplayDropdownWithError('dropDownAlert.registration.emailAlreadyToken')
          setActivePage(0)
        } else {
          DisplayDropdownWithError()
        }
      } else {
        DisplayDropdownWithError()
      }
    }
  }

  /**
   * Determine if email is already taken.
   */
  const isEmailAlreadyTaken = (error: string[]) => error[0] === 'The email has already been taken.'

  /**
   * Determine if phone number is already taken.
   */
  const isPhoneNumberAlreadyTaken = (
    error: string[],
  ) => error[0] === 'The phone number has already been taken.'

  /**
   * Upon successful registration save user data
   * in state and go to next page.
   */
  const onSuccessRegistration = (data: RegisterResponseType) => {
    dispatch(saveUserAndRefresh(data.user, data.token))
    setActivePage(3)
  }

  return {
    buttonClickHandler,
    triggerValidation,
    handleSubmit,
    setValue,
    control,
    errors,
    watch,
    reset,
  }
}
