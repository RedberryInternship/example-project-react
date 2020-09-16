/* eslint-disable no-unused-vars */
import {CustomModalInterface} from '../components/CustomModal'
import {RefObject} from 'react'
import BottomSheetBehavior from 'reanimated-bottom-sheet'
import {LocationPermissionStatus} from 'react-native-location'
import {UserMeResponseType} from 'allTypes'
import {boolean} from 'yup'

type userDetail = {
  first_name: string
  last_name: string
  phone_number: string
  email: string
  verified: number
  id: number
  mapMode: string
} | null

class Defaults {
  _dropdown: any = null
  _FCMToken!: string | null
  _token: null | string = ''
  _activeRoute!: string
  _locale: 'en' | 'ka' | 'ru' = 'ka'
  _location: null | {lng: number; lat: number} = null
  _locationPermission: LocationPermissionStatus = 'notDetermined'
  _modal: any = null
  _bottomSheet: any = null
  _userDetail: UserMeResponseType | null = null
  _internetConnected: boolean | null = null
  _isForeground: boolean | null = null

  set dropdown(dropdown) {
    this._dropdown = dropdown
  }
  get dropdown() {
    return this._dropdown
  }

  set FCMToken(_FCMToken) {
    this._FCMToken = _FCMToken
  }
  get FCMToken(): string | null {
    return this._FCMToken
  }

  set userDetail(token) {
    this._userDetail = token
  }
  get userDetail(): UserMeResponseType | null {
    return this._userDetail
  }
  set token(token) {
    this._token = token
  }
  get token() {
    return this._token
  }

  set activeRoute(route) {
    this._activeRoute = route
  }
  get activeRoute() {
    return this._activeRoute
  }

  set locale(locale) {
    this._locale = locale
  }
  get locale(): 'en' | 'ka' | 'ru' {
    return this._locale
  }

  set location(location) {
    this._location = location
  }
  get location() {
    return this._location
  }
  set locationPermissionStatus(permissionStatus: LocationPermissionStatus) {
    this._locationPermission = permissionStatus
  }
  get locationPermissionStatus(): LocationPermissionStatus {
    return this._locationPermission
  }

  set modal(modal) {
    this._modal = modal
  }
  get modal(): RefObject<CustomModalInterface> {
    return this._modal
  }
  set bottomSheet(bottomSheet) {
    this._bottomSheet = bottomSheet
  }
  get bottomSheet(): React.RefObject<BottomSheetBehavior> | null {
    return this._bottomSheet
  }
  set internetConnected(bool: boolean | null) {
    this._internetConnected = bool
  }
  get internetConnected(): boolean | null {
    return this._internetConnected
  }
  set isForeground(bool: boolean | null) {
    this._isForeground = bool
  }
  get isForeground(): boolean | null {
    return this._isForeground
  }
}

export default new Defaults()
