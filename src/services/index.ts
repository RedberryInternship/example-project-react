import * as userService from './userService'
import * as chargerService from './chargerService'
import * as authenticationService from './authenticationService'
import * as mapService from './mapService'

export default {
  ...userService,
  ...chargerService,
  ...authenticationService,
  ...mapService,
}
