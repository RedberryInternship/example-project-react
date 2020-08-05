/* eslint-disable @typescript-eslint/camelcase */
import { Defaults, NavigationActions, getLocaleText } from 'utils'
import {
  ChargingTypes,
  ChargingStatus,
  ChargingState,
} from '../../../@types/allTypes.d'

import { Helpers } from 'utils'
import services from 'services'
import { getAllChargers } from './rootActions'
import { Alert } from 'react-native'

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
      Helpers.DisplayDropdownWithError(
        'dropDownAlert.pleaseSeeIfChargerIsConnected',
      )
      return
    }

    const chargingStateResult = await services.chargingState()

    Helpers.DisplayDropdownWithSuccess()

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
      Helpers.DisplayDropdownWithError('', getLocaleText(error.data.message))
    else Helpers.DisplayDropdownWithError()
    // const chargingStateResult = await services.chargingState() //temporary
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

    Helpers.configureChargingFinishPopup(result, dispatch)
  } catch (error) {
    if (error.data?.message)
      Helpers.DisplayDropdownWithSuccess('', getLocaleText(error.data?.message))
    else Helpers.DisplayDropdownWithError()
    dispatch(finishChargingAction(error, false))
  }
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
    Helpers.DisplayDropdownWithError()
  }
}

// CONTROLLER
export const chargerStateController = (
  result: ChargingState[],
  dispatch: any,
) => {
  console.log("CHARGER_STATE:",result);
  for (const state of result) {
    Helpers.configureChargingFinishPopup(state, dispatch)
    // if (
    //   Defaults.activeRoute !== 'Charging' &&
    //   (state.charging_status == ChargingStatus.CHARGED ||
    //     state.charging_status == ChargingStatus.ON_FINE)
    // ) {
    //   setTimeout(() => {
    //     NavigationActions.navigate('Charging')
    //   }, 1000)
    // }
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
