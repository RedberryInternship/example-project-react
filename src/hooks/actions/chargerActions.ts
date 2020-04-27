/* eslint-disable @typescript-eslint/camelcase */
import {Defaults, NavigationActions, getLocaleText} from 'utils'
import AsyncStorage from '@react-native-community/async-storage'
import {
  UserSettingEnum,
  StandardErrorResponseType,
} from '../../../@types/allTypes.d'

import {Helpers} from 'utils'
import services from 'services'

export const CHARGING_STARTED_SUCCESS = 'CHARGING_STARTED_SUCCESS'
export const CHARGING_STARTED_FAILURE = 'CHARGING_STARTED'

export const CHARGING_FINISHED_SUCCESS = 'CHARGING_FINISHED_SUCCESS'
export const CHARGING_FINISHED_FAILURE = 'CHARGING_FINISHED_FAILURE'

export const CHARGING_STATE_SUCCESS = 'CHARGING_STATE_SUCCESS'
export const CHARGING_STATE_FAILURE = 'CHARGING_STATE_FAILURE'

type StartChargingArg = {
  type: 'FULL-CHARGE | BY-AMOUNT'
  connectorTypeId: number
  amount?: number
}
export const startCharging = async (
  {type, connectorTypeId, amount}: StartChargingArg,
  dispatch: any,
) => {
  try {
    const result = await services.startCharging(connectorTypeId, type, amount)

    Helpers.DisplayDropdownWithSuccess(getLocaleText(result.message))
    dispatch(startChargingAction(result))

    NavigationActions.navigate('Charging')

    NavigationActions.reset(
      'chargerStack',
      Defaults.token ? 'chargerStack' : 'NotAuthorized',
    )
  } catch (error) {
    if (error.message)
      Helpers.DisplayDropdownWithError('', getLocaleText(error.message))
    else Helpers.DisplayDropdownWithError()
  }
}

const startChargingAction = (payload: any, success = true) => ({
  type: success ? CHARGING_STARTED_SUCCESS : CHARGING_STARTED_FAILURE,
  payload,
})

export const finishCharging = async (
  {connectorTypeId}: {connectorTypeId: number},
  dispatch: any,
) => {
  try {
    const result = await services.finishCharging(connectorTypeId)

    const onModalClose = () => {
      // TODO: check user charger state, then if user has no active charging navigate
      // TODO: to Home, else update charging screen according active charger count
      // NavigationActions.navigate('Home')
      dispatch(finishChargingAction(result))
    }
    if (result.status_code === 200)
      Defaults.modal.current?.customUpdate(true, {
        type: 3,
        subType: 1,
        data: {
          title: 'popup.thankYou',
          description: 'popup.automobileChargingFinished',
          bottomDescription: 'popup.finishedChargingOfAutomobile',
          price: 22,
        },
        onCloseClick: onModalClose,
      })
  } catch (error) {
    if (error.message)
      Helpers.DisplayDropdownWithError('', getLocaleText(error.message))
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
