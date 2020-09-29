/* eslint-disable @typescript-eslint/camelcase */
import AsyncStorage from '@react-native-community/async-storage'
import {
  UserSettingEnum,
  RootActionArg1,
  UserMeResponseType,
} from '../../../@types/allTypes.d'
import NavigationActions from 'utils/navigation.service'
import Defaults from 'utils/defaults'
import services from 'services'
import {
  Logger,
  DisplayDropdownWithError,
  DisplayDropdownWithSuccess,
} from 'helpers/inform'

// Vobi Done: it is better to separate action types from actions
import {
  SAVE_TOKEN,
  GET_ALL_CHARGER_SUCCESS,
  GET_FAVORITE_CHARGERS,
  EDIT_USER_INFO,
  LOG_OUT,
} from 'hooks/actionTypes/rootActions'

export const rootAction = async (
  data: RootActionArg1,
  dispatch: any,
): Promise<void> => {
  saveToken(data)

  if (data.token !== '') {
    await updateUser(dispatch)
    getFavoriteChargers(dispatch)
  }
}

// Vobi Todo: it would be better if you had userReducer
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
      DisplayDropdownWithError('dropDownAlert.thisUserIsBlocked')
      dispatch(logOut())
    } else {
      DisplayDropdownWithError()
      Logger(['Error', error])
    }
  }
}

const saveToken = ({
  user,
  token,
}: RootActionArg1): {
  type: string
  payload: { user: UserMeResponseType; token: string | null }
} => {
  AsyncStorage.setItem('token', token ?? '')
  AsyncStorage.setItem('userDetail', JSON.stringify(user))

  Defaults.token = token
  Defaults.userDetail = user

  return {
    type: SAVE_TOKEN,
    payload: { user, token },
  }
}

// Vobi Todo: actions must be plain objects
export const logOut = () => {
  AsyncStorage.clear()
  Defaults.token = ''
  Defaults.userDetail = null
  NavigationActions.navigate('Home')

  return {
    type: LOG_OUT,
  }
}

// Vobi Todo: why isn't this in charger actions
export const getAllChargers = async (dispatch: any): Promise<void> => {
  try {
    const { data } = await services.getAllChargersFiltered()
    dispatch({ type: GET_ALL_CHARGER_SUCCESS, payload: data })
  } catch (error) {
    DisplayDropdownWithError()
  }
}

// Vobi Todo: why isn't this in charger actions
export const getFavoriteChargers = async (dispatch: any): Promise<void> => {
  try {
    const { user_favorite_chargers } = await services.getUserFavoriteChargers()

    dispatch({ type: GET_FAVORITE_CHARGERS, payload: user_favorite_chargers })
  } catch (error) {
    DisplayDropdownWithError()
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
        DisplayDropdownWithSuccess('dropDownAlert.successOnFavoriteAdd')
        callback && callback()
      } else {
        throw new Error()
      }
    } catch (error) {
      DisplayDropdownWithError()
    }
  }
}

// Vobi Done: what does delete to favorites mean
// Giuna: it meant to delete charger from favorites list

export const deleteFromFavorites = async (
  payload: number,
  dispatch: any,
  callback?: () => void,
): Promise<void> => {
  try {
    const { status } = await services.removeUserFavoriteCharger(payload)
    if (status) {
      getFavoriteChargers(dispatch)
      getAllChargers(dispatch)

      DisplayDropdownWithSuccess('dropDownAlert.successOnFavoriteRemove')

      callback && callback()
    } else {
      throw new Error()
    }
  } catch (error) {
    DisplayDropdownWithError()
  }
}

// Vobi Todo: it would be better if you had userReducer
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
