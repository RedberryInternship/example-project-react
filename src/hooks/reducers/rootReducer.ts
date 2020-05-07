import {
  SAVE_TOKEN,
  GET_ALL_CHARGER_SUCCESS,
  LOG_OUT,
  GET_FAVORITE_CHARGERS,
  EDIT_USER_INFO,
  GET_USER_STATE,
} from '../actions/rootActions'
import {AppState, Action} from 'allTypes'
import {
  CHARGING_STARTED_SUCCESS,
  CHARGING_STARTED_FAILURE,
  CHARGING_FINISHED_SUCCESS,
  CHARGING_FINISHED_FAILURE,
  CHARGING_STATE_SUCCESS,
  CHARGING_STATE_FAILURE,
} from 'hooks/actions/chargerActions'

export const initialState: AppState = {
  user: null,
  loading: false,
  authStatus: null,
  AllChargers: null,
  favoriteChargers: null,
  userState: null,
  chargingStarted: null,
  chargingStartedError: null,
  chargingFinished: null,
  chargingFinishedError: null,
  chargingState: [],
  chargingStateError: null,
}

function reducer(
  state: AppState = initialState,
  {type, payload}: Action,
): AppState {
  switch (type) {
    case SAVE_TOKEN:
      return {
        ...state,
        loading: false,
        user: payload,
        authStatus: typeof payload.token === 'string' ? 'failed' : 'success',
      }
    case LOG_OUT:
      return {
        ...state,
        loading: false,
        user: null,
        authStatus: 'failed',
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
    case CHARGING_STARTED_SUCCESS:
      return {
        ...state,
        ...payload,
      }
    case CHARGING_STARTED_FAILURE:
      return {
        ...state,
        chargingStartedError: payload,
      }
    case CHARGING_FINISHED_SUCCESS:
      return {
        ...state,
        chargingFinished: payload,
      }
    case CHARGING_FINISHED_FAILURE:
      return {
        ...state,
        chargingFinishedError: payload,
      }
    case CHARGING_STATE_SUCCESS:
      return {
        ...state,
        chargingState: payload,
      }
    case CHARGING_STATE_FAILURE:
      return {
        ...state,
        chargingStateError: payload,
      }

    default:
      return state
  }
}

export default reducer
