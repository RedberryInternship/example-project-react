import { UserState, Action } from 'allTypes'
import initialState from 'state/initialStates/user'
import * as actionTypes from 'state/actionTypes/userActionTypes'

function reducer(
  state: UserState = initialState,
  { type, payload }: Action,
): UserState {
  switch (type) {
    case actionTypes.SAVE_TOKEN:
      return {
        ...state,
        loading: false,
        user: payload.user,
        authStatus: typeof payload.token === 'string' ? 'success' : 'failed',
      }
    case actionTypes.LOG_OUT:
      return {
        ...initialState,
        AllChargers: state.AllChargers,
      }
    case actionTypes.GET_ALL_CHARGER_SUCCESS:
      return {
        ...state,
        loading: false,
        AllChargers: payload,
      }
    case actionTypes.GET_FAVORITE_CHARGERS:
      return {
        ...state,
        loading: false,
        favoriteChargers: payload,
      }

    case actionTypes.EDIT_USER_INFO:
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
