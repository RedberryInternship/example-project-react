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
  remoteLogger,
} from 'utils/inform'
import { CommonActions } from '@react-navigation/native'
import { refreshAndCacheChargers } from 'helpers/chargers'
import defaults from 'utils/defaults'
import { rememberUser } from 'utils/sentry'
import services from 'services'
import references from 'utils/references'
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
    remoteLogger(error)
  }
}

/**
 * Saga for fetching and refreshing
 * user information.
 */
function* refreshUserInformation() {
  const userData = yield getUserData();
  rememberUser(userData)
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
  }
}

/**
 * Saga for saving user data and
 * then refresh state.
 */
function* saveUserAndRefresh(action: SaveUserAndRefreshAction) {
  const { userData, token } = action.payload

  rememberUser(userData)
  yield saveJWTTokenAndUserData(userData, token)
  if (token) {
    yield put(actions.refreshUserData())
    yield put(actions.refreshFavoriteChargers())
  } else {
    yield put(actions.userIsNotAuthorized())
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
  }
}

/**
 * Log out from user account, clear
 * data and navigate to home page.
 */
function* logOutAndReset() {
  const { navigator } = references
  yield clearUserData()
  yield navigator?.dispatch(CommonActions.navigate('HomeTabNavigation', { screen: 'Home' }))
  yield put(actions.logOut())
  yield rememberUser(null)
}

/**
 * Read token from storage and update redux state.
 */
function* readUserTokenFromStorageAndUpdateState() {
  const fetchedToken = yield getUserTokenFromStorage()
  let user: UserMeResponseType = null
  if (fetchedToken) {
    user = yield getUserDetailedInformationFromStorage()

    yield rememberUser(user)
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
