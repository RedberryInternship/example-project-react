import * as userService from './userService'
import * as chargerService from './chargerService'

export default {
  ...userService,
  ...chargerService,
}
