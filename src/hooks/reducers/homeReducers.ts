/* eslint-disable no-unused-vars */
import { SET_LOCATION_HANDLER } from "../actions/homeActions"
import { LocationPermissionStatus } from "react-native-location"
import {  ImageSourcePropType } from "react-native"

type State = {
  PermissionStatus: LocationPermissionStatus | null,
  loading : boolean,
  locationImageType : ImageSourcePropType,
  LocationRequestFunc : ()=>void ,
}
type Action = {
  type : string,
  payload : any,
}


export const initialState : State = {
  PermissionStatus: null,
  locationImageType : require("../../../assets/images/icons/location.png"),
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