import { Defaults } from 'types'
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
  chargers: null,
}

export default defaults
