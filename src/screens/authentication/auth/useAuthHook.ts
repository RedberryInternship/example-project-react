import { useRef, useEffect } from 'react'
import { TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { saveUserAndRefresh } from 'state/actions/userActions'
import { InputValidation } from 'utils'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'utils/inform'
import { Navigation } from 'types'
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
      { validate: InputValidation.phoneNumberValidation },
    )
  }, [])

  useEffect(() => {
    /**
     * Display alerts on errors.
     */
    if (errors.phone) {
      DisplayDropdownWithError('dropDownAlert.error', errors.phone.message)
    } else if (errors.password) {
      DisplayDropdownWithError('dropDownAlert.auth.passwordNotEmpty')
    }
  }, [errors])

  /**
   * Try authenticating user into account.
   */
  const buttonClickHandler: Authenticate = async ({ phone, password }) => {
    try {
      console.log([phone, password])
      const { access_token, user } = await services.loginUser(phone, password)
      dispatch(saveUserAndRefresh(user, access_token))
      navigation.navigate('Home')
    } catch (error) {
      remoteLogger(error)

      /** determine if user is blocked. */
      if (error.status === '406' || error?.data?.status === '406') {
        DisplayDropdownWithError('dropDownAlert.thisUserIsBlocked')
        return
      }

      /** determine if user not found. */
      if (error?.data?.error === 'User Not Found') {
        DisplayDropdownWithError('dropDownAlert.auth.userNotFound')
        return
      }

      /** Alert general error and focus on phone input. */
      DisplayDropdownWithError()
      phoneRef.current?.focus()
    }
  }

  return {
    buttonClickHandler,
    handleSubmit,
    phoneRef,
    control,
    setValue,
    register,
    errors,
    watch,
  }
}
