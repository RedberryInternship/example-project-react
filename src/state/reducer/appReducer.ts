import initialState from 'state/initialStates/app'
import { AppAction, AppState } from 'types'
import * as actionTypes from 'state/actionTypes/appActionTypes'

const appReducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case actionTypes.READY:
      return {
        ...state,
        ready: action.payload,
      }
    default:
      return state;
  }
}

export default appReducer
