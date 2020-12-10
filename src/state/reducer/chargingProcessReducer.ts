import { ChargerState, ChargerAction } from 'types'
import initialState from 'state/initialStates/chargingProcess'
import * as actionTypes from 'state/actionTypes/chargingProcessActionTypes'

function reducer(
  state: ChargerState = initialState,
  { type, payload }: ChargerAction,
): ChargerState {
  switch (type) {
    case actionTypes.CHARGING_STARTED_SUCCESS:
      return {
        ...state,
        ...payload,
      }
    case actionTypes.CHARGING_STARTED_FAILURE:
      return {
        ...state,
        chargingStartedError: payload,
      }
    case actionTypes.CHARGING_FINISHED_SUCCESS:
      return {
        ...state,
        chargingFinished: payload,
      }
    case actionTypes.CHARGING_FINISHED_FAILURE:
      return {
        ...state,
        chargingFinishedError: payload,
      }
    case actionTypes.CHARGING_STATE_SUCCESS:
      return {
        ...state,
        chargingState: payload,
      }
    case actionTypes.CHARGING_STATE_FAILURE:
      return {
        ...state,
        chargingStateError: payload,
      }

    default:
      return state
  }
}

export default reducer
