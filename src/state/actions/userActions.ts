import defaults from 'utils/defaults'
import * as actionTypes from 'state/actionTypes/userActionTypes'
import {
  UserMeResponseType,
  UserSettingEnum,
  Favorite,
  Charger,
} from '../../../@types/allTypes.d'

/**
 * Saga action for saving user and
 * refreshing state aftermath.
 */
export const saveUserAndRefresh = (userData: UserMeResponseType, token: string | null) => (
  {
    type: actionTypes.SAVE_USER_AND_REFRESH_SAGA,
    payload: {
      userData,
      token,
    },
  }
)

/**
 * Saga action for refreshing user information
 * from backend.
 */
export const refreshUserData = () => (
  {
    type: actionTypes.REFRESH_USER_INFORMATION_SAGA,
  }
)

/**
 * Action for updating user state
 * in redux.
 *
 * @param userData
 * @param token
 */
export const updateUser = (userData: UserMeResponseType, token: string | null = defaults.token) => (
  {
    type: actionTypes.SAVE_TOKEN,
    payload: { user: userData, token },
  }
)

/**
 * Saga action for refreshing favorite chargers.
 */
export const refreshFavoriteChargers = () => (
  {
    type: actionTypes.REFRESH_FAVORITE_CHARGERS_SAGA,
  }
)

/**
 * Saga action for adding charger
 * to favorite chargers.
 */
export const addChargerToFavorites = (chargerId: number) => (
  {
    type: actionTypes.ADD_CHARGER_TO_FAVORITES_SAGA,
    payload: chargerId,
  }
)

/**
 * Saga action for adding charger
 * to favorite chargers.
 */
export const removeChargerFromFavorites = (chargerId: number) => (
  {
    type: actionTypes.REMOVE_CHARGER_FROM_FAVORITES_SAGA,
    payload: chargerId,
  }
)

/**
 * update user favorite charger
 *
 * @param userFavoriteChargers
 */
export const getFavoriteChargers = (userFavoriteChargers: Favorite[]) => ({
  type: actionTypes.GET_FAVORITE_CHARGERS,
  payload: userFavoriteChargers,
})

/**
 * Edit user's detailed information.
 *
 * @param payload
 * @param type
 */
export const editUserInfo = (payload: any, type: UserSettingEnum | 'avatar') => (
  {
    type: actionTypes.EDIT_USER_INFO,
    payload: {
      data: payload,
      type,
    },
  }
)

/**
 * Saga action for refreshing all the
 * chargers from backend.
 */
export const refreshAllChargers = () => (
  {
    type: actionTypes.REFRESH_ALL_CHARGERS_SAGA,
  }
)

/**
 * Get and set all chargers from server.
 *
 * @param data
 */
export const getAllChargers = (data: Charger[]) => (
  {
    type: actionTypes.GET_ALL_CHARGER_SUCCESS,
    payload: data,
  }
)

/**
 * Saga action for logout and reset.
 */
export const logOutAndReset = () => (
  {
    type: actionTypes.LOG_OUT_AND_RESET_SAGA,
  }
)

/**
 * Logout from the user account.
 */
export const logOut = () => ({
  type: actionTypes.LOG_OUT,
})

/**
 * Saga action for reading token from
 * storage and updating state.
 */
export const readTokenFromStorageAndUpdateState = () => (
  {
    type: actionTypes.READ_TOKEN_AND_UPDATE_STATE_SAGA,
  }
)
