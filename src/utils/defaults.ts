/* eslint-disable no-unused-vars */
import {CustomModalInterface} from '../components/CustomModal'
import {RefObject} from 'react'
import BottomSheetBehavior from 'reanimated-bottom-sheet'
import {LocationPermissionStatus} from 'react-native-location'

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
  _location: null | Record<string, any> = null
  _locationPermission: LocationPermissionStatus = 'notDetermined'
  _modal: any = null
  _bottomSheet: any = null
  _userDetail: userDetail = null

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
  get userDetail(): userDetail {
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
}

export default new Defaults()
