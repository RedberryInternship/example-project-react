import { ChargerActions, ChargerAction } from '../actions/chargerActions'
import { ChargerState } from 'allTypes'

export const chargerInitialState: ChargerState = {
  chargingStarted: null,
  chargingStartedError: null,
  chargingFinished: null,
  chargingFinishedError: null,
  chargingState: [],
  chargingStateError: null,
}

function reducer(
  state: ChargerState = chargerInitialState,
  { type, payload }: ChargerAction,
): ChargerState {
  switch (type) {
    case ChargerActions.CHARGING_STARTED_SUCCESS:
      return {
        ...state,
        ...payload,
      }
    case ChargerActions.CHARGING_STARTED_FAILURE:
      return {
        ...state,
        chargingStartedError: payload,
      }
    case ChargerActions.CHARGING_FINISHED_SUCCESS:
      return {
        ...state,
        chargingFinished: payload,
      }
    case ChargerActions.CHARGING_FINISHED_FAILURE:
      return {
        ...state,
        chargingFinishedError: payload,
      }
    case ChargerActions.CHARGING_STATE_SUCCESS:
      return {
        ...state,
        chargingState: payload,
      }
    case ChargerActions.CHARGING_STATE_FAILURE:
      return {
        ...state,
        chargingStateError: payload,
      }

    default:
      return state
  }
}

export default reducer
