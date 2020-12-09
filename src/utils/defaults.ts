import { Defaults } from 'allTypes'
import { createRef } from 'react'

const defaults: Defaults = {
  dropdown: null,
  token: null,
  FCMToken: null,
  activeRoute: null,
  locale: 'ka',
  location: null,
  locationPermission: 'notDetermined',
  modal: createRef(),
  bottomSheet: null,
  userDetail: null,
  internetConnected: null,
  isForeground: null,
}

export default defaults
