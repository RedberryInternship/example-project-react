/* eslint-disable @typescript-eslint/camelcase */
import ajax from './ajax'
import {
  ChargerFilters,
  GetAllChargerResponseType,
  StartChargingResponseType,
  FinishChargingResponseType,
  ChargingTypes,
  ChargingState,
} from '../../@types/allTypes.d'
import {Defaults} from 'utils'

export const getAllChargersFiltered = (
  params: ChargerFilters = {},
): Promise<GetAllChargerResponseType> =>
  ajax.get(
    '/chargers?' +
      Object.keys({...params, ...Defaults.location})
        .map((key) => key + '=' + {...params, ...Defaults.location}[key])
        .join('&'),
  )

export const startCharging = (
  charger_connector_type_id: number,
  charging_type: ChargingTypes,
  user_card_id: number,
  price?: number,
): Promise<StartChargingResponseType> =>
  ajax.post('/charging/start', {
    charger_connector_type_id,
    charging_type,
    price,
    user_card_id,
  })

export const finishCharging = (
  order_id: number,
): Promise<FinishChargingResponseType> =>
  ajax.post('/charging/stop', {
    order_id,
  })

export const chargingState = (): Promise<ChargingState[]> =>
  ajax.get('/active-orders')
