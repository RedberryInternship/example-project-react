import { SAVE_TOKEN } from "../actions/rootActions"

type State = {
  user: Object | null,
  loading : boolean,
  authStatus : "failed" | "success" | null
}
type Action = {
  type : string,
  payload : any,
}

export const initialState : State = {
  user: null,
  loading : false,
  authStatus : null,
}

function reducer(state : State = initialState, {type, payload} : Action) : State{
  switch(type) {
    case  SAVE_TOKEN:
      return {
        ...state,
        loading: true,
        user : payload.user,
        authStatus : typeof payload.token === "string" ? "failed" : "success"
      }

    default:
      return state
  }
}

export default reducer