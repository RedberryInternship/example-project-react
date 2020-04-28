/* eslint-disable @typescript-eslint/camelcase */
import {Defaults, NavigationActions} from 'utils'
import AsyncStorage from '@react-native-community/async-storage'
import {UserSettingEnum} from '../../../@types/allTypes.d'

import {Helpers} from 'utils'
import services from 'services'

export const CHARGING_STARTED_SUCCESS = 'CHARGING_STARTED_SUCCESS'
export const CHARGING_STARTED_FAILURE = 'CHARGING_STARTED'

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

    NavigationActions.navigate('Charging')

    NavigationActions.reset(
      'chargerStack',
      Defaults.token ? 'chargerStack' : 'NotAuthorized',
    )
  } catch (error) {
    Helpers.DisplayDropdownWithError()
  }
}
