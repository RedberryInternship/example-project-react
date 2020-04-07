import * as userService from './userService'
import * as chargerService from './chargerService'
import * as authenticationService from './authenticationService'

export default {
  ...userService,
  ...chargerService,
  ...authenticationService,
}
