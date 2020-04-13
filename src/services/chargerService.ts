/* eslint-disable @typescript-eslint/camelcase */
import ajax from './ajax'
import {ChargerFilters} from 'allTypes'

export const getAllChargers = (): Promise<any> => ajax.get('/chargers')

export const getAllChargersFiltered = (params: ChargerFilters): Promise<any> =>
  ajax.get(
    '/chargers' +
      Object.keys(params)
        .map((key) => key + '=' + params[key])
        .join('&'),
  )
