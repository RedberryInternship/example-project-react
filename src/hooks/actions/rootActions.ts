/* eslint-disable @typescript-eslint/camelcase */
import {Defaults, Ajax} from 'utils'
import AsyncStorage from '@react-native-community/async-storage'
import {ChargersObject, Favorite} from 'allTypes'
import i18n from 'i18next'

import {apiServices, Helpers} from 'utils'
import i18next from 'i18next'
import {Alert} from 'react-native'

export const SAVE_TOKEN = 'SAVE_TOKEN'
export const GET_ALL_CHARGER_SUCCESS = 'GET_ALL_CHARGER_SUCCESS'
export const GET_FAVORITE_CHARGERS = 'GET_FAVORITE_CHARGERS'
export const ADD_FAVORITE_CHARGER = 'ADD_FAVORITE_CHARGER'
export const LOG_OUT = 'LOG_OUT'
export const EDIT_USER_INFO = 'EDIT_USER_INFO'

type FavoriteChargerObject = {
  user_favorite_chargers: Favorite[]
}

type AddFavoriteCharger = {
  status: boolean
}

const {Logger} = Helpers

export const rootAction = (data: any, dispatch: any) => {
  saveToken(data)

  if (data.token !== '') {
    Ajax.get(apiServices.get_me)
      .then(user => {
        console.log('====================================')
        console.log(data, user, 'useruser')
        console.log('====================================')
        dispatch(saveToken({token: data.token, ...data.user, ...user}))
      })
      .catch(err => {
        Logger(err)
        Helpers.DisplayGeneralError()
      })

    getFavoriteChargers(dispatch)
  }
}

const saveToken = (payload: any) => {
  AsyncStorage.setItem('token', payload.token ?? '')
  AsyncStorage.setItem('userDetail', JSON.stringify(payload))

  Defaults.token = payload.token
  Defaults.userDetail = payload

  return {
    type: SAVE_TOKEN,
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

export const getAllChargers = (dispatch: any): void => {
  Ajax.get('/chargers')
    .then(({data}: ChargersObject) => {
      dispatch({type: GET_ALL_CHARGER_SUCCESS, payload: data})
    })
    .catch(() => Helpers.DisplayGeneralError())
}

export const getFavoriteChargers = (dispatch: any): void => {
  Ajax.get('/user-favorites')
    .then(({user_favorite_chargers}: FavoriteChargerObject) => {
      dispatch({type: GET_FAVORITE_CHARGERS, payload: user_favorite_chargers})
    })
    .catch(err => {
      Helpers.DisplayGeneralError()
      Logger(err)
    })
}

export const addToFavorites = (
  payload: number | undefined,
  dispatch: any,
  callback?: () => void,
): void => {
  payload !== undefined &&
    Ajax.post('/add-favorite', {charger_id: payload})
      .then(({status}: AddFavoriteCharger) => {
        if (status) {
          getFavoriteChargers(dispatch)
          getAllChargers(dispatch)
          Defaults.dropdown?.alertWithType(
            'success',
            i18next.t('dropDownAlert.successOnFavoriteAdd'),
          )
          callback && callback()
        } else {
          throw new Error()
        }
      })
      .catch(err => {
        Helpers.DisplayGeneralError()
        Logger(err)
      })
}

export const deleteToFavorites = (
  payload: number,
  dispatch: any,
  callback?: () => void,
): void => {
  Ajax.post('/remove-favorite', {charger_id: payload})
    .then(({status}: AddFavoriteCharger) => {
      if (status) {
        getFavoriteChargers(dispatch)
        getAllChargers(dispatch)
        Defaults.dropdown?.alertWithType(
          'success',
          i18next.t('dropDownAlert.successOnFavoriteRemove'),
        )
        callback && callback()
      } else {
        throw new Error()
      }
    })
    .catch(err => {
      Helpers.DisplayGeneralError()
      Logger(err)
    })
}

type UserColumnType =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone_number'
  | 'mapMode'

export const editUserInfo = (
  dispatch: any,
  payload: any,
  user_column_type: UserColumnType,
): any => {
  if (Defaults.userDetail) Defaults.userDetail[user_column_type] = payload

  console.log('====================================')
  console.log(Defaults.userDetail, 'Defaults.userDetailDefaults.userDetail')
  console.log('====================================')
  AsyncStorage.setItem('userDetail', JSON.stringify(Defaults.userDetail))

  return dispatch({
    type: EDIT_USER_INFO,
    payload: {
      data: payload,
      type: user_column_type,
    },
  })
}
