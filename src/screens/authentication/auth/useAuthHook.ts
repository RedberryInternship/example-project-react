import { useRef, useEffect } from 'react'
import { TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { saveUserAndRefresh } from 'state/actions/userActions'
import { InputValidationHelpers } from 'utils'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'
import { Navigation } from 'allTypes'
import services from 'services'
import { Authenticate } from './types'

/**
 * Authorization hook.
 */
export default (navigation: Navigation) => {
  const dispatch = useDispatch()
  const phoneRef = useRef<TextInput>()

  const {
    handleSubmit,
    setValue,
    register,
    control,
    errors,
    watch,
  } = useForm({ validateCriteriaMode: 'all' })

  useEffect(() => {
    register(
      { name: 'phone' },
      { validate: InputValidationHelpers.phoneNumberValidation }
    )
  }, [])

  useEffect(() => {
    /**
     * Display alerts on errors.
     */

    if (errors.phone) {
      DisplayDropdownWithError('dropDownAlert.error', errors.phone.message)
    }

    else if (errors.password) {
      DisplayDropdownWithError('dropDownAlert.auth.passwordNotEmpty')
    }
  }, [errors])

  /**
   * Try authenticating user into account.
   */
  const buttonClickHandler: Authenticate = async ({ phone, password }) => {
    try {
      const { access_token, user } = await services.loginUser(phone, password)
      dispatch(saveUserAndRefresh(user, access_token))
      navigation.navigate('Home')
    } catch (error) {
      remoteLogger(error)

      /** determine if user is blocked. */
      if (error.status === '406' || error?.data?.status === '406') {
        DisplayDropdownWithError('dropDownAlert.thisUserIsBlocked')
      }

      /** determine if user not found. */
      if (error?.data?.error === 'User Not Found') {
        DisplayDropdownWithError('dropDownAlert.auth.userNotFound')
      }

      /** Alert general error and focus on phone input. */
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
