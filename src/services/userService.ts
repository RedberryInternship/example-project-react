/* eslint-disable @typescript-eslint/camelcase */
import ajax from './ajax'

export const getUserData = (): Promise<any> => ajax.get('/me')

export const getUserFavoriteChargers = (): Promise<any> =>
  ajax.get('/user-favorites')

export const addUserFavoriteCharger = (charger_id: number): Promise<any> =>
  ajax.post('/add-favorite', {charger_id})

export const removeUserFavoriteCharger = (charger_id: number): Promise<any> =>
  ajax.post('/remove-favorite', {charger_id})

export const getFAQ = (): Promise<any> => ajax.get('/faq')

export const getPartners = (): Promise<any> => ajax.get('/partners')

export const getUserOrders = (): Promise<any> => ajax.get('/user-orders')

export const getUserChargers = (): Promise<any> => ajax.get('/user-chargers')
