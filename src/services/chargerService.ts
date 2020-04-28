/* eslint-disable @typescript-eslint/camelcase */
import ajax from './ajax'
import {
  ChargerFilters,
  GetAllChargerResponseType,
  StartChargingResponseType,
  FinishChargingResponseType,
} from 'allTypes'
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
  charging_type: 'FULL-CHARGE | BY-AMOUNT',
  price?: number,
): Promise<StartChargingResponseType> =>
  ajax.post('/charging/start', {
    charger_connector_type_id,
    charging_type,
    price,
  })

export const finishCharging = (
  charger_connector_type_id: number,
): Promise<FinishChargingResponseType> =>
  ajax.post('/charging/start', {
    charger_connector_type_id,
  })

export const chargingState = (): Promise<any> => ajax.get('/charging/state')
