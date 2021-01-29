import { Defaults } from 'types'
import { createRef } from 'react'

const defaults: Defaults = {
  dropdown: null,
  token: null,
  FCMToken: null,
  activeRoute: 'Home',
  locale: 'ka',
  location: null,
  locationPermission: 'notDetermined',
  modal: createRef(),
  bottomSheet: null,
  userDetail: null,
  internetConnected: null,
  isForeground: null,
  chargers: null,
  authStatus: null,
  appReady: false,
}

export default defaults
