
export const SET_LOCATION_HANDLER = "SET_LOCATION_HANDLER";


export const setLocationHandler =(payload : any) =>{
  // Alert.alert("setLocationHandler")

  return {
    type : SET_LOCATION_HANDLER,
    payload
  }
}