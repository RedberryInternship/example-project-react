/* eslint-disable @typescript-eslint/camelcase */
import {
  ChargingTypes,
  ChargingStatus,
  ChargingState,
} from '../../../@types/allTypes.d'

import Defaults from 'utils/defaults'
import NavigationActions from 'utils/navigation.service'
import { getLocaleText } from 'utils/localization/localization'
import { configureChargingFinishPopup } from 'helpers/finishingPopup'
import {
  DisplayDropdownWithError,
  DisplayDropdownWithSuccess,
} from 'helpers/inform'
import services from 'services'
import { getAllChargers } from './rootActions'

export enum ChargerActions {
  CHARGING_STARTED_SUCCESS,
  CHARGING_STARTED_FAILURE,
  CHARGING_FINISHED_SUCCESS,
  CHARGING_FINISHED_FAILURE,
  CHARGING_STATE_SUCCESS,
  CHARGING_STATE_FAILURE,
}

type StartChargingArg = {
  type: ChargingTypes
  connectorTypeId: number
  amount?: number
  userCardId: number | undefined
}

// START
export const startCharging = async (
  { type, connectorTypeId, amount, userCardId }: StartChargingArg,
  dispatch: any,
  setLoading: (bool: boolean) => void,
) => {
  try {
    const startResult = await services.startCharging(
      connectorTypeId,
      type,
      userCardId ?? 0,
      amount,
    )
    if (startResult.charging_status === ChargingStatus.UNPLUGGED) {
      DisplayDropdownWithError('dropDownAlert.pleaseSeeIfChargerIsConnected')
      setLoading(false)
      return
    }

    const chargingStateResult = await services.chargingState()

    DisplayDropdownWithSuccess()

    dispatch(
      startChargingAction({
        chargingStarted: startResult,
        chargingState: chargingStateResult,
      }),
    )
    getAllChargers(dispatch)
    setLoading(false)

    NavigationActions.reset('ChargerStack', 'ChargerWithCode')

    NavigationActions.navigate('Charging')
  } catch (error) {
    setLoading(false)
    if (error.data.message)
      DisplayDropdownWithError('', getLocaleText(error.data.message))
    else DisplayDropdownWithError()
  }
}

type StartChargingAction = {
  type:
    | ChargerActions.CHARGING_STARTED_SUCCESS
    | ChargerActions.CHARGING_STARTED_FAILURE
  payload: any
}

// START ACTION
const startChargingAction = (
  payload: any,
  success = true,
): StartChargingAction => ({
  type: success
    ? ChargerActions.CHARGING_STARTED_SUCCESS
    : ChargerActions.CHARGING_STARTED_FAILURE,
  payload,
})

// FINISH
export const finishCharging = async (
  { orderId }: { orderId: number },
  dispatch: any,
) => {
  try {
    const result = await services.finishCharging(orderId)
    configureChargingFinishPopup(result, dispatch)
  } catch (error) {
    if (error.data?.message)
      DisplayDropdownWithSuccess('', getLocaleText(error.data?.message))
    else DisplayDropdownWithError()
    dispatch(finishChargingAction(error, false))
  }
  //load chargers if charging is finished
  services.getAllChargersFiltered()
}

type FinishChargingAction = {
  type:
    | ChargerActions.CHARGING_FINISHED_SUCCESS
    | ChargerActions.CHARGING_FINISHED_FAILURE
  payload: any
}

// FINISH ACTION
const finishChargingAction = (
  payload: any,
  success = true,
): FinishChargingAction => ({
  type: success
    ? ChargerActions.CHARGING_FINISHED_SUCCESS
    : ChargerActions.CHARGING_FINISHED_FAILURE,
  payload,
})

// STATE
export const chargingState = async (dispatch: any) => {
  try {
    const result = await services.chargingState()
    chargerStateController(result, dispatch)
  } catch (error) {
    dispatch(chargingStateAction(error, false))
    DisplayDropdownWithError()
  }
}

// CONTROLLER
export const chargerStateController = (
  result: ChargingState[],
  dispatch: any,
) => {
  for (const state of result) {
    configureChargingFinishPopup(state, dispatch)
  }

  if (Defaults.activeRoute === 'Charging' && result.length === 0) {
    NavigationActions.navigate('Home')
  }
  if (result.length === 0 && Defaults.modal.current?.state.config.type === 3) {
    Defaults.modal.current?.customUpdate(false)
  }
  dispatch(chargingStateAction(result))
}

type ChargingStateAction = {
  type:
    | ChargerActions.CHARGING_STATE_SUCCESS
    | ChargerActions.CHARGING_STATE_FAILURE
  payload: any
}

// STATE ACTION
const chargingStateAction = (
  payload: any,
  success = true,
): ChargingStateAction => ({
  type: success
    ? ChargerActions.CHARGING_STATE_SUCCESS
    : ChargerActions.CHARGING_STATE_FAILURE,
  payload,
})

export type ChargerAction = { type: ChargerActions; payload: any }
