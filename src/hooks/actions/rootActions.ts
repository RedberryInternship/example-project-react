import { Defaults } from "../../../src/utils";
import  asyncStorage from "@react-native-community/async-storage";

export const SAVE_TOKEN = "SAVE_TOKEN";


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