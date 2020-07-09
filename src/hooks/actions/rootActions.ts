/* eslint-disable @typescript-eslint/camelcase */
import { Defaults, NavigationActions } from 'utils'
import AsyncStorage from '@react-native-community/async-storage'
import {
  UserSettingEnum,
  RootActionArg1,
  UserMeResponseType,
} from '../../../@types/allTypes.d'

import { Helpers } from 'utils'
import services from 'services'
import { chargingState } from './chargerActions'

export const SAVE_TOKEN = 'SAVE_TOKEN'
export const GET_ALL_CHARGER_SUCCESS = 'GET_ALL_CHARGER_SUCCESS'
export const GET_FAVORITE_CHARGERS = 'GET_FAVORITE_CHARGERS'
export const ADD_FAVORITE_CHARGER = 'ADD_FAVORITE_CHARGER'
export const LOG_OUT = 'LOG_OUT'
export const EDIT_USER_INFO = 'EDIT_USER_INFO'

export const rootAction = async (
  data: RootActionArg1,
  dispatch: any,
): Promise<void> => {
  saveToken(data)

  if (data.token !== '') {
    await updateUser(dispatch)
    getFavoriteChargers(dispatch)
    // chargingState(dispatch)
  }
}

export const updateUser = async (dispatch: any) => {
  try {
    const result = await services.getUserData()
    dispatch(
      saveToken({
        token: Defaults.token ?? null,
        user: {
          ...Defaults.userDetail,
          ...result,
        },
      }),
    )
  } catch (error) {
    if (error.status == '406' || error?.data?.status == '406') {
      Helpers.DisplayDropdownWithError('dropDownAlert.thisUserIsBlocked')
      dispatch(logOut())
    } else Helpers.DisplayDropdownWithError()
  }
}

const saveToken = ({
  user,
  token,
}: RootActionArg1): {
  type: string
  payload: { user: UserMeResponseType; token: string | null }
} => {
  // console.log(JSON.stringify({ user, token }, null, 2), 'payload')

  AsyncStorage.setItem('token', token ?? '')
  AsyncStorage.setItem('userDetail', JSON.stringify(user))

  Defaults.token = token
  Defaults.userDetail = user

  return {
    type: SAVE_TOKEN,
    payload: { user, token },
  }
}

export const logOut = () => {
  AsyncStorage.clear()
  Defaults.token = ''
  Defaults.userDetail = null
  NavigationActions.navigate('Home')
  return {
    type: LOG_OUT,
  }
}

export const getAllChargers = async (dispatch: any): Promise<void> => {
  try {
    const { data } = await services.getAllChargersFiltered()
    dispatch({ type: GET_ALL_CHARGER_SUCCESS, payload: data })
  } catch (error) {
    Helpers.DisplayDropdownWithError()
  }
}

export const getFavoriteChargers = async (dispatch: any): Promise<void> => {
  try {
    const { user_favorite_chargers } = await services.getUserFavoriteChargers()

    dispatch({ type: GET_FAVORITE_CHARGERS, payload: user_favorite_chargers })
  } catch (error) {
    Helpers.DisplayDropdownWithError()
  }
}

export const addToFavorites = async (
  payload: number | undefined,
  dispatch: any,
  callback?: () => void,
): Promise<void> => {
  if (payload !== undefined) {
    try {
      const { status } = await services.addUserFavoriteCharger(payload)
      if (status) {
        getFavoriteChargers(dispatch)
        getAllChargers(dispatch)
        Helpers.DisplayDropdownWithSuccess('dropDownAlert.successOnFavoriteAdd')

        callback && callback()
      } else {
        throw new Error()
      }
    } catch (error) {
      Helpers.DisplayDropdownWithError()
    }
  }
}

export const deleteToFavorites = async (
  // Vobi Todo: what does delete to favorites mean
  payload: number,
  dispatch: any,
  callback?: () => void,
): Promise<void> => {
  try {
    const { status } = await services.removeUserFavoriteCharger(payload)
    if (status) {
      getFavoriteChargers(dispatch)
      getAllChargers(dispatch)

      Helpers.DisplayDropdownWithSuccess(
        'dropDownAlert.successOnFavoriteRemove',
      )

      callback && callback()
    } else {
      throw new Error()
    }
  } catch (error) {
    Helpers.DisplayDropdownWithError()
  }
}

export const editUserInfo = (
  dispatch: any,
  payload: any,
  type: UserSettingEnum | 'avatar',
): any => {
  if (Defaults.userDetail) Defaults.userDetail[type] = payload

  AsyncStorage.setItem('userDetail', JSON.stringify(Defaults.userDetail))

  return dispatch({
    type: EDIT_USER_INFO,
    payload: {
      data: payload,
      type: type,
    },
  })
}
