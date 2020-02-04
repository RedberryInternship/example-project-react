import { SAVE_TOKEN, GET_ALL_CHARGER_SUCCESS, LOG_OUT } from "../actions/rootActions"
// eslint-disable-next-line no-unused-vars
import { Charger, AppState, Action } from "../../../@types/allTypes"


export const initialState : AppState = {
  user: null,
  loading : false,
  authStatus : null,
  AllChargers : null
}

function reducer(state : AppState = initialState, {type, payload} : Action) : AppState{
  switch(type) {
    case  SAVE_TOKEN:
      return {
        ...state,
        loading: false,
        user : payload.user,
        authStatus : typeof payload.token === "string" ? "failed" : "success"
      }
    case  LOG_OUT:
      return {
        ...state,
        loading: false,
        user : null,
        authStatus : "failed"
      }
    case  GET_ALL_CHARGER_SUCCESS:
      return {
        ...state,
        loading: false,
        AllChargers : payload,
      }

    default:
      return state
  }
}

export default reducer