import { Defaults, Ajax } from "../../../src/utils";
import  asyncStorage from "@react-native-community/async-storage";
import { Chargers } from "../../../@types/allTypes";

export const SAVE_TOKEN = "SAVE_TOKEN";
export const GET_ALL_CHARGER_SUCCESS = "GET_ALL_CHARGER_SUCCESS";
export const LOG_OUT = "LOG_OUT";

type ChargersObject = {
  data : Chargers[]
}
export  const saveToken =(payload : any) =>{
  
  asyncStorage.setItem("token" , payload.token )
  asyncStorage.setItem("userDetail" , JSON.stringify(payload.user)  )

  Defaults.token = payload.token
  Defaults.userDetail = payload.user
  
  return {
    type : SAVE_TOKEN,
    payload 
  }
}

export  const logOut =() =>{
  
  asyncStorage.clear()

  Defaults.token = null
  Defaults.userDetail = null
  
  return {
    type : LOG_OUT,
  }
}

export  const getAllChargers = (dispatch : any ) =>{
  
  Ajax.get("/chargers")
  .then(({data} :  ChargersObject) =>{
    dispatch({type : GET_ALL_CHARGER_SUCCESS, payload : data})
  })
  .catch(() =>{
    Defaults.dropdown.alertWithType("error", "დაფიქსიდა შეცდომა")
  })
}