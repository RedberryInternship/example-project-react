import { UserState, Action } from 'allTypes'
import initialState from 'state/initialStates/user'
import {
  SAVE_TOKEN,
  GET_ALL_CHARGER_SUCCESS,
  LOG_OUT,
  GET_FAVORITE_CHARGERS,
  EDIT_USER_INFO,
} from 'state/actionTypes/userActionTypes'

function reducer(
  state: UserState = initialState,
  { type, payload }: Action,
): UserState {
  switch (type) {
    case SAVE_TOKEN:
      return {
        ...state,
        loading: false,
        user: payload.user,
        authStatus: typeof payload.token === 'string' ? 'success' : 'failed',
      }
    case LOG_OUT:
      return {
        ...initialState,
        AllChargers: state.AllChargers,
      }
    case GET_ALL_CHARGER_SUCCESS:
      return {
        ...state,
        loading: false,
        AllChargers: payload,
      }
    case GET_FAVORITE_CHARGERS:
      return {
        ...state,
        loading: false,
        favoriteChargers: payload,
      }

    case EDIT_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          [payload.type]: payload.data,
        },
      }

    default:
      return state
  }
}

export default reducer
