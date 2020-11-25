import * as Actions from 'state/actionTypes/homeActionTypes'

export const setLocationHandler = (payload: any) => ({
  type: Actions.SET_LOCATION_HANDLER,
  payload,
})

export const setFilteredChargers = (payload: any) => ({
  type: Actions.SET_FILTERED_CHARGERS,
  payload,
})
