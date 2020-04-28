/* eslint-disable @typescript-eslint/camelcase */
import ajax from './ajax'
import {ChargerFilters, GetAllChargerResponseType} from 'allTypes'
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
): Promise<any> =>
  ajax.post('/charging/start', {
    charger_connector_type_id,
    charging_type,
    price,
  })
