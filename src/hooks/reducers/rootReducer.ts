import {
  SAVE_TOKEN,
  GET_ALL_CHARGER_SUCCESS,
  LOG_OUT,
  GET_FAVORITE_CHARGERS,
  EDIT_USER_INFO,
} from '../actions/rootActions'
import { AppState, Action } from 'allTypes'

const initialStateSchema: AppState = {
  user: null,
  loading: false,
  authStatus: null,
  AllChargers: null,
  favoriteChargers: null,
  userState: null,
}

export const initialState: AppState = { ...initialStateSchema }

function reducer(
  state: AppState = initialState,
  { type, payload }: Action,
): AppState {
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
        ...initialStateSchema,
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