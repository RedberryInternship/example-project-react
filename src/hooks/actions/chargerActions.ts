/* eslint-disable @typescript-eslint/camelcase */
import {Defaults, NavigationActions, getLocaleText} from 'utils'
import {ChargingTypes, ChargingStatus} from '../../../@types/allTypes.d'

import {Helpers} from 'utils'
import services from 'services'

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

    NavigationActions.reset(
      'chargerStack',
      Defaults.token ? 'ChargerWithCode' : 'NotAuthorized',
    )

    NavigationActions.navigate('Charging')
  } catch (error) {
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
    const {already_paid, charging_status} = await services.finishCharging(
      orderId,
    )

    Defaults.modal.current?.customUpdate(true, {
      type: 3,
      subType: charging_status,
      data: {
        title: 'popup.thankYou',
        description: 'popup.automobileChargingFinished',
        bottomDescription: 'popup.finishedChargingOfAutomobile',
        price: already_paid,
      },
      onCloseClick: () => onModalClose(dispatch),
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

    // for (const {already_paid, charging_status} of result) {
    //   if (
    //     charging_status !== ChargingStatus.INITIATED &&
    //     charging_status !== ChargingStatus.CHARGING
    //   ) {
    //     const options = {
    //       type: 3,
    //       subType: charging_status,
    //       data: {
    //         title: 'popup.thankYou',
    //         description: 'popup.automobileChargingFinished',
    //         bottomDescription: 'popup.finishedChargingOfAutomobile',
    //         price: already_paid,
    //       },
    //       onCloseClick: onModalClose,
    //     }
    //     switch (charging_status) {
    //       case ChargingStatus.CHARGED:
    //         //construct data accordingly
    //         break
    //       case ChargingStatus.FINISHED:
    //         break

    //       default:
    //         break
    //     }
    //   }
    // }

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

const onModalClose = (dispatch) => {
  NavigationActions.navigate('Home')

  chargingState(dispatch)
}
