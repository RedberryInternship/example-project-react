/* eslint-disable @typescript-eslint/camelcase */
import {Defaults, Ajax} from 'utils'
import asyncStorage from '@react-native-community/async-storage'
import {Chargers, Favorite} from 'allTypes'
import i18n from 'i18next'

export const SAVE_TOKEN = 'SAVE_TOKEN'
export const GET_ALL_CHARGER_SUCCESS = 'GET_ALL_CHARGER_SUCCESS'
export const GET_FAVORITE_CHARGERS = 'GET_FAVORITE_CHARGERS'
export const ADD_FAVORITE_CHARGER = 'ADD_FAVORITE_CHARGER'
export const LOG_OUT = 'LOG_OUT'

type ChargersObject = {
  data: Chargers[]
}

type FavoriteChargerObject = {
  user_favorite_chargers: Favorite[]
}

type AddFavoriteCharger = {
  status: boolean
}

export const rootAction = (data: any, dispatch: any) => {
  dispatch(saveToken(data))

  if (data.token !== '') {
    getFavoriteChargers(dispatch)
  }
}

export const saveToken = (payload: any) => {
  asyncStorage.setItem('token', payload.token ?? '')
  asyncStorage.setItem('userDetail', JSON.stringify(payload.user))

  Defaults.token = payload.token
  Defaults.userDetail = payload.user

  return {
    type: SAVE_TOKEN,
    payload,
  }
}

export const logOut = () => {
  asyncStorage.clear()

  Defaults.token = null
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
    .catch(() => {
      Defaults.dropdown.alertWithType(
        'error',
        i18n.t('dropDownAlert.generalError'),
      )
    })
}

export const getFavoriteChargers = (dispatch: any): void => {
  Ajax.get('/user-favorites')
    .then(({user_favorite_chargers}: FavoriteChargerObject) => {
      dispatch({type: GET_FAVORITE_CHARGERS, payload: user_favorite_chargers})
    })
    .catch(() => {
      Defaults.dropdown.alertWithType(
        'error',
        i18n.t('dropDownAlert.generalError'),
      )
    })
}

export const addToFavorites = (payload: number, dispatch: any): void => {
  Ajax.post('/add-favorite', {charger_id: payload})
    .then(({status}: AddFavoriteCharger) => {
      if (status) {
        getFavoriteChargers(dispatch)
      } else {
        Defaults.dropdown.alertWithType(
          'error',
          i18n.t('dropDownAlert.generalError'),
        )
      }
    })
    .catch(() => {
      Defaults.dropdown.alertWithType(
        'error',
        i18n.t('dropDownAlert.generalError'),
      )
    })
}

export const deleteToFavorites = (payload: number, dispatch: any) => {
  Ajax.post('/remove-favorite', {charger_id: payload})
    .then(({status}: AddFavoriteCharger) => {
      if (status) {
        getFavoriteChargers(dispatch)
      } else {
        Defaults.dropdown.alertWithType(
          'error',
          i18n.t('dropDownAlert.generalError'),
        )
      }
    })
    .catch(() => {
      Defaults.dropdown.alertWithType(
        'error',
        i18n.t('dropDownAlert.generalError'),
      )
    })
}
