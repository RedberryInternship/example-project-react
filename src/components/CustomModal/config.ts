import { ModalTypes } from 'types'
import { State } from './types'

export const initialState: State = {
  visible: false,
  config: {
    type: ModalTypes.MAP_POPUP,
    data: {
      title: 'popup.thankYou',
      description: 'popup.automobileChargingFinished',
      bottomDescription: 'popup.chargingFinishedWarning',
      address: '#1',
    },
    shouldAgree: false,
  },
}
