import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actions from 'state/actions/userActions'
import * as actionTypes from 'state/actionTypes/userActionTypes'
import {
  getUserDetailedInformationFromStorage,
  getUserTokenFromStorage,
  getUserFavoriteChargers,
  saveJWTTokenAndUserData,
  clearUserData,
  getUserData,
} from 'helpers/user'
import {
  DisplayDropdownWithSuccess,
  DisplayDropdownWithError,
  remoteLogger,
} from 'utils/inform'
import { refreshAndCacheChargers } from 'helpers/chargers'
import defaults from 'utils/defaults'
import services from 'services'
import Navigation from 'utils/navigation'
import {
  SaveUserAndRefreshAction,
  FavoriteChargerAction,
  UserMeResponseType,
} from 'types'

/**
 * Saga for the fetching favorite chargers from
 * backend and the saving it in redux state.
 */
function* refreshFavoriteChargers() {
  try {
    const favoriteChargers = yield getUserFavoriteChargers()
    if (favoriteChargers) {
      yield put(actions.getFavoriteChargers(favoriteChargers))
    }
  } catch (error) {
    DisplayDropdownWithError()
    remoteLogger(error)
  }
}

/**
 * Saga for fetching and refreshing
 * user information.
 */
function* refreshUserInformation() {
  const userData = yield getUserData();
  if (userData) {
    yield saveJWTTokenAndUserData(userData, defaults.token)
    yield put(actions.updateUser(userData, defaults.token))
  }
}

/**
 * Saga for fetching all the chargers
 * from the back and refreshing state.
 */
function* refreshAllChargers() {
  try {
    const { data } = yield refreshAndCacheChargers()
    yield put(actions.getAllChargers(data))
  } catch (error) {
    remoteLogger(error)
    DisplayDropdownWithError()
  }
}

/**
 * Saga for saving user data and
 * then refresh state.
 */
function* saveUserAndRefresh(action: SaveUserAndRefreshAction) {
  const { userData, token } = action.payload
  yield saveJWTTokenAndUserData(userData, token)
  if (token) {
    yield put(actions.refreshUserData())
    yield put(actions.refreshFavoriteChargers())
  }
}

/**
 * Add charger to favorite chargers.
 */
function* addChargerToFavorites(action: FavoriteChargerAction) {
  const chargerId = action.payload

  if (chargerId !== undefined) {
    try {
      const { status } = yield services.addUserFavoriteCharger(chargerId)
      if (status) {
        yield put(actions.refreshFavoriteChargers())
        yield put(actions.refreshAllChargers())
        DisplayDropdownWithSuccess('dropDownAlert.successOnFavoriteAdd')
      }
    } catch (error) {
      remoteLogger(error)
      DisplayDropdownWithError()
    }
  }
}

/**
 * Remove charger from favorite chargers.
 */
function* removeChargerFromFavorites(action: FavoriteChargerAction) {
  const chargerId = action.payload
  try {
    const { status } = yield services.removeUserFavoriteCharger(chargerId)
    if (status) {
      yield put(actions.refreshFavoriteChargers())
      yield put(actions.refreshAllChargers())
      DisplayDropdownWithSuccess('dropDownAlert.successOnFavoriteRemove')
    }
  } catch (error) {
    remoteLogger(error)
    DisplayDropdownWithError()
  }
}

/**
 * Log out from user account, clear
 * data and navigate to home page.
 */
function* logOutAndReset() {
  yield clearUserData()
  yield Navigation.navigate('Home')
  yield put(actions.logOut())
}

/**
 * Read token from storage and update redux state.
 */
function* readUserTokenFromStorageAndUpdateState() {
  const fetchedToken = yield getUserTokenFromStorage()

  let user: UserMeResponseType = null
  if (fetchedToken) {
    user = yield getUserDetailedInformationFromStorage()
  }

  yield put(actions.saveUserAndRefresh(user, fetchedToken))
}

/**
 * Bundle and watch all the user sagas.
 */
export default function* userSagas() {
  yield takeEvery(actionTypes.REFRESH_FAVORITE_CHARGERS_SAGA, refreshFavoriteChargers)
  yield takeEvery(actionTypes.REFRESH_USER_INFORMATION_SAGA, refreshUserInformation)
  yield takeLatest(actionTypes.REFRESH_ALL_CHARGERS_SAGA, refreshAllChargers)
  yield takeEvery(actionTypes.SAVE_USER_AND_REFRESH_SAGA, saveUserAndRefresh)
  yield takeEvery(actionTypes.ADD_CHARGER_TO_FAVORITES_SAGA, addChargerToFavorites)
  yield takeEvery(actionTypes.REMOVE_CHARGER_FROM_FAVORITES_SAGA, removeChargerFromFavorites)
  yield takeEvery(actionTypes.LOG_OUT_AND_RESET_SAGA, logOutAndReset)
  yield takeEvery(
    actionTypes.READ_TOKEN_AND_UPDATE_STATE_SAGA,
    readUserTokenFromStorageAndUpdateState,
  )
}
