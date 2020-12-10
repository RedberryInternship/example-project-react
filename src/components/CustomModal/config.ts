import { ModalTypes } from 'types'
import { InitialState } from './types'

export const initialState: InitialState = {
  visible: false,
  config: {
    type: ModalTypes.MAP_POPUP,
    data: {
      title: 'popup.thankYou',
      description: 'popup.automobileChargingFinished',
      bottomDescription: 'popup.chargingFinishedWarning',
      address: '#1',
    },
  },
}
