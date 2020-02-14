export const SET_LOCATION_HANDLER = 'SET_LOCATION_HANDLER'
export const SET_FILTERED_CHARGERS = 'SET_FILTERED_CHARGERS'

export const setLocationHandler = (payload: any) => {
  // Alert.alert("setLocationHandler")

  return {
    type: SET_LOCATION_HANDLER,
    payload,
  }
}

export const setFilteredChargers = (payload: any) => {
  return {
    type: SET_FILTERED_CHARGERS,
    payload,
  }
}
