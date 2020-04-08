import {Validate} from 'react-hook-form'

const phoneNumberValidation = {
  ifGeorgian: (value: string | undefined): boolean | string => {
    if (value?.slice(0, 4) === '+995')
      return value.length === 13 || 'dropDownAlert.auth.phoneNumberLength'
    else return true
  },
  ifForeign: (value: string | undefined): boolean | string =>
    (value && value.length > 5) || 'dropDownAlert.registration.fillPhoneNumber',
}

const codeVerification = {
  ifEmpty: (value: string | undefined): boolean | string =>
    !!value || 'dropDownAlert.forgotPassword.fillCode',
  ifCorrectLength: (value: string | undefined): boolean | string =>
    /^(\d{4,4})$/.test(value ?? '') ||
    'dropDownAlert.forgotPassword.smsCodeLength',
}

const passwordConfirmValidation = (
  password: string | undefined,
): Record<string, Validate> => ({
  ifEmpty: (value: string | undefined): boolean | string =>
    (!!value && !!password) ||
    'dropDownAlert.forgotPassword.passwordsNotFilled',
  ifMinLength: (value: string | undefined): boolean | string =>
    (value && value.length >= 8) ||
    'dropDownAlert.forgotPassword.newPasswordIncorrectLength',
  ifEqual: (value: string | undefined): boolean | string =>
    value === password || 'dropDownAlert.registration.passwordNotEqual',
})

export default {
  phoneNumberValidation,
  codeVerification,
  passwordConfirmValidation,
}
