import { takeEvery, put } from 'redux-saga/effects'
import * as actions from 'state/actions/chargingProcessActions'
import { refreshAllChargers } from 'state/actions/userActions'
import * as actionTypes from 'state/actionTypes/chargingProcessActionTypes'
import NavigationActions from 'utils/navigation.service'
import {
  DisplayDropdownWithSuccess,
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'
import services from 'services'
import { getLocaleText } from 'utils/localization/localization'
import configureChargingFinishPopup from 'helpers/finishingPopup'
import {
  UpdateChargingProcessesSagaAction,
  FinishChargingSagaAction,
  StartChargingSagaAction,
} from 'allTypes'
import { ChargingStatus } from 'utils/enums'
import defaults from 'utils/defaults'

/**
 * Start charging process saga.
 */
function* startChargingProcess(action: StartChargingSagaAction) {
  const {
    connectorTypeId,
    userCardId,
    amount,
    type,
  } = action.payload.config;
  const { setLoading } = action.payload

  try {
    const startResult = yield services.startCharging(connectorTypeId, type, userCardId ?? 0, amount)
    if (startResult.charging_status === ChargingStatus.UNPLUGGED) {
      DisplayDropdownWithError('dropDownAlert.pleaseSeeIfChargerIsConnected')
      setLoading(false)
      return
    }

    const chargingStateResult = yield services.chargingState()

    DisplayDropdownWithSuccess()

    yield put(
      actions.startChargingAction({
        chargingStarted: startResult,
        chargingState: chargingStateResult,
      }),
    )
    yield put(refreshAllChargers())
    setLoading(false)

    NavigationActions.reset('ChargerStack', 'ChargerWithCode')
    NavigationActions.navigate('Charging')
  } catch (error) {
    remoteLogger(error)
    setLoading(false)
    if (error.data.message) {
      DisplayDropdownWithError('', getLocaleText(error.data.message))
    } else {
      DisplayDropdownWithError()
    }
  }
}

/**
 * finish charging process saga.
 */
function* finishChargingProcess(action: FinishChargingSagaAction) {
  const orderId = action.payload
  try {
    const result = yield services.finishCharging(orderId)
    yield configureChargingFinishPopup(result)
  } catch (error) {
    remoteLogger(error)
    if (error.data?.message) {
      DisplayDropdownWithSuccess('', getLocaleText(error.data?.message))
    } else {
      DisplayDropdownWithError()
    }
    yield put((actions.finishChargingAction(error, false)))
  }

  services.getAllChargersFiltered()
}

/**
 * Update charging process saga.
 */
function* updateChargingProcesses(action: UpdateChargingProcessesSagaAction) {
  const data = action.payload
  yield data.forEach((state) => configureChargingFinishPopup(state))

  if (defaults.activeRoute === 'Charging' && data.length === 0) {
    NavigationActions.navigate('Home')
  }
  if (data.length === 0 && defaults.modal?.current?.state.config.type === 3) {
    defaults.modal.current?.customUpdate(false)
  }
  yield put(actions.updateChargingProcessAction(data, action.status))
}

/**
 * Refresh charging Processes.
 */
function* refreshChargingProcesses() {
  try {
    const data = yield services.chargingState()
    yield put(actions.updateChargingProcesses(data))
  } catch (error) {
    remoteLogger(error)
    yield put(actions.updateChargingProcesses(error, false))
    DisplayDropdownWithError()
  }
}

/**
 * Bundle and watch all the charging processes sagas.
 */
export default function* chargingProcessSagas() {
  yield takeEvery(actionTypes.START_CHARGING_PROCESS_SAGA, startChargingProcess)
  yield takeEvery(actionTypes.FINISH_CHARGING_PROCESS_SAGA, finishChargingProcess)
  yield takeEvery(actionTypes.UPDATE_CHARGING_PROCESSES_SAGA, updateChargingProcesses)
  yield takeEvery(actionTypes.REFRESH_CHARGING_PROCESSES_SAGA, refreshChargingProcesses)
}
