/* eslint-disable @typescript-eslint/camelcase */
import ajax from './ajax'

export const getPhoneCountryCodes = (): Promise<any> => ajax.get('/phone-codes')

export const sendSMSCode = (phone_number: string): Promise<any> =>
  ajax.post('/send-sms-code', {phone_number})

export const loginUser = (
  phone_number: string,
  password: string,
): Promise<any> => ajax.post('/login', {phone_number, password})

export const forgotPasswordRecovery = (
  phone_number: string,
  code: string,
): Promise<any> =>
  ajax.post('/verify-code-for-password-recovery', {phone_number, code})

export const resetPassword = (
  phone_number: string,
  password: string,
): Promise<any> => ajax.post('/reset-password', {phone_number, password})
