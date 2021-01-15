import AsyncStorage from '@react-native-community/async-storage'
import defaults from 'utils/defaults'
import { ModalTypes } from 'types'

/**
 * Prepare privacy and policy start up pop up.
 */
export const preparePrivacyAndPolicyPopUp = (onClose: () => void) => {
  defaults.modal?.current?.customUpdate(true, {
    type: ModalTypes.PRIVACY_AND_POLICY,
    onCloseClick: () => {
      onClose()
      agreeToPrivacyAndPolicy()
    },
    shouldAgree: true,
  })
}

/**
 * Agree to privacy and policy.
 */
export const agreeToPrivacyAndPolicy = () => AsyncStorage
  .setItem('agreedToPrivacyAndPolicy', true.toString())

/**
 * Determine if user has already agreed to
 * privacy and policy.
 */
export const hasAgreedToPrivacyAndPolicy = async () => {
  const hasAgreed = await AsyncStorage.getItem('agreedToPrivacyAndPolicy')
  return typeof hasAgreed === 'string'
}
