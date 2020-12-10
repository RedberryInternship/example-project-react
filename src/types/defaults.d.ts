import { RefObject } from 'react'
import BottomSheetBehavior from 'reanimated-bottom-sheet'
import { CustomModalInterface } from 'components/CustomModal/types'
import { UserMeResponseType } from 'types/services'
import { LocationPermissionStatus } from 'react-native-location'
import { Locale } from 'types/general'

export type Defaults = {
  dropdown: any
  token: string | null
  FCMToken: string | null
  activeRoute: string | null
  locale: Locale
  location: null | {
    lng: number;
    lat: number
  }
  locationPermission: LocationPermissionStatus
  modal: RefObject<CustomModalInterface>
  bottomSheet: RefObject<BottomSheetBehavior> | null
  userDetail: UserMeResponseType | null
  internetConnected: boolean | null
  isForeground: boolean | null
}
