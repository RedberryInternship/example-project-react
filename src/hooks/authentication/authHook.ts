/* eslint-disable @typescript-eslint/camelcase */
import {useRef} from 'react'
import {TextInput} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Ajax, Helpers, Defaults} from 'utils'
import {rootAction} from 'hooks/actions/rootActions'
import {Navigation} from 'allTypes'

type This = {
  password: string
  phone: string
}

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

const {Logger} = Helpers

export default (navigation: Navigation, dispatch: any) => {
  const phoneRef = useRef<TextInput>()
  const passwordRef = useRef<TextInput>()
  const _this = useRef<This>({password: '', phone: ''})
  const {t} = useTranslation()

  const buttonClickHandler = (): void => {
    phoneNumber.inputSubmit() &&
      password.inputSubmit() &&
      helpers.tryToFetchUserDataAndAttemptLogin()
  }

  const phoneNumber = {
    textHandler: (val: string): void => {
      _this.current.phone = val
    },
    inputSubmit: (): boolean => {
      if (validate.isSelectedCountryCodeGeorgian()) {
        const isPhoneValidationSuccessful = validate.validateOnGeorgianPhoneCode()

        if (isPhoneValidationSuccessful) {
          passwordRef?.current?.focus()
          return true
        }

        phoneRef?.current?.focus()
        return false
      } else {
        passwordRef?.current?.focus()
        return true
      }
    },
  }

  const password = {
    inputSubmit: (): boolean => {
      if (_this.current.password === '') {
        helpers.popAlert('dropDownAlert.auth.passwordNotEmpty', 'error')
        return false
      } else {
        return true
      }
    },
    textHandler: (val: string): void => {
      _this.current.password = val
    },
  }

  const helpers = {
    tryToFetchUserDataAndAttemptLogin: async (): Promise<void> => {
      try {
        const userData = await Ajax.post('/login', {
          phone_number: _this.current.phone,
          password: _this.current.password,
        })

        helpers.onSuccessLogin(userData)
      } catch (e) {
        Logger(e)
        helpers.popAlert('dropDownAlert.auth.userNotFound', 'error')
        helpers.resetFields()
      }
    },
    onSuccessLogin: async (data: UserDataType): Promise<void> => {
      rootAction(
        {
          token: data.access_token,
          user: data.user,
        },
        dispatch,
      )

      navigation.navigate('MainDrawer')
    },
    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown?.alertWithType(type, t(text))
    },
    resetFields: (): void => {
      phoneRef.current?.setNativeProps({
        text: '',
      })
      passwordRef.current?.setNativeProps({
        text: '',
      })
      _this.current.phone = ''
      _this.current.password = ''
      phoneRef.current?.focus()
    },
  }

  // Validate
  const validate = {
    validateOnGeorgianPhoneCode: (): boolean => {
      if (_this.current.phone.length < 5) {
        helpers.popAlert('dropDownAlert.registration.fillPhoneNumber', 'error')
        return false
      } else if (_this.current.phone.length - 4 !== 9) {
        helpers.popAlert('dropDownAlert.auth.phoneNumberLength', 'error')
        return false
      } else {
        return true
      }
    },

    isSelectedCountryCodeGeorgian: (): boolean => {
      return _this.current.phone.slice(0, 4) === '+995'
    },
  }

  return {
    buttonClickHandler,
    phoneNumber,
    password,
    phoneRef,
    passwordRef,
    _this,
  }
}
