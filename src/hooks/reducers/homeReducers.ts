import {
  SET_LOCATION_HANDLER,
  SET_FILTERED_CHARGERS,
} from '../actions/homeActions'
import {HomeState, Action} from 'allTypes'
import images from 'assets/images'

export const initialState: HomeState = {
  PermissionStatus: null,
  locationImageType: images.location,
  loading: false,
  LocationRequestFunc: () => {},
  filteredChargers: null,
}

function reducer(
  state: HomeState = initialState,
  {type, payload}: Action,
): HomeState {
  switch (type) {
    case SET_LOCATION_HANDLER:
      return {
        ...state,
        loading: false,
        LocationRequestFunc: payload,
      }
    case SET_FILTERED_CHARGERS:
      return {
        ...state,
        loading: false,
        filteredChargers: payload,
      }

    default:
      return state
  }
}

export default reducer
