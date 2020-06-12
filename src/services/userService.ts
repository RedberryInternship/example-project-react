/* eslint-disable @typescript-eslint/camelcase */
import ajax from './ajax'
import {
  UserMeResponseType,
  UserFavoriteChargersResponseType,
  RequestStandardResponseType,
  FAQResponseType,
  PartnersResponseType,
  UserOrderResponseType,
  UserLastChargersResponseType,
  UserInfoUpdateResponseType,
  EditPasswordResponseType,
  CarMarkAndModelResponseType,
  ContactInfoResponseType,
  GetCardAddUrl,
} from 'allTypes'

export const getUserData = (): Promise<UserMeResponseType> => ajax.get('/me')

export const getUserFavoriteChargers = (): Promise<UserFavoriteChargersResponseType> =>
  ajax.get('/user-favorites')

export const addUserFavoriteCharger = (
  charger_id: number,
): Promise<RequestStandardResponseType> =>
  ajax.post('/add-favorite', {charger_id})

export const editPassword = (
  phone_number: string,
  old_password: string,
  new_password: string,
): Promise<EditPasswordResponseType> =>
  ajax.post('/edit-password', {phone_number, old_password, new_password})

export const removeUserFavoriteCharger = (
  charger_id: number,
): Promise<RequestStandardResponseType> =>
  ajax.post('/remove-favorite', {charger_id})

export const updateUserInfo = (
  data: Record<string, string>,
): Promise<UserInfoUpdateResponseType> => ajax.post('/update-user-info', data)

export const getFAQ = (): Promise<FAQResponseType> => ajax.get('/faq')

export const getPartners = (): Promise<PartnersResponseType> =>
  ajax.get('/partners')

export const getUserOrders = (): Promise<UserOrderResponseType> =>
  ajax.get('/user-orders')

export const getUserChargers = (): Promise<UserLastChargersResponseType> =>
  ajax.get('/user-chargers')

export const getUserState = (): Promise<any> => ajax.get('/user-state')

export const sendFeedback = (message: string): Promise<any> =>
  ajax.post('/contact-message', {message})

export const getCarAndMarksList = (): Promise<CarMarkAndModelResponseType> =>
  ajax.get('/get-models-and-marks')

export const getContactInfo = (): Promise<ContactInfoResponseType> =>
  ajax.get('/contact')

export const getCardAddUrl = (): Promise<GetCardAddUrl> =>
  ajax.get('/save-card-url')
