/* eslint-disable @typescript-eslint/camelcase */
import {Defaults, NavigationActions, getLocaleText} from 'utils'
import {ChargingTypes, ChargingStatus} from '../../../@types/allTypes.d'

import {Helpers} from 'utils'
import services from 'services'
import {getAllChargers} from './rootActions'

export const CHARGING_STARTED_SUCCESS = 'CHARGING_STARTED_SUCCESS'
export const CHARGING_STARTED_FAILURE = 'CHARGING_STARTED'

export const CHARGING_FINISHED_SUCCESS = 'CHARGING_FINISHED_SUCCESS'
export const CHARGING_FINISHED_FAILURE = 'CHARGING_FINISHED_FAILURE'

export const CHARGING_STATE_SUCCESS = 'CHARGING_STATE_SUCCESS'
export const CHARGING_STATE_FAILURE = 'CHARGING_STATE_FAILURE'

type StartChargingArg = {
  type: ChargingTypes
  connectorTypeId: number
  amount?: number
  userCardId: number | undefined
}
export const startCharging = async (
  {type, connectorTypeId, amount, userCardId}: StartChargingArg,
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

const startChargingAction = (payload: any, success = true) => ({
  type: success ? CHARGING_STARTED_SUCCESS : CHARGING_STARTED_FAILURE,
  payload,
})

export const finishCharging = async (
  {orderId}: {orderId: number},
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

const finishChargingAction = (payload: any, success = true) => ({
  type: success ? CHARGING_FINISHED_SUCCESS : CHARGING_FINISHED_FAILURE,
  payload,
})

export const chargingState = async (dispatch: any) => {
  try {
    const result = await services.chargingState()

    for (const state of result) {
      Helpers.configureChargingFinishPopup(state, dispatch)
    }
    if (Defaults.activeRoute !== 'Charging' && result.length > 0) {
      setTimeout(() => {
        NavigationActions.navigate('Charging')
      }, 1000)
    }
    if (Defaults.activeRoute === 'Charging' && result.length === 0) {
      NavigationActions.navigate('Home')
    }
    if (
      result.length === 0 &&
      Defaults.modal.current?.state.config.type === 3
    ) {
      Defaults.modal.current?.customUpdate(false)
    }

    dispatch(chargingStateAction(result))
  } catch (error) {
    dispatch(chargingStateAction(error, false))
    Helpers.DisplayDropdownWithError()
  }
}

const chargingStateAction = (payload: any, success = true) => ({
  type: success ? CHARGING_STATE_SUCCESS : CHARGING_STATE_FAILURE,
  payload,
})
