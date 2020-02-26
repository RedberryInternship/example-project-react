/* eslint-disable no-unused-vars */
import {useRef, RefObject} from 'react'
import {Defaults} from 'utils'
import {BaseInputRefObject} from 'allTypes'

export default (setActivePage: any, t: any) => {
  const name: BaseInputRefObject = useRef(null)
  const surname: BaseInputRefObject = useRef(null)
  const email: BaseInputRefObject = useRef(null)

  const _this: RefObject<any> = useRef({name: '', surname: '', email: ''})
  const buttonClickHandler = () => {
    const {name: _name, surname: _surname, email: _email} = _this.current

    if (_name === '') {
      Defaults.dropdown?.alertWithType(
        'error',
        t('dropDownAlert.registration.fillName'),
      )
      name.current?.errorText('dropDownAlert.registration.fillName')
      return
    } else if (_surname === '') {
      Defaults.dropdown?.alertWithType(
        'error',
        t('dropDownAlert.registration.fillSurname'),
      )
      surname.current?.errorText('dropDownAlert.registration.fillSurname')

      return
    } else if (_email !== '') {
      const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/
      if (!reg.test(_email)) {
        Defaults.dropdown?.alertWithType(
          'error',
          t('dropDownAlert.registration.incorrectEmail'),
        )
        email.current?.errorText('dropDownAlert.registration.incorrectEmail')
        return
      }
    }

    setActivePage(2)
  }

  return {
    name,
    surname,
    email,
    buttonClickHandler,
    _this,
  }
}
