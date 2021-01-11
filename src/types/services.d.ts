import {
  CarMarkAndModelTypes,
  Partner,
  FAQ,
} from 'types/general'
import { Charger, Favorite } from 'types/chargers'
import { ChargingStatus } from 'types/enums'
import { TransactionsHistoryResponseItem } from 'types/transactions'
import { UserCard, UserCar } from 'types/user'

export type LastUsedChargerResponseObject = {
  data: Charger[]
}

export type GetAllChargerResponseType = {
  data: Charger[]
}

export type StartChargingResponseType = {
  already_paid: number
  charger_connector_type_id: number
  charger_id: number
  charging_status: ChargingStatus
  connector_type_id: number
  consumed_money: number
  refund_money: number
  user_card_id: string
}

export type RequestStandardResponseType = {
  status: 200
}

export type EditPasswordResponseType = {
  status_code: 200
}

export type FAQResponseType = {
  faq: FAQ[]
}

export type UserInfoUpdateResponseType = {
  updated: boolean
}

export type PartnersResponseType = {
  partners: Partner[]
}

export type getCoordsByIPResponseType = {
  Latitude: number
  Longitude: number
}

export type SendSMSCodeResponseType = {
  json_status: string
}

export type LoginResponseType = {
  access_token: string
  user: UserMeResponseType
  token_type: 'bearer'
  expires_in: number
}

export type VerifyCodeResponseType = {
  json_status: string
  status: number
  phone_number: string
}

export type PasswordChangedResponseType = {
  json_status: string
}

export type RegisterResponseType = {
  json_status?: string
  user: UserMeResponseType
  token: string
}

export type CarMarkAndModelResponseType = {
  data: CarMarkAndModelTypes[]
}

export type ContactInfoResponseType = {
  id: number
  address: string
  phone: string
  email: string
  fb_page: string
  fb_page_url: string
  web_page: string
  web_page_url: string
}

export type TransactionsHistoryResponseType = {
  data: TransactionsHistoryResponseItem[]
}

export type UserMeResponseType = {
  id: number
  old_id: number
  role_id: number
  phone_number: string
  first_name: string
  last_name: string
  email: string | null
  active: number
  verified: number
  email_verified_at: string | null
  temp_password: string | null
  created_at: string
  updated_at: string
  user_cards: UserCard[]
  user_cars: any[]
  car_models: any[]
  avatar: number
  mapMode: 'settings.mapColorLight' | 'settings.mapColorDark' | 'settings.automatic'
} | null

export type UserCarsResponseType = {
  user_cars: UserCar[]
}

export type UserFavoriteChargersResponseType = {
  user_favorite_chargers: Favorite[]
}

export type UserLastChargersResponseType = {
  data: Charger[]
  current_hour: string
}
