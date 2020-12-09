import * as actionTypes from 'state/actionTypes/homeActionTypes'
import { HomeState, Action } from 'allTypes'
import initialState from 'state/initialStates/home'

function reducer(
  state: HomeState = initialState,
  { type, payload }: Action,
): HomeState {
  switch (type) {
    case actionTypes.SET_LOCATION_HANDLER:
      return {
        ...state,
        loading: false,
        LocationRequestFunc: payload,
      }
    case actionTypes.SET_FILTERED_CHARGERS:
      return {
        ...state,
        loading: false,
        filteredChargers: payload,
      }
    default:
      return state
  }
}

export default reducer
