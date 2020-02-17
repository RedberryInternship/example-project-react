/* eslint-disable no-unused-vars */
import {useRef, RefObject} from 'react'
import {TextInput} from 'react-native'
import {Defaults, Ajax} from 'utils'
import {useAsyncStorage} from '@react-native-community/async-storage'
import {saveToken, rootAction} from '../../../../src/hooks/actions/rootActions'
import {BaseInputRefObject} from 'allTypes'

type RegisterSuccess = {
  json_status: string
  user: {
    first_name: string
    last_name: string
    phone_number: string
    email: string
    verified: number
    id: number
  }
  token: string
}
type RegisterError = {
  email: Array<String>
  phone_number: Array<String>
}

export default (
  setActivePage: any,
  t: any,
  regStep1: any,
  regStep2: any,
  dispatch: any,
) => {
  const password: BaseInputRefObject = useRef(null)
  const confirmedPassword: BaseInputRefObject = useRef(null)

  const _this: RefObject<any> = useRef({password: '', confirmedPassword: ''})

  const postData = () => {
    let {password: _password} = _this.current
    let {phone} = regStep1._this.current
    let {name, surname, email} = regStep2._this.current

    Ajax.post('/register', {
      first_name: name,
      last_name: surname,
      phone_number: phone,
      email,
      password: _password,
    })
      .then((data: RegisterSuccess) => {
        if (data.json_status === 'Registered') {
          onSuccessRegistration(data)
        }
      })
      .catch(error => {
        if (typeof error.data === 'string') {
          let data: RegisterError = JSON.parse(error.data)

          if (Object.prototype.hasOwnProperty.call(data, 'email')) {
            if (data.email[0] == 'The email has already been taken.') {
              Defaults.dropdown.alertWithType(
                'error',
                t('dropDownAlert.registration.emailAlreadyToken'),
              )

              regStep2.email.current.errorText(
                'dropDownAlert.registration.emailAlreadyToken',
              )
              setActivePage(1)
            } else {
              Defaults.dropdown.alertWithType(
                'error',
                t('dropDownAlert.generalError'),
              )
            }
          } else if (
            Object.prototype.hasOwnProperty.call(data, 'phone_number')
          ) {
            if (
              data.phone_number[0] == 'The phone number has already been taken.'
            ) {
              Defaults.dropdown.alertWithType(
                'error',
                t('dropDownAlert.registration.phoneAlreadyToken'),
              )
              regStep1.phone.current.errorText(
                'dropDownAlert.registration.emailAlreadyToken',
              )
              setActivePage(0)
            } else {
              Defaults.dropdown.alertWithType(
                'error',
                t('dropDownAlert.generalError'),
              )
            }
          } else {
            Defaults.dropdown.alertWithType(
              'error',
              t('dropDownAlert.generalError'),
            )
          }
        } else {
          Defaults.dropdown.alertWithType(
            'error',
            t('dropDownAlert.generalError'),
          )
        }
      })
  }

  const onSuccessRegistration = async (data: any) => {
    rootAction(data, dispatch)
    setActivePage(3)
  }

  const buttonClickHandler = () => {
    let {
      password: _password,
      confirmedPassword: _confirmedPassword,
    } = _this.current

    console.log(_password, _confirmedPassword, 'password, confirmedPassword,')

    if (_password != _confirmedPassword) {
      Defaults.dropdown.alertWithType('error', 'dropDownAlert.passwordNotEqual')
    } else if (_password.length < 8) {
      Defaults.dropdown.alertWithType(
        'error',
        'dropDownAlert.minPasswordTextLength',
      )
    } else postData()
  }

  return {
    buttonClickHandler,
    _this,
    password,
    confirmedPassword,
  }
}
