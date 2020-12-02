import {
  PhoneCountryCodesData,
  SendSMSCodeResponseType,
  LoginResponseType,
  VerifyCodeResponseType,
  PasswordChangedResponseType,
  RegisterResponseType,
} from 'allTypes'
import ajax from './ajax'

export const getPhoneCountryCodes = (): Promise<PhoneCountryCodesData> => ajax.get('/phone-codes')

export const sendSMSCode = (
  phone_number: string,
  formType: string,
): Promise<SendSMSCodeResponseType> => ajax.post('/send-sms-code', { phone_number, type: formType })

export const loginUser = (
  phone_number: string,
  password: string,
): Promise<LoginResponseType> => ajax.post('/login', { phone_number, password })

export const forgotPasswordRecovery = (
  phone_number: string,
  code: string,
): Promise<VerifyCodeResponseType> => ajax.post('/verify-code-for-password-recovery', { phone_number, code })

export const verifyCodeOnRegistration = (
  phone_number: string,
  code: string,
): Promise<VerifyCodeResponseType> => ajax.post('/verify-code', { phone_number, code })

export const resetPassword = (
  phone_number: string,
  password: string,
): Promise<PasswordChangedResponseType> => ajax.post('/reset-password', { phone_number, password })

export const register = (
  data: Record<string, string | number>,
): Promise<RegisterResponseType> => ajax.post('/register', data)
