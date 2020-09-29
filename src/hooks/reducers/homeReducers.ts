import {
  SET_LOCATION_HANDLER,
  SET_FILTERED_CHARGERS,
} from '../actions/homeActions'
import { HomeState, Action } from 'allTypes'
import initialState from 'hooks/initialStates/home'

function reducer(
  state: HomeState = initialState,
  { type, payload }: Action,
): HomeState {
  switch (type) {
    case SET_LOCATION_HANDLER:
      return {
        ...state,
        loading: false,
        LocationRequestFunc: payload,
      }
    case SET_FILTERED_CHARGERS:
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
