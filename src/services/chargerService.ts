/* eslint-disable @typescript-eslint/camelcase */
import ajax from './ajax'

export const getAllChargers = (): Promise<any> => ajax.get('/chargers')
