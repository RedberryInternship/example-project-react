import AsyncStorage from '@react-native-community/async-storage'
import defaults from 'utils/defaults'
import services from 'services'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'utils/inform'
import { UserMeResponseType } from 'types'

/**
 * Determine if user is authenticated.
 */
export const isAuthenticated = (): boolean => !!defaults.token

/**
 * Save jwt token and user data in async storage.
 */
export const saveJWTTokenAndUserData = (
  userData: UserMeResponseType,
  token: string | null = defaults.token,
): void => {
  AsyncStorage.setItem('token', token ?? '')
  AsyncStorage.setItem('userDetail', JSON.stringify(userData))

  defaults.token = token
  defaults.userDetail = userData
}

/**
 * Clear user data in the storage and also
 * in the default object.
 */
export const clearUserData = () => {
  AsyncStorage.clear()
  defaults.token = ''
  defaults.userDetail = null
}

/**
 * Set user data in the async storage.
 */
export const setUserData = (userData: UserMeResponseType = defaults.userDetail) => {
  AsyncStorage.setItem('userDetail', JSON.stringify(userData))
}

/**
 * Set user data in to the defaults object.
 */
export const setUserDetail = (type: string, value: any) => {
  if (defaults.userDetail) {
    defaults.userDetail[type] = value
  }
}

/**
 * Get user data from the server
 * to update local state.
 */
export const getUserData = async () => {
  try {
    const result = await services.getUserData()
    const userData = {
      ...defaults.userDetail,
      ...result,
    }

    return userData as UserMeResponseType
  } catch (error) {
    if (error.status === '406' || error?.data?.status === '406') {
      DisplayDropdownWithError('dropDownAlert.thisUserIsBlocked')
    }
    DisplayDropdownWithError()
  }
}

/**
 * Get user favorite chargers.
 */
export const getUserFavoriteChargers = async () => {
  try {
    const { user_favorite_chargers } = await services.getUserFavoriteChargers()
    return user_favorite_chargers
  } catch (error) {
    remoteLogger(error)
    DisplayDropdownWithError()
  }
}

/**
 * Get user detailed information from storage.
 */
export const getUserDetailedInformationFromStorage = async () => {
  try {
    const rawUserDetailedInformation = await AsyncStorage.getItem('userDetail')

    return rawUserDetailedInformation
      ? JSON.parse(rawUserDetailedInformation)
      : ''
  } catch (error) {
    DisplayDropdownWithError()
    remoteLogger(error)
  }
}

/**
 * Get user token from storage.
 */
export const getUserTokenFromStorage = async () => {
  try {
    return await AsyncStorage.getItem('token')
  } catch (error) {
    DisplayDropdownWithError()
    remoteLogger(error)
    return ''
  }
}
