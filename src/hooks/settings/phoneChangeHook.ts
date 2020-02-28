/* eslint-disable @typescript-eslint/camelcase */
import {useRef, useEffect, useContext} from 'react'
import {TextInput} from 'react-native'
import {useTranslation} from 'react-i18next'

// utils
import {Defaults, Ajax, apiServices, Helpers} from 'utils'

import {AppContext} from '../../../App'
import {editUserInfo} from 'hooks/actions/rootActions'
import {ProfileFieldChange} from 'allTypes'

type ThisType = {
  phone: string
  code: string
}

type ReceiveCodeType = {
  activateButton: () => void
  startCodeAnimation: () => void
} & TextInput

const {Logger} = Helpers

export default ({navigation, clicked, setClicked}: ProfileFieldChange) => {
  const {t} = useTranslation()
  const {dispatch} = useContext(AppContext)
  const phoneInputRef = useRef<TextInput>()
  const codeRef = useRef<ReceiveCodeType>()
  const This = useRef<ThisType>({
    phone: navigation.getParam('value', ''),
    code: '',
  })

  useEffect(() => {
    phoneInputRef?.current?.setNativeProps({
      text: navigation.getParam('value').slice(4),
    })
    codeRef.current?.activateButton()
    setTimeout(() => phoneInputRef.current?.focus(), 500)
  }, [])

  useEffect(() => {
    if (clicked === true) {
      savePhoneNumber()
      setClicked(false)
    }
  }, [clicked])

  const savePhoneNumber = (): void => {
    validate.isCodeValid() && helpers.tryVerifyingSmsCodeWithUpdateUserPhone()
  }

  const phoneNumber = {
    onSubmit: (): void => {
      savePhoneNumber()
    },
  }

  const receiveCode = {
    receiveCode: (): void => {
      if (validate.isPhoneNumberValid()) {
        helpers.tryRequestingSmsCode()
      }
    },
    onSubmit: (): void => {
      receiveCode.receiveCode()
    },
    textHandler: (text: string): void => {
      if (text.length > 4) {
        codeRef.current?.setNativeProps({
          text: This.current.code,
        })
        return
      }
      This.current.code = text.trim()
    },
  }

  const validate = {
    isPhoneNumberValid: (): boolean => {
      if (validate.isPhoneEmpty()) {
        return false
      }

      if (validate.isPhoneNumberGeorgian()) {
        return validate.isGeorgianPhoneNumberValid()
      } else {
        return true
      }
    },

    isPhoneEmpty: (): boolean => {
      return This.current.phone.trim() === ''
    },

    isGeorgianPhoneNumberValid: (): boolean => {
      if (This.current?.phone.length < 5) {
        helpers.popAlert('dropDownAlert.registration.fillPhoneNumber')
        return false
      } else if (This.current?.phone.length - 4 !== 9) {
        helpers.popAlert('dropDownAlert.auth.phoneNumberLength')
        return false
      } else {
        return true
      }
    },
    isPhoneNumberGeorgian: (): boolean => {
      return This.current.phone.slice(0, 4) === '+995'
    },
    isCodeValid: (): boolean => {
      if (This.current.code.length === 0) {
        helpers.popAlert('dropDownAlert.forgotPassword.fillCode')
        codeRef.current?.focus()
        return false
      } else if (This.current.code.length !== 4) {
        helpers.popAlert('dropDownAlert.forgotPassword.smsCodeLength')
        codeRef.current?.focus()
        return false
      }

      return true
    },
  }

  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error'): void => {
      Defaults.dropdown?.alertWithType(type, t(text))
    },
    tryRequestingSmsCode: async (): Promise<void> => {
      try {
        const dataToSend = {phone_number: This.current.phone}

        const result = await Ajax.post(
          apiServices.post_send_sms_code,
          dataToSend,
        )

        if (result) {
          helpers.popAlert(
            'dropDownAlert.registration.codeSentSuccessfully',
            'success',
          )
          codeRef.current?.startCodeAnimation()
          codeRef.current?.focus()
        }
      } catch (e) {
        Logger(e)
        helpers.popAlert('dropDownAlert.generalError')
      }
    },

    tryVerifyingSmsCodeWithUpdateUserPhone: async (): Promise<void> => {
      try {
        const dataToSend = {
          phone_number: This.current.phone,
          code: This.current.code,
        }

        const result = await Ajax.post(apiServices.post_verify_code, dataToSend)

        if (result.status === 200) {
          helpers.updateUserInfo()
        } else {
          throw new Error()
        }
      } catch (e) {
        Logger(e)
        switch (e.status) {
          case 401:
            helpers.popAlert('dropDownAlert.registration.incorrectCode')
            return

          case 409:
            helpers.popAlert('dropDownAlert.editPhoneNumber.phoneTaken')
            return

          case 440:
            helpers.popAlert('dropDownAlert.forgotPassword.smsCodeExpired')
            return

          default:
            helpers.popAlert('dropDownAlert.generalError')
        }
      }
    },

    updateUserInfo: async (): Promise<void> => {
      try {
        const dataToSend = {
          phone_number: This.current.phone,
        }
        const result = await Ajax.post(
          apiServices.post_update_user_info,
          dataToSend,
        )

        if (result.updated) {
          helpers.popAlert('dropDownAlert.editPhoneNumber.success', 'success')
          editUserInfo(dispatch, This.current.phone, 'phone_number')
          navigation.goBack()
        } else {
          throw new Error()
        }
      } catch (e) {
        Logger(e)
        helpers.popAlert('dropDownAlert.generalError')
      }
    },
  }

  return {
    phoneInputRef,
    codeRef,
    phoneNumber,
    receiveCode,
    This,
  }
}
