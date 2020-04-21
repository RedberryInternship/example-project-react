/* eslint-disable @typescript-eslint/camelcase */
import ajax from './ajax'
import {ChargerFilters, GetAllChargerResponseType} from 'allTypes'

export const getAllChargers = (): Promise<GetAllChargerResponseType> =>
  ajax.get('/chargers')

export const getAllChargersFiltered = (
  params: ChargerFilters,
): Promise<GetAllChargerResponseType> =>
  ajax.get(
    '/chargers' +
      Object.keys(params)
        .map((key) => key + '=' + params[key])
        .join('&'),
  )
