import * as actionTypes from 'state/actionTypes/chargingProcessActionTypes'
import {
  FinishChargingAction,
  ChargingStateAction,
  StartChargingAction,
  StartChargingArg,
  ChargingState,
} from 'types'

/**
 * Saga action for start charging.
 */
export const startChargingProcess = (
  config: StartChargingArg,
  setLoading: (bool: boolean,
  ) => void,
) => ({
  type: actionTypes.START_CHARGING_PROCESS_SAGA,
  payload: {
    config,
    setLoading,
  },
})

/**
 * Action for start charging process.
 */
export const startChargingAction = (payload: any, success = true): StartChargingAction => ({
  type: success
    ? actionTypes.CHARGING_STARTED_SUCCESS
    : actionTypes.CHARGING_STARTED_FAILURE,
  payload,
})

/**
 * Saga action for finishing charging process.
 */
export const finishChargingProcess = (orderId: number) => (
  {
    type: actionTypes.FINISH_CHARGING_PROCESS_SAGA,
    payload: orderId,
  }
)

/**
 * action for finishing charging process.
 */
export const finishChargingAction = (payload: any, success = true): FinishChargingAction => ({
  type: success
    ? 'CHARGING_FINISHED_SUCCESS'
    : 'CHARGING_FINISHED_FAILURE',
  payload,
})

/**
 * Saga action for updating charging processes.
 */
export const updateChargingProcesses = (
  chargingProcesses: ChargingState[],
  status: boolean = true,
) => ({
  type: actionTypes.UPDATE_CHARGING_PROCESSES_SAGA,
  payload: chargingProcesses,
  status,
})

/**
 * Action for updating charging processes.
 */
export const updateChargingProcessAction = (payload: any, success = true): ChargingStateAction => ({
  type: success
    ? 'CHARGING_STATE_SUCCESS'
    : 'CHARGING_STATE_FAILURE',
  payload,
})

/**
 * Saga for refreshing charging processes.
 */
export const refreshChargingProcesses = () => (
  {
    type: actionTypes.REFRESH_CHARGING_PROCESSES_SAGA,
  }
)
