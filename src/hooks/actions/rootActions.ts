import { Defaults, Ajax } from "../../../src/utils";
import asyncStorage from "@react-native-community/async-storage";
import { Chargers, Favorite } from "../../../@types/allTypes";
import AsyncStorage from "@react-native-community/async-storage";

export const SAVE_TOKEN = "SAVE_TOKEN";
export const GET_ALL_CHARGER_SUCCESS = "GET_ALL_CHARGER_SUCCESS";
export const GET_FAVORITE_CHARGERS = "GET_FAVORITE_CHARGERS";
export const LOG_OUT = "LOG_OUT";
export const EDIT_USER_INFO = 'EDIT_USER_INFO';

type ChargersObject = {
  data: Chargers[]
}

type FavoriteChargerObject = {
  data: Favorite[]

}
export const saveToken = (payload: any) => {

  asyncStorage.setItem("token", payload.token ?? '')
  asyncStorage.setItem("userDetail", JSON.stringify(payload.user))

  Defaults.token = payload.token
  Defaults.userDetail = payload.user

  return {
    type: SAVE_TOKEN,
    payload
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

export const getAllChargers = (dispatch: any) => {

  Ajax.get("/chargers")
    .then(({ data }: ChargersObject) => {
      dispatch({ type: GET_ALL_CHARGER_SUCCESS, payload: data })
    })
    .catch(() => {
      Defaults.dropdown.alertWithType("error", "დაფიქსიდა შეცდომა")
    })
}

export const getFavoriteChargers = (dispatch: any) => {

  Ajax.get("/user-favorites")
    .then(({ data }: FavoriteChargerObject) => {
      dispatch({ type: GET_FAVORITE_CHARGERS, payload: data })
    })
    .catch(() => {
      Defaults.dropdown.alertWithType("error", "დაფიქსიდა შეცდომა")
    })
}

type UserColumnType = 'first_name' | 'last_name' | 'email' | 'phone_number';

export const editUserInfo = (dispatch: any, payload: any, user_column_type: UserColumnType) => {
  
  Defaults.userDetail[user_column_type] = payload;

  AsyncStorage.setItem('userDetail', JSON.stringify(Defaults.userDetail));

  return dispatch({
    type: EDIT_USER_INFO,
    payload: {
      data: payload,
      type: user_column_type
    }
  });
}