import defaults from 'utils/defaults'
import { ModalTypes } from 'types'

/**
 * Prepare privacy and policy start up pop up.
 */
export const preparePrivacyAndPolicyPopUp = (onClose: () => void) => {
  defaults.modal?.current?.customUpdate(true, {
    type: ModalTypes.PRIVACY_AND_POLICY,
    onCloseClick: () => onClose(),
  })
}
