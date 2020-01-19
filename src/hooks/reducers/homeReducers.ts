import { SAVE_TOKEN } from "../actions/rootActions"
// eslint-disable-next-line no-unused-vars
import { LocationPermissionStatus } from "react-native-location"

type State = {
  PermissionStatus: LocationPermissionStatus | null,
  loading : boolean,
  locationImageType : ImageBitmapSource
  authStatus : "failed" | "success"| null
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