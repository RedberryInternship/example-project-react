import {
  UserFavoriteChargersResponseType,
  TransactionsHistoryResponseType,
  UserLastChargersResponseType,
  RequestStandardResponseType,
  CarMarkAndModelResponseType,
  UserInfoUpdateResponseType,
  EditPasswordResponseType,
  ContactInfoResponseType,
  UserCarsResponseType,
  PartnersResponseType,
  UserMeResponseType,
  FAQResponseType,
  GetCardAddUrl,
} from 'types';

import ajax from './axios';

export const getUserData = (): Promise<UserMeResponseType> => ajax.get('/me')

export const getUserFavoriteChargers = ()
  : Promise<UserFavoriteChargersResponseType> => ajax.get('/user-favorites');

export const addUserFavoriteCharger = (
  charger_id: number,
): Promise<RequestStandardResponseType> => ajax.post('/add-favorite', { charger_id });

export const editPassword = (
  phone_number: string,
  old_password: string,
  new_password: string,
): Promise<EditPasswordResponseType> => ajax
  .post('/edit-password', { phone_number, old_password, new_password });

export const removeUserFavoriteCharger = (
  charger_id: number,
): Promise<RequestStandardResponseType> => ajax.post('/remove-favorite', { charger_id });

export const updateUserInfo = (
  data: Record<string, string>,
): Promise<UserInfoUpdateResponseType> => ajax.post('/update-user-info', data);

export const getFAQ = (): Promise<FAQResponseType> => ajax.get('/faq');

export const getPartners = (): Promise<PartnersResponseType> => ajax.get('/partners');

export const getTransactionsHistory = (): Promise<TransactionsHistoryResponseType> => ajax
  .get('/transactions-history');

export const getUserChargers = (): Promise<UserLastChargersResponseType> => ajax
  .get('/user-chargers');

export const getUserState = (): Promise<any> => ajax.get('/user-state');

export const sendFeedback = (message: string): Promise<any> => ajax
  .post('/contact-message', { message });

export const getCarAndMarksList = (): Promise<CarMarkAndModelResponseType> => ajax
  .get('/get-models-and-marks');

export const getCars = (): Promise<UserCarsResponseType> => ajax.get('/get-user-cars');

export const addCar = (car_model_id: number): Promise<any> => ajax
  .post('/add-user-car', { car_model_id });

export const removeCar = (): Promise<any> => ajax.post('', []);

export const getContactInfo = (): Promise<ContactInfoResponseType> => ajax
  .get('/contact');

export const getCardAddUrl = (): Promise<GetCardAddUrl> => ajax.get('/save-card-url');

export const setDefaultCard = (user_card_id: number): Promise<GetCardAddUrl> => ajax
  .post('/user-card/set-default', { user_card_id });

export const setUserFirebaseToken = (firebase_token: string): Promise<any> => ajax
  .post('/update-firebase-token', { firebase_token });
