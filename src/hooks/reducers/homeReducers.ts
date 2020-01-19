import { SET_LOCATION_HANDLER } from "../actions/homeActions"
// eslint-disable-next-line no-unused-vars
import { LocationPermissionStatus } from "react-native-location"
import { Alert } from "react-native"

type State = {
  PermissionStatus: LocationPermissionStatus | null,
  loading : boolean,
  locationImageType : any,
  LocationRequestFunc : ()=>void ,
}
type Action = {
  type : string,
  payload : any,
}


export const initialState : State = {
  PermissionStatus: null,
  locationImageType : "",
  loading : false,
  LocationRequestFunc : ()=>{},
}

function reducer(state : State = initialState, {type, payload} : Action) : State{

  switch(type) {
    case  SET_LOCATION_HANDLER:
      return {
        ...state,
        loading: false,
        LocationRequestFunc : payload
      }

    default:
      return state
  }
}

export default reducer