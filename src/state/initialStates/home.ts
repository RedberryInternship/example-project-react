import images from 'assets/images'
import { HomeState } from 'allTypes'

const initialState: HomeState = {
  PermissionStatus: null,
  locationImageType: images.location,
  loading: false,
  LocationRequestFunc: () => {},
  filteredChargers: null,
}

export default initialState
