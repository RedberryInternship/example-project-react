/* eslint-disable @typescript-eslint/camelcase */
import {Defaults} from 'utils'
import AsyncStorage from '@react-native-community/async-storage'
import {UserSettingEnum} from '../../../@types/allTypes.d'

import {Helpers} from 'utils'
import services from 'services'

export const SAVE_TOKEN = 'SAVE_TOKEN'
export const GET_ALL_CHARGER_SUCCESS = 'GET_ALL_CHARGER_SUCCESS'
export const GET_FAVORITE_CHARGERS = 'GET_FAVORITE_CHARGERS'
export const ADD_FAVORITE_CHARGER = 'ADD_FAVORITE_CHARGER'
export const LOG_OUT = 'LOG_OUT'
export const EDIT_USER_INFO = 'EDIT_USER_INFO'
export const GET_USER_STATE = 'GET_USER_STATE'

export const rootAction = async (data: any, dispatch: any): Promise<void> => {
  saveToken(data)

  if (data.token !== '') {
    try {
      const result = await services.getUserData()
      dispatch(saveToken({token: data.token, ...data.user, ...result}))
    } catch (error) {
      Helpers.DisplayDropdownWithError()
    }
    getFavoriteChargers(dispatch)

    try {
      // get user-state and dispatch action
      // const result = await services.getUserState()
      // dispatch(getUserState(result))
    } catch (error) {
      Helpers.DisplayDropdownWithError()
    }
  }
}

const saveToken = (payload: any): Record<string, string> => {
  AsyncStorage.setItem('token', payload.token ?? '')
  AsyncStorage.setItem('userDetail', JSON.stringify(payload))

  Defaults.token = payload.token
  Defaults.userDetail = payload

  return {
    type: SAVE_TOKEN,
    payload,
  }
}

const getUserState = (payload: Record<string, any>) => {
  return {
    type: GET_USER_STATE,
    payload,
  }
}

export const logOut = () => {
  AsyncStorage.clear()
  Defaults.token = ''
  Defaults.userDetail = null

  return {
    type: LOG_OUT,
  }
}

export const getAllChargers = async (dispatch: any): Promise<void> => {
  try {
    const {data} = await services.getAllChargersFiltered()
    dispatch({type: GET_ALL_CHARGER_SUCCESS, payload: data})
  } catch (error) {
    Helpers.DisplayDropdownWithError()
  }
}

export const getFavoriteChargers = async (dispatch: any): Promise<void> => {
  try {
    const {user_favorite_chargers} = await services.getUserFavoriteChargers()

    dispatch({type: GET_FAVORITE_CHARGERS, payload: user_favorite_chargers})
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
      const {status} = await services.addUserFavoriteCharger(payload)
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
  payload: number,
  dispatch: any,
  callback?: () => void,
): Promise<void> => {
  try {
    const {status} = await services.removeUserFavoriteCharger(payload)
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
  type: UserSettingEnum,
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
